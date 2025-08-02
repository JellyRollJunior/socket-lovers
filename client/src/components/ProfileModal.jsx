import { ModalDialog } from "./ModalDialog.jsx";

const ProfileModal = ({isOpen, closeFunction, userId }) => {
  return (
    <ModalDialog isOpen={isOpen} closeFunction={closeFunction}>
      <div className="min-w-2xs flex flex-col">
        <h2 className="mb-1 self-center text-lg font-bold">{}</h2>
        <hr className="mb-4" />
      </div>
    </ModalDialog>
  );
};

export { ProfileModal }
