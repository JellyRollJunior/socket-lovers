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
      className="top-1/8 left-1/2 translate-x-[-50%] translate-y-[-50%] rounded-lg"
      ref={modalRef}
    >
      <button onClick={closeFunction}>CLOSE IT</button>
      {children}
    </dialog>
  );
};

export { ModalDialog };
