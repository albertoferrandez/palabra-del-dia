import { createContext, useState, useEffect, ReactNode } from "react";
import { words } from "../data/words";

interface WordContextType {
  randomWord: string;
  getRandomWord: () => void
}

export const WordContext = createContext<WordContextType>({
  randomWord: "",
  getRandomWord: function (): void {}
});

export function WordProvider({ children }: { children: ReactNode }) {
  const [randomWord, setRandomWord] = useState("");

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setRandomWord(randomWord.toUpperCase());
  }

  useEffect(() => {
    getRandomWord()
  }, []);

  return (
    <WordContext.Provider value={{ randomWord, getRandomWord }}>
      {children}
    </WordContext.Provider>
  )
}
