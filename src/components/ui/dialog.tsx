import * as React from 'react';
import { createPortal } from 'react-dom';
import { useState, useEffect, useCallback } from 'react';

interface DialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

function Dialog({ open, onClose, children }: DialogProps) {
    const [closing, setClosing] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setClosing(false);
            setVisible(false);
            document.body.classList.add('dialog-open');
            // trigger enter animation on next frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => setVisible(true));
            });
        } else {
            document.body.classList.remove('dialog-open');
        }
        return () => document.body.classList.remove('dialog-open');
    }, [open]);

    const handleClose = useCallback(() => {
        setVisible(false);
        setClosing(true);
        setTimeout(() => {
            setClosing(false);
            onClose();
        }, 200);
    }, [onClose]);

    useEffect(() => {
        function handleEsc(e: KeyboardEvent) {
            if (e.key === 'Escape') handleClose();
        }
        if (open) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [open, handleClose]);

    if (!open && !closing) return null;

    return createPortal(
        <div className="fixed inset-0 z-50">
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200 ${visible && !closing ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            />
            <div className="fixed inset-0 flex items-start justify-center pt-[12vh]" onClick={handleClose}>
                <div
                    className={`relative w-[95%] max-w-lg border border-(--border) bg-(--bg-elevated) p-5 shadow-2xl rounded-2xl transition-all duration-200 ${visible && !closing ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={handleClose} className="absolute right-3 top-3 p-1 text-(--fg-muted) hover:text-(--fg) transition-colors" aria-label="Close">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6 6 18M6 6l12 12" />
                        </svg>
                    </button>
                    {children}
                </div>
            </div>
        </div>,
        document.body,
    );
}

function DialogTitle({ className = '', ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h2 className={`mb-1 text-lg font-bold text-(--fg) ${className}`} {...props} />;
}

export { Dialog, DialogTitle };
