type ModalProps = React.PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background-light/30 backdrop-blur-sm dark:bg-background-dark/30"
        onClick={onClose}
      ></div>
      <div className="relative z-10 max-h-modal min-w-screen overflow-scroll rounded bg-elevated-light p-2 shadow-md dark:bg-elevated-dark sm:min-w-modal">
        <button onClick={onClose} className="absolute right-0 top-0 p-2">
          ❌
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
