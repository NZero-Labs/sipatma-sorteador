"use client";
import * as React from "react";
import { ArrowLeftIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { CommandList } from "cmdk";
import { X } from "lucide-react";
import Dropzone from "react-dropzone";

import { cn } from "@/lib/utils";
import { useParseCsv } from "@/hooks/use-parse-csv";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DataProps } from "@/types";

interface SettingsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalPrizes: number;
  setTotalPrizes: (value: number) => void;
  setNames: React.Dispatch<React.SetStateAction<DataProps>>;
  setFileName: (name: string | null) => void;
  setPrizesRemaining: (value: number) => void;
}

const CSV_FIELDS = [
  { label: "Name", value: "name", required: true },
  { label: "Unidade", value: "corporation", required: false },
];

function CustomUploadIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 26.6667V13.3333M20 13.3333L14.1667 19.1667M20 13.3333L25.8333 19.1667"
        stroke="#00953B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M33.3333 26.6667V30C33.3333 31.8409 31.841 33.3333 30 33.3333H10C8.15905 33.3333 6.66667 31.8409 6.66667 30V26.6667"
        stroke="#00953B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SettingsModal({
  open,
  onOpenChange,
  totalPrizes,
  setTotalPrizes,
  setNames,
  setFileName,
  setPrizesRemaining,
}: SettingsModalProps) {
  const [step, setStep] = React.useState<"settings" | "map">("settings");
  const [localPrizes, setLocalPrizes] = React.useState(totalPrizes);
  const [pendingFileName, setPendingFileName] = React.useState<string | null>(
    null,
  );
  const [pendingData, setPendingData] = React.useState<DataProps>([]);

  const {
    data,
    fieldMappings,
    onParse,
    onFieldChange,
    onFieldToggle,
    onFieldsReset,
    getSanitizedData,
  } = useParseCsv({ fields: CSV_FIELDS });

  React.useEffect(() => {
    if (open) {
      setLocalPrizes(totalPrizes);
      setStep("settings");
      setPendingFileName(null);
      setPendingData([]);
    }
  }, [open, totalPrizes]);

  const handleSave = () => {
    setTotalPrizes(localPrizes);
    setPrizesRemaining(localPrizes);
    if (pendingData.length > 0) {
      setNames(pendingData);
      setFileName(pendingFileName);
    }
    onOpenChange(false);
  };

  const handleImportComplete = () => {
    const sanitizedData = getSanitizedData({ data }) as Array<{
      name?: unknown;
      corporation?: unknown;
    }>;
    const formattedData: DataProps = sanitizedData
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
          ) === pos
        );
      });

    setPendingData(formattedData);
    setStep("settings");
  };

  const handleFileDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setPendingFileName(file.name);
      onParse({ file });
      setStep("map");
    },
    [onParse],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {step === "settings" && (
        <DialogContent
          className="p-0 border-[#575756] overflow-hidden"
          hideCloseButton
          style={{
            width: "660px",
            maxWidth: "95vw",
            borderRadius: "12.5px",
            fontFamily: "Lato",
          }}
        >
          {/* Header verde */}
          <div
            className="relative flex items-center justify-center"
            style={{
              backgroundColor: "#00953B",
              height: "50.8px",
              borderRadius: "12.5px 12.5px 0 0",
            }}
          >
            <span
              className="font-bold text-white uppercase"
              style={{ fontSize: "25px" }}
            >
              Configurações do sorteio
            </span>
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 text-white hover:opacity-80 transition-opacity"
              aria-label="Fechar"
            >
              <X size={25} />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="px-[25px] py-6 flex flex-col gap-6">
            {/* Quantidade de prêmios */}
            <div className="flex flex-col gap-3">
              <label
                style={{
                  fontSize: "25px",
                  color: "#575756",
                  fontWeight: 400,
                }}
              >
                Digite a quantidade de prêmios que serão ofertados:
              </label>
              <div
                className="relative flex items-center"
                style={{
                  width: "610px",
                  maxWidth: "100%",
                  height: "50.8px",
                  border: "1px solid #00953B",
                  borderRadius: "10px",
                }}
              >
                <input
                  type="number"
                  min={0}
                  value={localPrizes}
                  onChange={(e) =>
                    setLocalPrizes(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="w-full h-full px-4 text-right bg-transparent outline-none"
                  style={{
                    fontSize: "25px",
                    color:
                      localPrizes > 0 ? "#00953B" : "rgba(0, 149, 59, 0.5)",
                    fontFamily: "Lato",
                  }}
                />
              </div>
            </div>

            {/* Lista de participantes */}
            <div className="flex flex-col gap-3">
              <label
                style={{
                  fontSize: "25px",
                  color: "#575756",
                  fontWeight: 400,
                }}
              >
                Lista de participantes:
              </label>
              <Dropzone
                onDrop={handleFileDrop}
                accept={{
                  "text/csv": [".csv"],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    [".xlsx"],
                  "application/vnd.ms-excel": [".xls"],
                }}
                maxFiles={1}
                multiple={false}
              >
                {({ getRootProps, getInputProps, isDragActive }) => (
                  <div
                    {...getRootProps()}
                    className={cn(
                      "flex flex-col items-center justify-center cursor-pointer transition-all",
                      isDragActive && "opacity-70",
                    )}
                    style={{
                      width: "610px",
                      maxWidth: "100%",
                      height: "134.11px",
                      backgroundColor: "rgba(0, 149, 59, 0.05)",
                      border: "1px dashed #00953B",
                      borderRadius: "15px",
                    }}
                  >
                    <input {...getInputProps()} />
                    <CustomUploadIcon />
                    <span
                      className="font-bold underline text-center mt-2"
                      style={{
                        fontSize: "15px",
                        color: "#00953B",
                        lineHeight: "120%",
                      }}
                    >
                      Clique aqui ou arraste um
                      <br />
                      arquivo .xlsx ou .csv
                    </span>
                  </div>
                )}
              </Dropzone>
              {pendingData.length > 0 && pendingFileName && (
                <span
                  style={{
                    fontSize: "16px",
                    color: "#00953B",
                  }}
                >
                  {pendingFileName} ({pendingData.length} participantes)
                </span>
              )}
            </div>
          </div>

          {/* Footer com botões */}
          <div
            className="flex items-center justify-between px-[25px] pb-[25px]"
            style={{ marginTop: "auto" }}
          >
            <button
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-center transition-all hover:opacity-80"
              style={{
                width: "239px",
                height: "50px",
                backgroundColor: "rgba(87, 87, 86, 0.5)",
                borderRadius: "44px",
              }}
            >
              <span
                className="text-white capitalize"
                style={{ fontSize: "25px", fontFamily: "Lato" }}
              >
                Cancelar
              </span>
            </button>
            <button
              onClick={handleSave}
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
                Salvar configurações
              </span>
            </button>
          </div>
        </DialogContent>
      )}

      {step === "map" && (
        <DialogContent
          className="p-0 border-[#575756] overflow-hidden"
          hideCloseButton
          style={{
            width: "900px",
            maxWidth: "95vw",
            borderRadius: "12.5px",
            fontFamily: "Lato",
          }}
        >
          {/* Header verde */}
          <div
            className="relative flex items-center justify-center"
            style={{
              backgroundColor: "#00953B",
              height: "50.8px",
              borderRadius: "12.5px 12.5px 0 0",
            }}
          >
            <span
              className="font-bold text-white uppercase"
              style={{ fontSize: "25px" }}
            >
              Mapear Campos
            </span>
            <button
              onClick={() => {
                onFieldsReset();
                setStep("settings");
              }}
              className="absolute right-4 text-white hover:opacity-80 transition-opacity"
              aria-label="Voltar"
            >
              <X size={25} />
            </button>
          </div>

          {/* Conteúdo */}
          <div className="px-[25px] py-6">
            <p className="mb-4" style={{ fontSize: "16px", color: "#575756" }}>
              Associe os campos da relação:
            </p>
            <div className="grid h-[300px] w-full overflow-auto rounded-md border border-[#00953B]">
              <Table className="border-b">
                <TableHeader className="sticky top-0 z-10 bg-white shadow">
                  <TableRow className="bg-[rgba(0,149,59,0.05)]">
                    {CSV_FIELDS.map((field) => (
                      <PreviewTableHead
                        key={field.value}
                        field={field}
                        onFieldChange={(f) => {
                          onFieldChange({
                            oldValue: f.value,
                            newValue: field.value,
                          });
                        }}
                        onFieldToggle={onFieldToggle}
                        originalFieldMappings={fieldMappings.original}
                        currentFieldMapping={fieldMappings.current[field.value]}
                        className="border-r border-[#00953B]"
                      />
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row, i) => (
                    <TableRow key={i} className="h-10">
                      {CSV_FIELDS.map((field) => (
                        <TableCell
                          key={field.value}
                          className="border-r border-[#00953B] last:border-r-0"
                        >
                          <span className="line-clamp-1">
                            {String(row[field.value] ?? "")}
                          </span>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Footer com botões */}
          <div className="flex items-center justify-between px-[25px] pb-[25px]">
            <button
              onClick={() => {
                onFieldsReset();
                setStep("settings");
              }}
              className="flex items-center justify-center transition-all hover:opacity-80"
              style={{
                width: "239px",
                height: "50px",
                backgroundColor: "rgba(87, 87, 86, 0.5)",
                borderRadius: "44px",
              }}
            >
              <span
                className="text-white capitalize"
                style={{ fontSize: "25px", fontFamily: "Lato" }}
              >
                Voltar
              </span>
            </button>
            <button
              onClick={handleImportComplete}
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
                Importar
              </span>
            </button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

interface PreviewTableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  field: { label: string; value: string; required?: boolean };
  onFieldChange: (props: { value: string; required?: boolean }) => void;
  onFieldToggle: (props: { value: string; checked: boolean }) => void;
  currentFieldMapping: string | undefined;
  originalFieldMappings: Record<string, string | undefined>;
}

function PreviewTableHead({
  field,
  onFieldChange,
  onFieldToggle,
  currentFieldMapping,
  originalFieldMappings,
  className,
  ...props
}: PreviewTableHeadProps) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);

  return (
    <TableHead className={cn("whitespace-nowrap py-2", className)} {...props}>
      <div className="flex items-center gap-4 pr-1.5">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`${id}-${field.value}`}
            defaultChecked
            onCheckedChange={(checked: boolean) => {
              onFieldToggle({
                value: field.value,
                checked: !!checked,
              });
            }}
            disabled={field.required}
            className="border-[#00953B] data-[state=checked]:bg-[#00953B]"
          />
          <Label
            htmlFor={`${id}-${field.value}`}
            className="truncate"
            style={{ color: "#575756" }}
          >
            {field.label}
          </Label>
        </div>
        <ArrowLeftIcon
          className="size-4"
          style={{ color: "#00953B" }}
          aria-hidden="true"
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              aria-expanded={open}
              className="w-48 justify-between border-[#00953B]"
              style={{ color: "#575756" }}
            >
              {currentFieldMapping || "Select field..."}
              <CaretSortIcon className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
            <Command>
              <CommandInput placeholder="Search field..." />
              <CommandEmpty>Nenhum campo encontrado.</CommandEmpty>
              <CommandList>
                <CommandGroup>
                  {[...new Set(Object.values(originalFieldMappings))].map(
                    (fm) => (
                      <CommandItem
                        key={fm}
                        value={fm}
                        onSelect={() => {
                          onFieldChange({
                            value: fm ?? "",
                          });
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 size-4",
                            currentFieldMapping === fm
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                          style={{ color: "#00953B" }}
                        />
                        <span className="line-clamp-1">{fm}</span>
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </TableHead>
  );
}
