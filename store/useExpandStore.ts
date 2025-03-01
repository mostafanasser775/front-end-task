import {create} from 'zustand';

interface ExpandState {
  expand: boolean;
  toggleExpand: () => void;
}

export const useExpandStore = create<ExpandState>((set) => ({
  expand: false,
  toggleExpand: () => set((state) => ({ expand: !state.expand })),
}));
