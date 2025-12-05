import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LeadModal from './LeadModal';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
    onOpenModal: () => void;
    isModalOpen: boolean;
    onCloseModal: () => void;
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ onOpenModal, isModalOpen, onCloseModal, children }) => {
    return (
        <>
            <Navbar onOpenModal={onOpenModal} />
            <main>
                {children || <Outlet context={{ onOpenModal }} />}
            </main>
            <Footer />
            <LeadModal isOpen={isModalOpen} onClose={onCloseModal} />
        </>
    );
};

export default Layout;
