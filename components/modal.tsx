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
        className="absolute inset-0 backdrop-blur-sm bg-background-light/30 dark:bg-background-dark/30"
        onClick={onClose}
      ></div>
      <div className="bg-elevated-light dark:bg-elevated-dark p-2 rounded z-10 shadow-md relative min-w-screen sm:min-w-modal">
        <button onClick={onClose} className="p-2 absolute top-0 right-0">
          ❌
        </button>

        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
