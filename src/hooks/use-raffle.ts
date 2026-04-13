import { useState, useCallback } from "react";
import { useEventListener } from "@/hooks/use-event-listener";
import type { DataProps, Participant } from "@/types";

const COUNTDOWN_DURATION = 5;

interface UseRaffleReturn {
  name: Participant | undefined;
  names: DataProps;
  setNames: React.Dispatch<React.SetStateAction<DataProps>>;
  showEditor: boolean;
  isFinal: boolean;
  cancelAnimation: boolean;
  isLoading: boolean;
  autoCounter: number;
  totalPrizes: number;
  setTotalPrizes: (value: number) => void;
  prizesRemaining: number;
  setPrizesRemaining: (value: number) => void;
  fileName: string | null;
  setFileName: (name: string | null) => void;
  winners: Participant[];
  randomizeName: () => void;
  resetRaffle: () => void;
}

export function useRaffle(): UseRaffleReturn {
  const [name, setName] = useState<Participant | undefined>();
  const [names, setNames] = useState<DataProps>([]);
  const [showEditor, setShowEditor] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [cancelAnimation, setCancelAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCounter, setAutoCounter] = useState(COUNTDOWN_DURATION);
  const [totalPrizes, setTotalPrizes] = useState(1);
  const [prizesRemaining, setPrizesRemaining] = useState(1);
  const [fileName, setFileName] = useState<string | null>(null);
  const [winners, setWinners] = useState<Participant[]>([]);

  const randomizeName = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setIsFinal(false);
    setIsLoading(true);
    setShowEditor(false);
    setCancelAnimation(false);
    setAutoCounter(COUNTDOWN_DURATION);

    const autoCounterInterval = setInterval(() => {
      setAutoCounter((v) => v - 1);
    }, 1000);

    setTimeout(() => {
      const winner = names[index];
      setName(winner);
      setWinners((prev) => [...prev, winner]);
      setIsFinal(true);
      setIsLoading(false);
      clearInterval(autoCounterInterval);
      setAutoCounter(COUNTDOWN_DURATION);

      const newNames = [...names];
      newNames.splice(index, 1);
      setNames(newNames);

      setPrizesRemaining((prev) => Math.max(0, prev - 1));
    }, COUNTDOWN_DURATION * 1000);
  }, [names]);

  const resetRaffle = useCallback(() => {
    setName(undefined);
    setNames([]);
    setShowEditor(true);
    setIsFinal(false);
    setCancelAnimation(false);
    setIsLoading(false);
    setAutoCounter(COUNTDOWN_DURATION);
    setTotalPrizes(1);
    setPrizesRemaining(1);
    setFileName(null);
    setWinners([]);
  }, []);

  useEventListener("visibilitychange" as keyof WindowEventMap, () => {
    // #region agent log
    console.log('[DEBUG H3] Visibility changed', { visibilityState: document.visibilityState, timestamp: Date.now() });
    // #endregion
    if (document.visibilityState === "visible") {
      setCancelAnimation(false);
    } else {
      setCancelAnimation(true);
    }
  });

  return {
    name,
    names,
    setNames,
    showEditor,
    isFinal,
    cancelAnimation,
    isLoading,
    autoCounter,
    totalPrizes,
    setTotalPrizes,
    prizesRemaining,
    setPrizesRemaining,
    fileName,
    setFileName,
    winners,
    randomizeName,
    resetRaffle,
  };
}
