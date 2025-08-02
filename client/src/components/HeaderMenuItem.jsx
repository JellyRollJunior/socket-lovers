const HeaderMenuItem = ({ onClick, label, closeMenu }) => {
  return (
    <li>
      <button
        className="text-nowrap bg-white px-4 py-1 hover:bg-gray-200"
        onClick={() => {
          onClick();
          closeMenu();
        }}
      >
        {label}
      </button>
    </li>
  );
};
export { HeaderMenuItem };
