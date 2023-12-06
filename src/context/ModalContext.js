import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function useModal() {
    return useContext(ModalContext);
}

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const onConfirm = (e) => {
        closeModal();
        return;
    }

    const onReject = (e) => {
        closeModal();
        return;
    }

    return (
        <ModalContext.Provider value={{ closeModal, openModal, onConfirm, onReject, isOpen }}>
            {children}
        </ModalContext.Provider>
    )
}