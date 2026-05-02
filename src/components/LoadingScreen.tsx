import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [phase, setPhase] = useState<"writing" | "fading" | "gone">("writing");

  useEffect(() => {
    // writing 2.5s + hold 0.6s = 3.1s, then fade 0.8s
    const fadeTimer = setTimeout(() => setPhase("fading"), 3100);
    const removeTimer = setTimeout(() => setPhase("gone"), 3100 + 800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#0D1B2A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "fading" ? 0 : 1,
        transition: "opacity 0.8s ease-out",
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      {/* Ambient amber glow */}
      <div
        style={{
          position: "absolute",
          width: "60vmin",
          height: "60vmin",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,160,23,0.12) 0%, rgba(212,160,23,0.06) 40%, transparent 70%)",
          filter: "blur(40px)",
          animation: "darley-glow 3s ease-in-out infinite",
        }}
      />

      <svg
        viewBox="0 0 600 200"
        style={{
          width: "min(80vw, 640px)",
          height: "auto",
          position: "relative",
          overflow: "visible",
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Handwritten cursive "Darley" path */}
        <path
          d="M 60 140
             C 60 80, 90 50, 130 50
             C 170 50, 180 95, 165 130
             C 152 160, 110 165, 90 145
             C 80 135, 80 120, 95 115
             L 145 100
             M 175 145
             C 175 115, 195 95, 220 100
             C 240 104, 245 125, 240 145
             C 235 160, 215 165, 205 155
             C 200 150, 200 138, 210 132
             L 245 118
             C 248 130, 250 145, 258 152
             M 275 60
             C 275 95, 275 130, 282 152
             C 285 160, 295 160, 300 152
             M 320 145
             C 320 115, 340 95, 365 100
             C 385 104, 392 122, 380 138
             C 370 150, 345 152, 330 142
             C 360 142, 388 132, 395 152
             M 415 60
             C 415 100, 412 135, 420 152
             C 425 160, 433 158, 438 150
             M 460 140
             C 460 115, 478 95, 500 102
             C 518 108, 522 128, 510 142
             C 500 152, 478 152, 465 142
             C 492 142, 518 132, 525 150
             C 520 175, 500 188, 478 185"
          stroke="url(#darley-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 1600,
            strokeDashoffset: 1600,
            animation: "darley-draw 2.5s cubic-bezier(0.65, 0, 0.35, 1) forwards",
          }}
        />
        <defs>
          <linearGradient id="darley-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B8860B">
              <animate
                attributeName="stop-color"
                values="#B8860B; #B8860B; #F5F0E8"
                keyTimes="0; 0.7; 1"
                dur="2.5s"
                fill="freeze"
              />
            </stop>
            <stop offset="100%" stopColor="#B8860B">
              <animate
                attributeName="stop-color"
                values="#B8860B; #B8860B; #F5F0E8"
                keyTimes="0; 0.7; 1"
                dur="2.5s"
                fill="freeze"
              />
            </stop>
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @keyframes darley-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes darley-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
