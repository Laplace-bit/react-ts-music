import { useState, useContext, createContext, type ReactNode } from 'react';
import LoadingBox from '../UI/loader/components/loadingBox';
import Button from '../UI/button/button';


// 创建一个Context用于共享遮罩层状态
export const ModalContext = createContext<{
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
}>({
    isOpen: false,
    openModal: () => { },
    closeModal: () => { },
});


// 创建 useModal 自定义Hook
function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return { isOpen, openModal, closeModal };
}

// ModalProvider组件，用于在应用中提供遮罩层状态
export function ModalProvider({ children }: { children: ReactNode }) {
    const modal = useModal();

    return (
        <ModalContext.Provider value={modal}>
            {children}
            {modal.isOpen && <div className="modal-overlay" />}
        </ModalContext.Provider>
    );
}

// Modal组件，用于显示遮罩层内容
export function Modal() {
    const { isOpen, closeModal } = useContext(ModalContext);

    return (
        isOpen ?
            <div className="mask" style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                boxShadow: `inset 0 0 15px #fff`,
                backdropFilter: 'blur(10px)',
                zIndex: "9999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}>
                <LoadingBox />
                <div style={{
                    marginTop: "2rem"
                }}>
                    <Button text='cnacel' hoverText='cnacel' clickHandle={closeModal}></Button>

                </div>
            </div>
            : <></>
    );
}

