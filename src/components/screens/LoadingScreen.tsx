interface LoadingScreenProps {
  autoCounter: number;
}

export function LoadingScreen({ autoCounter }: LoadingScreenProps) {
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

      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full z-10">
        <div className="relative flex items-center justify-center w-[400px] h-[400px]">
          <div
            className="absolute rounded-full overflow-hidden"
            style={{
              width: "245px",
              height: "245px",
              top: "48%",
              left: "50%",
              transform: "translate(-50%, -46%)",
            }}
          >
            <div
              className="w-full h-full animate-spin-slow-center"
              style={{
                background:
                  "conic-gradient(from 0deg, #00953b, #76bc21, #c1d116, #00953b)",
              }}
            />
          </div>
          <img
            src="stopwatch.png"
            alt="Stopwatch"
            className="absolute w-[400px] h-[400px] object-contain z-10"
          />
          <span
            className="absolute font-bold text-[180px] text-white z-20"
            style={{
              fontFamily: "Lato",
              textShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              marginTop: "-10px",
            }}
          >
            {autoCounter}
          </span>
        </div>
      </div>
    </main>
  );
}
