import React, { useState } from 'react'

// eslint-disable-next-line react/prop-types
function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick} >{value}</button>
}

function CalculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
}

export default function Board() {
  // eslint-disable-next-line no-unused-vars
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = CalculateWinner(squares)
  let status;
  if (winner) {
    status = 'Winner: ' + winner
  }
  else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  function handleClick(i) {
    if (squares[i] || CalculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[i] = 'X'
    }
    else {
      nextSquares[i] = 'O'
    }

    setSquares(nextSquares)
    setXIsNext(!xIsNext)
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={[squares[1]]} onSquareClick={() => handleClick(1)} />
        <Square value={[squares[2]]} onSquareClick={() => handleClick(2)} />
        <Square value={[squares[3]]} onSquareClick={() => handleClick(3)} />
      </div>
      <div className="board-row">
        <Square value={[squares[4]]} onSquareClick={() => handleClick(4)} />
        <Square value={[squares[5]]} onSquareClick={() => handleClick(5)} />
        <Square value={[squares[6]]} onSquareClick={() => handleClick(6)} />
      </div>
      <div className="board-row">
        <Square value={[squares[7]]} onSquareClick={() => handleClick(7)} />
        <Square value={[squares[8]]} onSquareClick={() => handleClick(8)} />
        <Square value={[squares[9]]} onSquareClick={() => handleClick(9)} />
      </div>
    </>
  )
}
