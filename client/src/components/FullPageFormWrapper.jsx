const FullPageFormWrapper = ({ children }) => {
  return (
    <div className="flex h-screen flex-col items-center">
      <h1 className="mt-36 text-5xl font-extrabold italic">Socket Lovers</h1>
      {children}
    </div>
  );
};

export { FullPageFormWrapper }