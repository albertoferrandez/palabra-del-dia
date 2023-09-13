interface Props {
  boardState: {
    status: string;
    value: string;
  }[][];
}
export default function Board ({ boardState }: Props) {
    return (
      <div className="board">
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className="fila">
            {row.map((cell, colIndex) => (
              <span key={colIndex} className={`${cell.status}`}>
                {cell.value}
              </span>
            ))}
          </div>
        ))}
      </div>
    );
}