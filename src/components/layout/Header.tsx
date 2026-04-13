interface HeaderProps {
  showSipatmaLogo?: boolean;
}

export function Header({ showSipatmaLogo = false }: HeaderProps) {
  return (
    <header className="bg-white w-full flex items-center justify-center z-50 relative">
      <div className="absolute inset-x-0 bottom-0 h-5" />
      <img
        src="logo.png"
        alt="Logo Amara NZero"
        className="h-[100px] object-contain mb-2"
      />
      {showSipatmaLogo && (
        <img
          src="sipatma-logo.png"
          alt="Logo SIPATMA"
          className="h-[100px] object-contain"
        />
      )}
    </header>
  );
}
