import "./index.css";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { useRaffle } from "@/hooks/use-raffle";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WinnerScreen } from "@/components/screens/WinnerScreen";
import { LoadingScreen } from "@/components/screens/LoadingScreen";
import { EditorScreen } from "@/components/screens/EditorScreen";

export default function App() {
  const raffle = useRaffle();
  const isWinnerScreen = raffle.name && raffle.isFinal && !raffle.isLoading;

  return (
    <>
      {raffle.isFinal && !raffle.cancelAnimation && (
        <Fireworks autorun={{ speed: 3 }} />
      )}

      <Header showSipatmaLogo={raffle.isFinal || raffle.isLoading} />

      {isWinnerScreen && raffle.name ? (
        <WinnerScreen
          name={raffle.name}
          names={raffle.names}
          randomizeName={raffle.randomizeName}
          prizesRemaining={raffle.prizesRemaining}
          winners={raffle.winners}
          onReset={raffle.resetRaffle}
        />
      ) : (
        <>
          {raffle.isLoading && (
            <LoadingScreen autoCounter={raffle.autoCounter} />
          )}
          {raffle.showEditor && !raffle.isLoading && (
            <EditorScreen
              names={raffle.names}
              setNames={raffle.setNames}
              randomizeName={raffle.randomizeName}
              fileName={raffle.fileName}
              setFileName={raffle.setFileName}
              totalPrizes={raffle.totalPrizes}
              setTotalPrizes={raffle.setTotalPrizes}
              setPrizesRemaining={raffle.setPrizesRemaining}
            />
          )}
        </>
      )}

      <Footer variant={isWinnerScreen ? "winner" : "default"} />
    </>
  );
}
