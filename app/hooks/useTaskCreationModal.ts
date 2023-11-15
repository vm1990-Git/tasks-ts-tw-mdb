import { create } from 'zustand';

interface TaskCreationModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTaskCreationModal = create<TaskCreationModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));


export default useTaskCreationModal;