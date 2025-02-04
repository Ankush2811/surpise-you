import React, { useState, useEffect } from "react";
import { Heart, Stars, Sparkles } from "lucide-react";

const App = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const getNoButtonText = () => phrases[Math.min(noCount, phrases.length - 1)];

  const baseSize = windowSize.width < 640 ? 14 : 16;
  const growthFactor = windowSize.width < 640 ? 10 : 20;
  const yesButtonSize = noCount * growthFactor + baseSize;

  const generateAnimations = () => {
    const elements = [];
    const count = 10;
    for (let i = 0; i < count; i++) {
      elements.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: yesPressed ? `${Math.random() * 100}%` : "50%",
            transform: `scale(${0.5 + Math.random() * 0.5}) rotate(${
              Math.random() * 360
            }deg)`,
            animation: `float ${3 + Math.random() * 4}s infinite, spin ${
              3 + Math.random() * 4
            }s infinite`,
            zIndex: 10,
            opacity: yesPressed ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {Math.random() > 0.5 ? (
            <Heart fill="currentColor" size={24} />
          ) : (
            <Stars fill="currentColor" size={24} />
          )}
        </div>
      );
    }
    return elements;
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffe4e6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {generateAnimations()}

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "16px",
          textAlign: "center",
          position: "relative",
          transform: yesPressed ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.5s ease-in-out",
        }}
      >
        {!yesPressed ? (
          <>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#db2777",
                marginBottom: "16px",
              }}
            >
              Will you be my Valentine? ❤️
            </h1>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              <button
                style={{
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "#db2777",
                  transition: "transform 0.2s ease-in-out",
                  fontSize: `${yesButtonSize}px`,
                }}
                onClick={() => setYesPressed(true)}
              >
                Yes! 🥰
              </button>

              <button
                style={{
                  padding: "12px 24px",
                  borderRadius: "9999px",
                  fontWeight: "bold",
                  color: "#db2777",
                  border: "2px solid #db2777",
                  backgroundColor: "transparent",
                  fontSize: "14px",
                }}
                onClick={() => setNoCount(noCount + 1)}
              >
                {getNoButtonText()}
              </button>
            </div>
          </>
        ) : (
          <div style={{ animation: "jump 1s infinite alternate ease-in-out" }}>
            <Stars
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "blue",
                animation: "spin 2s infinite",
              }}
              size={24}
            />
            <Sparkles
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                color: "pink",
                animation: "pulse 2s infinite",
              }}
              size={24}
            />
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "red",
                marginBottom: "8px",
              }}
            >
              Yaaay! 🎉
            </h2>
            <p style={{ fontSize: "18px", color: "#4b5563" }}>
              I knew you'd say yes! 💖
            </p>
            <Heart
              style={{
                color: "red",
                marginTop: "12px",
                animation: "bounce 1s infinite",
              }}
              fill="currentColor"
              size={48}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
