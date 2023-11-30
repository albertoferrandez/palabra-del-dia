import { useContext, useState } from "react"
import { Toaster, toast } from "sonner"
import confetti from "canvas-confetti";

import { board } from "./constant"
import { WordContext } from "./context/wordContext"

import Keyboard from "./components/Keyboard"
import Board from "./components/Board"

function App() {

  const [boardState, setBoardState] = useState<{ status: string, value: string }[][]>(board)

  const [attempts, setAttempts] = useState<number>(0)

  const [letterAttempt, setLetterAttempt] = useState<number>(0)

  const [answer, setAnswer] = useState<string[]>([])

  const { randomWord, getRandomWord } = useContext(WordContext);

  const handleAnswer = (letter: string) => {
    const newBoard = [...boardState]
    const valueCell = newBoard[attempts][letterAttempt].value

    if (valueCell === "" && answer.length < 5) {
      answer.push(letter)
      newBoard[attempts][letterAttempt].value = letter
      setLetterAttempt((prevLetterAttempt) => prevLetterAttempt + 1)
    }

    setBoardState(newBoard)
  }

  const handleCorrect = () => {
    const newBoardState = [...boardState];

    if (answer.length !== 5) {
      toast.error("Introduce una palabra de 5 letras!");
      return;
    }

    for (let i = 0; i < answer.length; ++i) {
      if (randomWord.includes(answer[i]) && !(randomWord[i] === answer[i])) {
        newBoardState[attempts][i].status = "finded";
      } else if (randomWord[i] === answer[i]) {
        newBoardState[attempts][i].status = "correct";
      } else {
        newBoardState[attempts][i].status = "incorrect";
      }
    }

    const notEqual = answer.join("") !== randomWord;

    if (notEqual && attempts < board.length - 1) {
      setLetterAttempt(0);
      setAttempts((prevAttempts) => prevAttempts + 1);
    } else if (!notEqual) {
      toast.success(`¡Enhorabuena! ${randomWord} era la palabra correcta!`);
      return confetti();
    } else {
      toast.error(`¡Has fallado, la palabra era: ${randomWord}`);
      return;
    }

    setBoardState(newBoardState);
    setAnswer([]);
  };


  const handleDelete = () => {
    if (answer.length === 0) {
      toast.error("No hay nada para borrar!")
      return
    }

    const newBoardState = [...boardState]
    newBoardState[attempts][letterAttempt - 1].value = ""

    const updatedAnswer = [...answer]
    updatedAnswer.pop()

    setBoardState(newBoardState)
    setAnswer(updatedAnswer)

    setLetterAttempt((prevLetterAttempt) => prevLetterAttempt - 1)
  }

  const handleRestart = () => {
    const initialBoard = board.map((row) =>
      row.map((cell) => ({ ...cell, status: "", value: "" }))
    )
    setBoardState(initialBoard)
    
    setAttempts(0)
    setLetterAttempt(0) 
    setAnswer([])
    
    getRandomWord()
  }

  return (
    <main>
      <h1>LA PALABRA DEL DIA</h1>
      <Toaster position="top-center" richColors />

      <Board boardState={boardState} />

      <Keyboard
        handleAnswer={handleAnswer}
        handleDelete={handleDelete}
        handleCorrect={handleCorrect}
      />

     <button onClick={handleRestart}>Reiniciar Juego</button>
    </main>
  )
}

export default App
