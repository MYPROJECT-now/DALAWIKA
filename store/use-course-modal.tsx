import { create } from "zustand";

type CourseModalState = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
};

export const useCourseModal = create<CourseModalState>((set) => ({
    isOpen: false, //change mo maya
    open: () => set ({ isOpen: true}),
    close: () => set ({ isOpen: false}),
}));