import { useState } from "react";
import "./index.css";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import Actions from "@/components/actions";
import { useEventListener } from "@/hooks/use-event-listener";

export type DataProps = Array<{
  name: string;
  corporation: string;
}>;

export default function App() {
  const [name, setName] = useState<DataProps[number] | undefined>();
  const [names, setNames] = useState<DataProps>([]);
  const [showEditor, setShowEditor] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [cancelAnimation, setCancelAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCounter, setAutoCounter] = useState(5);

  const randomizeName = () => {
    const index = Math.floor(Math.random() * names.length);
    setIsFinal(false);
    setIsLoading(true);
    setShowEditor(false);
    setCancelAnimation(false);
    setAutoCounter(5);
    const autoCounterInterval = setInterval(() => {
      setAutoCounter((v) => v - 1);
    }, 1000);
    setTimeout(() => {
      setName(names[index]);
      setIsFinal(true);
      setIsLoading(false);
      clearInterval(autoCounterInterval);
      setAutoCounter(5);
      const newNames = [...names];
      newNames.splice(index, 1);
      setNames(newNames);
    }, 5 * 1000);
  };

  useEventListener("visibilitychange" as keyof WindowEventMap, () => {
    if (document.visibilityState === "visible") {
      setCancelAnimation(false);
    } else {
      setCancelAnimation(true);
    }
  });

  const isWinnerScreen = name && isFinal && !isLoading;

  return (
    <>
      {isFinal && !cancelAnimation && <Fireworks autorun={{ speed: 3 }} />}

      {/* Header - Aparece em todas as telas */}
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
        {(isFinal || isLoading) && (
          <img
            src="sipatma-logo.png"
            alt="Logo SIPATMA"
            className="h-[100px] object-contain"
          />
        )}
      </header>

      {/* Winner Screen */}
      {isWinnerScreen ? (
        <>
          {/* Main Content - Winner */}
          <main
            className="flex flex-col items-center justify-center w-full flex-1 relative overflow-hidden"
            style={{
              backgroundImage: "url('background.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(115, 115, 115, 0.05) 0%, rgba(140, 140, 140, 0.1) 42%, rgba(166, 166, 166, 0.15) 64%, rgba(217, 217, 217, 0.5) 98%)",
              }}
            />

            <div className="flex-1 flex flex-col items-center justify-center z-10 relative px-8">
              {/* Parabéns */}
              <p
                className="text-[40px] font-bold uppercase mb-4"
                style={{ color: "#6F47E5", fontFamily: "Lato" }}
              >
                PARABÉNS!
              </p>

              {/* Winner Name */}
              <h1
                className="text-[70px] lg:text-[90px] font-bold uppercase text-center leading-[1.2]"
                style={{
                  color: "#76BC21",
                  fontFamily: "Lato",
                  letterSpacing: "-0.11em",
                  textShadow:
                    "0px 4px 32px rgba(255, 255, 255, 1), 0px 4px 15px rgba(0, 0, 0, 0.1), -8px -8px 0 white, 8px -8px 0 white, -8px 8px 0 white, 8px 8px 0 white",
                }}
              >
                {name?.name}
              </h1>

              {/* Prize Message */}
              <div className="flex items-center justify-center text-center mt-8 max-w-[1315px]">
                <p
                  className="text-[35px] lg:text-[40px] font-bold uppercase leading-[1.3] flex flex-wrap items-center justify-center"
                  style={{ color: "#6F47E5", fontFamily: "Lato" }}
                >
                  <span className="w-full">
                    Você ganhou uma bolsa de estudos de idiomas
                  </span>
                  <span className="inline-flex items-center">
                    100% gratuita, na
                    <img
                      src="amara-logo-48e9f7.png"
                      alt="Fluency"
                      className="inline-block h-[1em] mx-2 rounded-full"
                      style={{ verticalAlign: "middle" }}
                    />
                    ACADEMY!
                  </span>
                </p>
              </div>

              {/* Sortear Novamente Button */}
              <div className="mt-8">
                <Actions
                  names={names}
                  setNames={setNames}
                  randomizeName={randomizeName}
                  isNewChance={true}
                />
              </div>
            </div>
          </main>

          {/* Footer Final */}
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
                src="amara-icon-white.svg"
                alt="Amara NZero Icon"
                className="h-12 object-contain flex-shrink-0"
              />
              <div className="h-12 w-[5px] bg-white flex-shrink-0" />
              <p
                className="text-white text-[20px] font-bold uppercase leading-[1.2] flex-1"
                style={{ fontFamily: "Lato" }}
              >
                Aproveite essa oportunidade para desenvolver novas habilidades,
                ampliar seus conhecimentos e abrir novas oportunidades pessoais
                e profissionais!
              </p>
            </div>
          </footer>
        </>
      ) : (
        <>
          {/* Main Content */}
          <main
            className="flex flex-col items-center justify-center w-full flex-1 relative overflow-hidden"
            style={{
              backgroundImage: "url('loading-background.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay gradient */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(0deg, rgba(115, 115, 115, 0.05) 0%, rgba(140, 140, 140, 0.1) 42%, rgba(166, 166, 166, 0.15) 64%, rgba(217, 217, 217, 0.5) 98%)",
              }}
            />

            {/* Loading Animation */}
            {isLoading && (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full z-10">
                <div className="relative flex items-center justify-center w-[400px] h-[400px]">
                  {/* Gradient container with mask */}
                  <div
                    className="absolute rounded-full overflow-hidden"
                    style={{
                      width: "245px",
                      height: "245px",
                      top: "48%",
                      left: "50%",
                      transform: "translate(-50%, -46%)",
                    }}
                  >
                    {/* Spinning gradient */}
                    <div
                      className="w-full h-full animate-spin-slow-center"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #00953b, #76bc21, #c1d116, #00953b)",
                      }}
                    />
                  </div>
                  {/* Stopwatch frame overlay */}
                  <img
                    src="stopwatch.png"
                    alt="Stopwatch"
                    className="absolute w-[400px] h-[400px] object-contain z-10"
                  />
                  {/* Counter */}
                  <span
                    className="absolute font-bold text-[180px] text-white z-20"
                    style={{
                      fontFamily: "Lato",
                      textShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                      marginTop: "-10px",
                    }}
                  >
                    {autoCounter}
                  </span>
                </div>
              </div>
            )}

            {/* Initial Screen - Sorteio Card */}
            {showEditor && !isLoading && (
              <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-8 z-10">
                {/* Sorteio Label */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-[50px] font-bold uppercase"
                    style={{ color: "#6F47E5", fontFamily: "Lato" }}
                  >
                    Sorteio
                  </span>
                  <img
                    src="amara-logo-48e9f7.png"
                    alt="Logo Amara NZero"
                    className="h-[65px] object-contain rounded-full"
                  />
                </div>

                {/* Main Sorteio Card */}
                <div
                  className="relative flex items-center justify-center rounded-lg overflow-hidden"
                  style={{
                    maxWidth: "90vw",
                  }}
                >
                  <img
                    src="sipatma-logo.png"
                    alt="SIPATMA Sorteio"
                    className="w-auto h-auto max-w-full max-h-[30vh] object-contain"
                  />
                </div>

                {/* Action Buttons */}
                <Actions
                  names={names}
                  setNames={setNames}
                  randomizeName={randomizeName}
                />
              </div>
            )}
          </main>

          {/* Footer - Purple with description */}
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
                src="amara-icon-footer.svg"
                alt="Amara NZero Icon"
                className="h-12 object-contain flex-shrink-0"
              />
              <div className="h-12 w-[5px] bg-white flex-shrink-0" />
              <p
                className="text-white text-[20px] font-bold uppercase leading-[1.2] flex-1"
                style={{ fontFamily: "Lato" }}
              >
                Sorteio exclusivo para os participantes da palestra da SIPATMA,
                em parceria com a Amara NZero. Os ganhadores receberão uma bolsa
                de estudos de idiomas 100% gratuita, com acesso aos 8 idiomas (
                <img
                  src="flags.png"
                  alt="Bandeiras dos idiomas"
                  className="inline-block h-5 mx-1 align-middle"
                />
                ) da plataforma por 12 meses + 16 aulas de conversação em inglês
                ou espanhol.
              </p>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
