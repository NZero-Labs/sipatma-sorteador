interface HeaderProps {
  showSipatmaLogo?: boolean;
}

export function Header({ showSipatmaLogo = false }: HeaderProps) {
  return (
    <header className="bg-white w-full flex items-center justify-center z-50 relative">
      <div
        className="absolute inset-x-0 bottom-0 h-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(87, 87, 86, 0.5) 0%, rgba(87, 87, 86, 0.25) 25%, rgba(87, 87, 86, 0.2) 50%, rgba(87, 87, 86, 0.15) 75%, rgba(87, 87, 86, 0.01) 100%)",
          filter: "blur(5.3px)",
        }}
      />
      <img
        src="logo.png"
        alt="Logo Amara NZero"
        className="h-[100px] object-contain"
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
