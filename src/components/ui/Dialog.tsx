import { ReactNode, useEffect, useRef } from 'react';
export function Dialog({
  open,
  onClose,
  titleId,
  children,
  drawer = false,
  className = ''
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
  drawer?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      if (previousFocus?.isConnected) previousFocus.focus({
        preventScroll: true
      });
    };
  }, [open]);
  return <dialog ref={ref} aria-labelledby={titleId} className={`hood-dialog ${drawer ? 'hood-dialog--drawer' : ''} ${className}`} onCancel={event => {
    event.preventDefault();
    closeRef.current();
  }} onClick={event => {
    if (event.target === event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeRef.current();
    }
  }}>
    {open && children}
  </dialog>;
}
