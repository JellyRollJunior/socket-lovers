import { useRef } from 'react';

const ModalDialog = ({ isOpen, closeFunction, children }) => {
  const modalRef = useRef(null);

  if (modalRef && modalRef.current) {
    isOpen
      ? modalRef.current.showModal()
      : modalRef.current.open && modalRef.current.close();
  }
  return (
    <dialog
      className="top-1/8 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg px-4 pb-4 pt-2"
      ref={modalRef}
    >
      <div className="flex flex-col">
        <button className="ml-auto self-end text-2xl" onClick={closeFunction}>
          ×
        </button>
        {children}
      </div>
    </dialog>
  );
};

export { ModalDialog };
