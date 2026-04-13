import type { DataProps } from "@/types";
import { useToast } from "@/components/ui/simple-toast";

interface ActionsProps {
  names: DataProps;
  randomizeName: () => void;
  isNewChance?: boolean;
  prizesRemaining?: number;
}

export default function Actions({
  names,
  randomizeName,
  isNewChance = false,
  prizesRemaining,
}: ActionsProps) {
  const { showToast } = useToast();

  return (
    <div className="flex items-center justify-center gap-4">
      {isNewChance ? (
        <button
          className="transition-all hover:scale-105 active:scale-95 cursor-pointer"
          onClick={() => {
            if (names.length > 0 && prizesRemaining !== undefined && prizesRemaining > 0) {
              randomizeName();
            } else {
              showToast(
                prizesRemaining === 0
                  ? "Todos os prêmios já foram sorteados"
                  : "Por favor forneça uma lista de nomes",
                "error",
                8000
              );
            }
          }}
        >
          <span
            className="font-bold text-[25px] text-center uppercase underline"
            style={{ color: "#00953B", fontFamily: "Lato", lineHeight: "2.6em" }}
          >
            SORTEAR NOVAMENTE
          </span>
        </button>
      ) : (
        <button
          className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-[15px] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            background: "#00953B",
            minWidth: "500px",
            height: "70px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
          onClick={() => {
            // #region agent log
            console.log('[DEBUG H1] Button clicked', { namesLength: names.length, timestamp: Date.now() });
            // #endregion
            if (names.length > 0) {
              randomizeName();
            } else {
              // #region agent log
              console.log('[DEBUG H1] Toast called', { timestamp: Date.now() });
              // #endregion
              showToast("Por favor forneça uma lista de nomes", "error", 8000);
            }
          }}
        >
          <span
            className="text-white font-bold text-[35px] text-center uppercase"
            style={{ fontFamily: "Lato", lineHeight: "1em" }}
          >
            SORTEAR VENCEDOR!
          </span>
        </button>
      )}
    </div>
  );
}
