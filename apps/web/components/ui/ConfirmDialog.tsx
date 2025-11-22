// TODO: Replace with a real Dialog component from a UI library like Material UI

'use client'
import { useRef } from 'react';
import { Button } from './Button';

function Dialog({
  children,
  open,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  [key: string]: any;
}) {
  if (!open) {
    return null;
  }
  return <div {...props}>{children}</div>;
}

function DialogTitle({
  children,
  ...props
}: {
  children: React.ReactNode;
  [key: string]: any;
}) {
  return <h2 {...props}>{children}</h2>;
}

function DialogContent({ children, ...props }: { children: React.ReactNode }) {
  return <div {...props}>{children}</div>;
}

function DialogActions({ children, ...props }: { children: React.ReactNode }) {
  return <div {...props}>{children}</div>;
}

export function ConfirmDialog({ open, onClose, onConfirm, title, children }: { open: boolean, onClose: () => void, onConfirm: () => void, title: string, children: React.ReactNode }) {
  const cancelRef = useRef(null);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      initialFocus={cancelRef}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button ref={cancelRef} onClick={onClose} loading={false}>Cancel</Button>
        <Button variant="danger" onClick={onConfirm} loading={false}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}