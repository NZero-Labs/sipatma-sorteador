import Actions from "@/components/actions";
import type { DataProps } from "@/types";

interface EditorScreenProps {
  names: DataProps;
  setNames: React.Dispatch<React.SetStateAction<DataProps>>;
  randomizeName: () => void;
}

export function EditorScreen({
  names,
  setNames,
  randomizeName,
}: EditorScreenProps) {
  return (
    <main
      className="flex flex-col items-center justify-center w-full flex-1 relative overflow-hidden"
      style={{
        backgroundImage: "url('loading-background.png')",
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

      <div className="w-full h-full flex flex-col items-center justify-center p-5 gap-8 z-10">
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

        <Actions
          names={names}
          setNames={setNames}
          randomizeName={randomizeName}
        />
      </div>
    </main>
  );
}
