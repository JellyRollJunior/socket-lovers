const TwoColumnLayout = ({ aside, children}) => {
  return (
    <div className="flex h-full">
      <aside className="border-r-1 min-w-xs max-w-sm flex-3 hidden border-gray-500 md:block">
        {aside}
      </aside>
      <div className="flex-8">
        {children}
      </div>
    </div>
  );
};

export { TwoColumnLayout };
