interface FooterProps {
  variant?: "default" | "winner";
}

export function Footer({ variant = "default" }: FooterProps) {
  return (
    <footer
      className="w-full h-[104px] flex items-center justify-center z-50 relative px-[90px]"
      style={{ backgroundColor: "#6F47E5" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-5"
        style={{
          background:
            "linear-gradient(180deg, rgba(232, 232, 232, 0.5) 0%, rgba(232, 232, 232, 0.25) 25%, rgba(232, 232, 232, 0.2) 50%, rgba(232, 232, 232, 0.15) 75%, rgba(232, 232, 232, 0.01) 100%)",
          filter: "blur(5.3px)",
        }}
      />
      <div className="flex items-center gap-4 w-full max-w-[1740px]">
        <img
          src={variant === "winner" ? "amara-icon-white.svg" : "amara-icon-footer.svg"}
          alt="Amara NZero Icon"
          className="h-12 object-contain flex-shrink-0"
        />
        <div className="h-12 w-[5px] bg-white flex-shrink-0" />
        <p
          className="text-white text-[20px] font-bold uppercase leading-[1.2] flex-1"
          style={{ fontFamily: "Lato" }}
        >
          {variant === "winner" ? (
            "Aproveite essa oportunidade para desenvolver novas habilidades, ampliar seus conhecimentos e abrir novas oportunidades pessoais e profissionais!"
          ) : (
            <>
              Sorteio exclusivo para os participantes da palestra da SIPATMA, em
              parceria com a Amara NZero. Os ganhadores receberão uma bolsa de
              estudos de idiomas 100% gratuita, com acesso aos 8 idiomas (
              <img
                src="flags.png"
                alt="Bandeiras dos idiomas"
                className="inline-block h-5 mx-1 align-middle"
              />
              ) da plataforma por 12 meses + 16 aulas de conversação em inglês ou
              espanhol.
            </>
          )}
        </p>
      </div>
    </footer>
  );
}
