"use client";
import { X } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Participant } from "@/types";

interface HistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  winners: Participant[];
}

export function HistoryModal({
  open,
  onOpenChange,
  winners,
}: HistoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            Histórico de Sorteios
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
        <div className="px-[25px] py-4 flex flex-col gap-3">
          {winners.length === 0 ? (
            <p
              className="text-center py-8"
              style={{ fontSize: "20px", color: "#575756" }}
            >
              Nenhum sorteio realizado ainda.
            </p>
          ) : (
            <div
              className="flex flex-col gap-1"
              style={{
                maxHeight: "calc(90vh - 180px)",
                overflowY: winners.length > 10 ? "auto" : "visible",
                scrollbarWidth: "thin",
              }}
            >
              {winners.map((winner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-2 rounded-lg"
                  style={{
                    backgroundColor: "rgba(0, 149, 59, 0.05)",
                    border: "1px solid #00953B",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex items-center justify-center w-8 h-8 rounded-full font-bold flex-shrink-0"
                      style={{
                        backgroundColor: "#00953B",
                        color: "#FFFFFF",
                        fontSize: "14px",
                      }}
                    >
                      {index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span
                        className="font-bold"
                        style={{ fontSize: "16px", color: "#575756" }}
                      >
                        {winner.name}
                      </span>
                      {winner.corporation && (
                        <span
                          style={{ fontSize: "12px", color: "#575756" }}
                        >
                          {winner.corporation}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer com botão */}
        <div className="flex items-center justify-center px-[25px] pb-4">
          <button
            onClick={() => onOpenChange(false)}
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
              Fechar
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
