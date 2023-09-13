import { keyboard } from "../constant";

interface Props {
  handleCorrect: () => void;
  handleDelete: () => void;
  handleAnswer: (letra: string) => void;
}

export default function Keyboard({
  handleCorrect,
  handleDelete,
  handleAnswer,
}: Props) {
  return (
    <div className="keyboard">
      {keyboard.map((keys, rowIndex) => (
        <div key={rowIndex}>
          {keys.map((key, keyIndex) => (
            <button key={keyIndex} onClick={() => handleAnswer(key)}>
              {key}
            </button>
          ))}
        </div>
      ))}

      <div className="action-buttons">
        <button onClick={handleCorrect}>Enviar</button>
        <button onClick={handleDelete}>Borrar</button>
      </div>
    </div>
  );
}
