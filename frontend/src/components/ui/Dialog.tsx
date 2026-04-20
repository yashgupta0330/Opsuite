'use client';

import React, { useEffect, useRef } from 'react';

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({ open, onClose, children, id, className = '' }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
        document.body.style.overflow = '';
      }
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => dialog.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    const dialogDimensions = dialogRef.current?.getBoundingClientRect();
    if (!dialogDimensions) return;

    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id={id}
      onClick={handleBackdropClick}
      className={`fixed inset-0 size-auto max-h-none max-w-none overflow-y-auto bg-transparent backdrop:bg-gray-900/50 backdrop:backdrop-blur-sm backdrop:transition-opacity focus:outline-none ${className}`}
    >
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        {open && children}
      </div>
    </dialog>
  );
};

interface DialogPanelProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogPanel: React.FC<DialogPanelProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogHeader: React.FC<DialogHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<{ children: React.ReactNode; id?: string; className?: string }> = ({
  children,
  id,
  className = '',
}) => {
  return (
    <h3 id={id} className={`text-base font-semibold text-gray-900 ${className}`}>
      {children}
    </h3>
  );
};

export const DialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`mt-2 ${className}`}>
      <p className="text-sm text-gray-500">{children}</p>
    </div>
  );
};

export const DialogCloseButton: React.FC<{
  onClick: () => void;
  ariaLabel?: string;
  className?: string;
}> = ({ onClick, ariaLabel = 'Close', className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${className}`}
      aria-label={ariaLabel}
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 6L18 18M18 6L6 18" />
      </svg>
    </button>
  );
};
