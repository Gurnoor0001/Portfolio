import { create } from 'zustand';

interface AppState {
  fastMode: boolean;
  setFastMode: (mode: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  hasSeenIntro: boolean;
  setHasSeenIntro: (seen: boolean) => void;
  terminalOpen: boolean;
  setTerminalOpen: (open: boolean) => void;
  currentSection: string;
  setCurrentSection: (section: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  fastMode: false,
  setFastMode: (mode) => set({ fastMode: mode }),
  soundEnabled: false,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
  hasSeenIntro: false,
  setHasSeenIntro: (seen) => set({ hasSeenIntro: seen }),
  terminalOpen: false,
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  currentSection: 'hero',
  setCurrentSection: (section) => set({ currentSection: section }),
}));
