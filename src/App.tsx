import { useContext, useState } from "react"
import { board } from "./constant"
import { WordContext } from "./context/wordContext"
import { Toaster, toast } from "sonner"
import Keyboard from "./components/Keyboard"
import Board from "./components/Board"
import confetti from "canvas-confetti";

function App() {
  //Estado Inicial del board
  const [boardState, setBoardState] =
    useState<{ status: string, value: string }[][]>(board)
  //Numero del intento = fila del board
  const [attempts, setAttempts] = useState<number>(0)
  //Posicion de la primera letra
  const [letterAttempt, setLetterAttempt] = useState<number>(0)
  //Array de string para comparar las posiciones de las letra con la palabra a acertar
  const [answer, setAnswer] = useState<string[]>([])
  //Palabra que debera acertar el jugador
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
    const newBoardState = boardState

    if (attempts === board.length - 1) {
      toast.error(`Has fallado, la palabra era: ${randomWord}`)
      return
    }

    if (answer.length !== 5) {
      toast.error("Introduce una palabra de 5 letras!")
      return
    } else {
      for (let i = 0; i < answer.length; ++i) {
        if (randomWord.includes(answer[i]) && !(randomWord[i] === answer[i])) {
          newBoardState[attempts][i].status = "finded"
        } else if (randomWord[i] === answer[i]) {
          newBoardState[attempts][i].status = "correct"
        } else {
          newBoardState[attempts][i].status = "incorrect"
        }
      }

      const notEqual = answer.join("") !== randomWord

      if (notEqual && attempts < board.length - 1) {
        setLetterAttempt(0)
        setAttempts((prevAttempts) => prevAttempts + 1)
      } else {
        toast.success(`Enhorabuena! ${randomWord} era la palabra correcta!`)
        return confetti()
      }
    }

    setBoardState(newBoardState)
    setAnswer([])
  }

  const handleDelete = () => {
    if (answer.length === 0) {
      toast.error("No hay nada para borrar!")
      return
    }

    const newBoardState = [...boardState]

    // Borra la última letra
    newBoardState[attempts][letterAttempt - 1].value = ""

    // Elimina la última letra ingresada de answer
    const updatedAnswer = [...answer]
    updatedAnswer.pop()

    setBoardState(newBoardState)
    setAnswer(updatedAnswer)

    // Decrementa letterAttempt para apuntar a la posición vacía donde se borró la letra
    setLetterAttempt((prevLetterAttempt) => prevLetterAttempt - 1)
  }

  const handleRestart = () => {
    const initialBoard = board.map((row) =>
      row.map((cell) => ({ ...cell, status: "", value: "" }))
    )
    setBoardState(initialBoard) // Restaura el tablero con celdas vacías
    
    setAttempts(0) // Reiniciar el número de intentos
    setLetterAttempt(0) // Reiniciar la posición de la primera letra
    setAnswer([])// Reiniciar la respuesta del jugador
    
    getRandomWord() // Obtener una nueva palabra
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
