import { create } from 'zustand';

interface TaskDeleteModal {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    id: string
}

const useTaskDeleteModal = create<TaskDeleteModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    id: ''
}));


export default useTaskDeleteModal;