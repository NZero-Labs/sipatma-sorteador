import { useState } from "react";
import Actions from "@/components/actions";
import { HistoryIcon } from "@/components/ui/history-icon";
import { HistoryModal } from "@/components/history-modal";
import type { DataProps, Participant } from "@/types";

interface WinnerScreenProps {
  name: Participant;
  names: DataProps;
  randomizeName: () => void;
  prizesRemaining: number;
  winners: Participant[];
  onReset: () => void;
}

export function WinnerScreen({
  name,
  names,
  randomizeName,
  prizesRemaining,
  winners,
  onReset,
}: WinnerScreenProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [historyHovered, setHistoryHovered] = useState(false);

  return (
    <main
      className="flex flex-col items-center justify-center w-full flex-1 relative overflow-hidden"
      style={{
        backgroundImage: "url('background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0" />

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

        <div className="mt-8 flex flex-col items-center gap-2">
          {prizesRemaining > 0 ? (
            <>
              <Actions
                names={names}
                randomizeName={randomizeName}
                isNewChance={true}
                prizesRemaining={prizesRemaining}
              />
              <span
                className="text-[20px] font-bold"
                style={{ color: "#575756", fontFamily: "Lato" }}
              >
                {prizesRemaining} {prizesRemaining === 1 ? "prêmio restante" : "prêmios restantes"}
              </span>
            </>
          ) : (
            <>
              <span
                className="text-[20px] font-bold mb-4"
                style={{ color: "#6F47E5", fontFamily: "Lato" }}
              >
                Todos os prêmios foram sorteados!
              </span>
              <button
                onClick={onReset}
                className="flex items-center justify-center transition-all hover:opacity-90"
                style={{
                  width: "356px",
                  height: "50px",
                  backgroundColor: "#00953B",
                  borderRadius: "44px",
                }}
              >
                <span
                  className="text-white capitalize"
                  style={{ fontSize: "25px", fontFamily: "Lato" }}
                >
                  Novo Sorteio
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Botão de histórico */}
      <button
        className="absolute bottom-8 right-8 transition-all hover:scale-105 active:scale-95 cursor-pointer z-20"
        onClick={() => setHistoryOpen(true)}
        onMouseEnter={() => setHistoryHovered(true)}
        onMouseLeave={() => setHistoryHovered(false)}
        aria-label="Histórico de sorteios"
      >
        <HistoryIcon size={70} hovered={historyHovered} />
      </button>

      <HistoryModal
        open={historyOpen}
        onOpenChange={setHistoryOpen}
        winners={winners}
      />
    </main>
  );
}
