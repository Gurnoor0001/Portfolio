"use client";
import { useEffect, useRef } from 'react';
import { useAppStore } from '@/store/useAppStore';

export const useAmbientSound = () => {
  const { soundEnabled } = useAppStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (soundEnabled) {
      if (!audioCtxRef.current) {
        // Initialize Web Audio API
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContext();
        
        // Master Volume
        gainNodeRef.current = audioCtxRef.current.createGain();
        gainNodeRef.current.connect(audioCtxRef.current.destination);
        gainNodeRef.current.gain.value = 0; // Start silent

        // Base frequencies for a deep space drone (A minor / suspended)
        const frequencies = [55, 110, 164.81]; // A1, A2, E3
        
        frequencies.forEach((freq, idx) => {
          const osc = audioCtxRef.current!.createOscillator();
          osc.type = idx === 0 ? 'triangle' : 'sine'; // Grittier bass, smooth harmonics
          osc.frequency.value = freq;
          
          // LFO to slowly shift the pitch (Chorus effect)
          const lfo = audioCtxRef.current!.createOscillator();
          lfo.type = 'sine';
          lfo.frequency.value = 0.05 + (Math.random() * 0.1); // Extremely slow LFO
          
          const lfoGain = audioCtxRef.current!.createGain();
          lfoGain.gain.value = 3; // Detune amount in cents
          
          lfo.connect(lfoGain);
          lfoGain.connect(osc.detune);
          
          osc.connect(gainNodeRef.current!);
          osc.start();
          lfo.start();
          
          oscillatorsRef.current.push(osc, lfo);
        });
      }
      
      // Smoothly fade in over 2 seconds
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      gainNodeRef.current?.gain.setTargetAtTime(0.08, audioCtxRef.current.currentTime, 2);
      
    } else {
      // Smoothly fade out over 2 seconds
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioCtxRef.current.currentTime, 1.5);
        
        // Suspend context after fade out to save CPU
        setTimeout(() => {
          if (!useAppStore.getState().soundEnabled && audioCtxRef.current) {
             audioCtxRef.current.suspend();
          }
        }, 4000);
      }
    }
  }, [soundEnabled]);
};
