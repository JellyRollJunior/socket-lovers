const NavigationPageWrapper = ({ children }) => {
  return (
    <>
      <div className="h-screen pb-16">{children}</div>
      <nav className="fixed bottom-0 h-16 w-full border-2 border-black bg-gray-500">
        I am a nav!
      </nav>
    </>
  );
};

export { NavigationPageWrapper };
