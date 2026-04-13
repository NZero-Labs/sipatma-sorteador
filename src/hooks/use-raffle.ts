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
  randomizeName: () => void;
}

export function useRaffle(): UseRaffleReturn {
  const [name, setName] = useState<Participant | undefined>();
  const [names, setNames] = useState<DataProps>([]);
  const [showEditor, setShowEditor] = useState(true);
  const [isFinal, setIsFinal] = useState(false);
  const [cancelAnimation, setCancelAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoCounter, setAutoCounter] = useState(COUNTDOWN_DURATION);

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
      setName(names[index]);
      setIsFinal(true);
      setIsLoading(false);
      clearInterval(autoCounterInterval);
      setAutoCounter(COUNTDOWN_DURATION);

      const newNames = [...names];
      newNames.splice(index, 1);
      setNames(newNames);
    }, COUNTDOWN_DURATION * 1000);
  }, [names]);

  useEventListener("visibilitychange" as keyof WindowEventMap, () => {
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
    randomizeName,
  };
}
