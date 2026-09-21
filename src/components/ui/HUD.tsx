"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import { Rocket, FastForward, Volume2, VolumeX, TerminalSquare } from "lucide-react";
import { useAmbientSound } from "@/hooks/useAmbientSound";

export default function HUD() {
  const { fastMode, setFastMode, soundEnabled, setSoundEnabled, setTerminalOpen } = useAppStore();
  
  // Initialize procedural ambient sound engine
  useAmbientSound();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      setProgress((scrollY / maxScroll) * 100);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 flex flex-col justify-between p-4 md:p-8 mix-blend-screen">
      {/* Top Bar */}
      <div className="flex justify-between items-start w-full">
        <div className="font-display font-bold text-xl tracking-widest text-cosmic-blue uppercase">
          Mission Control
        </div>
        
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={() => setTerminalOpen(true)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur transition-all border border-white/10 text-white"
            title="Open Terminal (~)"
          >
            <TerminalSquare size={20} />
          </button>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full backdrop-blur transition-all border border-white/10 text-white"
            title="Toggle Ambient Sound"
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button 
            onClick={() => setFastMode(!fastMode)}
            className={`p-2 rounded-full backdrop-blur transition-all border border-white/10 flex items-center gap-2 ${fastMode ? 'bg-magenta-glow text-white' : 'bg-white/5 hover:bg-white/10 text-white'}`}
            title="Toggle Fast Mode (2D)"
          >
            <FastForward size={20} />
            <span className="text-xs hidden md:inline">{fastMode ? "2D Mode" : "3D Mode"}</span>
          </button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-white/10 rounded-full overflow-hidden">
        <div 
          className="w-full bg-gradient-to-b from-cosmic-blue to-magenta-glow rounded-full transition-all duration-75"
          style={{ height: `${progress}%` }}
        />
        <Rocket 
          className="absolute text-white transition-all duration-75 -translate-x-1/2 left-1/2" 
          style={{ top: `${progress}%`, marginTop: '-12px' }} 
          size={16} 
        />
      </div>
      
      {/* Distance traveled */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 font-mono text-xs text-white/50 text-right">
        DISTANCE: {progress.toFixed(1)} LY<br/>
        COORD: Z-{Math.floor(progress * -2)}
      </div>
    </div>
  );
}
