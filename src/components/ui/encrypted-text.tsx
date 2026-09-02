import { useEffect, useState } from "react";
import { cn } from "../../utils/cn";

export const EncryptedText = ({
  text,
  className,
  revealDelayMs = 40,
  flipDelayMs = 40,
  charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=",
  encryptedClassName,
  revealedClassName,
}: {
  text: string;
  className?: string;
  revealDelayMs?: number;
  flipDelayMs?: number;
  charset?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
}) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let currentRevealed = 0;
    const interval = setInterval(() => {
      currentRevealed += 1;
      setRevealedCount(currentRevealed);
      if (currentRevealed >= text.length) {
        clearInterval(interval);
      }
    }, revealDelayMs);

    return () => clearInterval(interval);
  }, [text, revealDelayMs]);

  useEffect(() => {
    if (revealedCount >= text.length) {
      setDisplayText(text);
      return;
    }

    const scrambleInterval = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (index < revealedCount) {
            return char;
          }
          if (char === " ") return " ";
          return charset[Math.floor(Math.random() * charset.length)];
        })
        .join("");

      setDisplayText(scrambled);
    }, flipDelayMs);

    return () => clearInterval(scrambleInterval);
  }, [revealedCount, text, charset, flipDelayMs]);

  return (
    <span className={cn("font-mono inline-block tracking-wider", className)}>
      {displayText.split("").map((char, idx) => (
        <span
          key={idx}
          className={
            idx < revealedCount
              ? cn("text-inherit transition-colors", revealedClassName)
              : cn("text-[#E32124] opacity-80", encryptedClassName)
          }
        >
          {char}
        </span>
      ))}
    </span>
  );
};
