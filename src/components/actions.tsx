import { DataProps } from "@/App";
import { CsvImporter } from "@/components/csv-importer";
import { toast } from "sonner";

interface ActionsProps {
  names: DataProps;
  setNames: React.Dispatch<React.SetStateAction<DataProps>>;
  randomizeName: () => void;
  isNewChance?: boolean;
}

export default function Actions({
  names,
  setNames,
  randomizeName,
  isNewChance = false,
}: ActionsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {!isNewChance && (
        <CsvImporter
          fields={[
            { label: "Name", value: "name", required: true },
            { label: "Empresa", value: "corporation", required: false },
          ]}
          onImport={(parsedData) => {
            const formattedData: DataProps = parsedData
              .map((item) => ({
                name: String(item.name ?? ""),
                corporation: String(item.corporation ?? ""),
              }))
              .filter(function (item, pos, self) {
                return (
                  self.findIndex(
                    (itemSelf) =>
                      itemSelf.name === item.name &&
                      item.corporation === itemSelf.corporation,
                  ) == pos
                );
              });

            setNames((prev) => [...prev, ...formattedData]);
          }}
        />
      )}
      {isNewChance ? (
        <button
          className="transition-all hover:scale-105 active:scale-95 cursor-pointer"
          onClick={() =>
            names.length > 0
              ? randomizeName()
              : toast.error("Por favor forneça uma lista de nomes")
          }
        >
          <span
            className="font-bold text-[25px] text-center uppercase underline"
            style={{ color: "#00953B", fontFamily: "Lato", lineHeight: "2.6em" }}
          >
            SORTEAR NOVAMENTE{names.length > 0 && ` (${names.length})`}
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
          onClick={() =>
            names.length > 0
              ? randomizeName()
              : toast.error("Por favor forneça uma lista de nomes")
          }
        >
          <span
            className="text-white font-bold text-[35px] text-center uppercase"
            style={{ fontFamily: "Lato", lineHeight: "1em" }}
          >
            SORTEAR VENCEDOR!{names.length > 0 && ` (${names.length})`}
          </span>
        </button>
      )}
    </div>
  );
}
