import Actions from "@/components/actions";
import type { DataProps, Participant } from "@/types";

interface WinnerScreenProps {
  name: Participant;
  names: DataProps;
  setNames: React.Dispatch<React.SetStateAction<DataProps>>;
  randomizeName: () => void;
}

export function WinnerScreen({
  name,
  names,
  setNames,
  randomizeName,
}: WinnerScreenProps) {
  return (
    <main
      className="flex flex-col items-center justify-center w-full flex-1 relative overflow-hidden"
      style={{
        backgroundImage: "url('background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(0deg, rgba(115, 115, 115, 0.05) 0%, rgba(140, 140, 140, 0.1) 42%, rgba(166, 166, 166, 0.15) 64%, rgba(217, 217, 217, 0.5) 98%)",
        }}
      />

      <div className="flex-1 flex flex-col items-center justify-center z-10 relative px-8">
        <p
          className="text-[40px] font-bold uppercase mb-4"
          style={{ color: "#6F47E5", fontFamily: "Lato" }}
        >
          PARABÉNS!
        </p>

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
          {name.name}
        </h1>

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
  );
}
