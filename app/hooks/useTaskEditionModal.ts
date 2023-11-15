import { create } from 'zustand';
import { SafeTask } from '../types';

interface TaskEditionModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: SafeTask
}

const useTaskEditionModal = create<TaskEditionModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  data: {
    id: '',
    title: '',
    description: '',
    state: '',
    createdAt: '',
    userId: '',
  },
}));

export default useTaskEditionModal