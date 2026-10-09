import { useState } from 'react'
import './App.css'

function Square({value, onclick}){
  return (
  <button
  onClick={onclick}
  className="h-20 w-20 rounded-xl bg-white text-4xl
                 font-bold shadow transition
                 hover:-translate-y-1 hover:shadow-xl"
  >
{value}
  </button>
  )
}

function Scoreboard({ scores, xIsNext }) {
  return (
    <div className="flex gap-4">
      {["○", "×"].map((player) => {
     const isTurn = player === (xIsNext ? "○" : "×"); 
     return(
        <div key={player}
             className={`w-32 rounded-2xl bg-white p-4
                        text-center shadow-lg ${isTurn ? "ring-4 ring-orange-400" : ""}`}>
          <p className="text-sm text-gray-500">{player}</p>
          <p className="text-3xl font-bold">{scores[player]}</p>
        </div>
     )
      })}{/*元々は ->))} → })} に変更*/}
    </div>
  );
}

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];
 
function calculateWinner(squares) {
  for (const [a, b, c] of LINES) {
    if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]) return squares[a];
  }
  return null;
}


export default function App() {
const [squares, setSquares] = useState(Array(9).fill(null))
const [xIsNext, setXIsNext] = useState(true);
const [scores , setScores] = useState({"○":0, "×":0})

const winner = calculateWinner(squares)
const isDraw = !winner && squares.every((v) => v !== null)
const status = winner
    ? `${winner} の勝ち！`
    : isDraw
    ? "引き分け"
    : `つぎは ${xIsNext ? "○" : "×"} の番`

  function handleClick(i) {
    if (squares[i] || winner) return;
    const next = [...squares];
    next[i] = xIsNext ? "○" : "×";
    setSquares(next);
    setXIsNext(!xIsNext);

    const w = calculateWinner(next);
    if (w) setScores((s) => ({...s, [w]: s[w] + 1}))
  }

  function reset(){
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
   
      <div className="flex min-h-screen flex-col items-center
                    justify-center gap-6 bg-orange-50">
      <h1 className="text-3xl font-bold text-gray-800">
        ○×ゲーム
      </h1>

    <Scoreboard scores={scores} xIsNext={xIsNext}/>
    <p className='text-xl font-bold'>{status}</p>
    <div className='grid grid-cols-3 gap-2 roudnded-2xl
    bg-orange-200 p-3 shadow-inner ' >
      {squares.map((value, i) => (
        <Square
        key={i}
        value={value}
        onclick={() => handleClick(i)}
        />
  ))}
    </div>
    <button
    onClick={reset}
    className='rounded-full bg-orange-500 px-6 py-2
                   text-white'
    >
      もう一度あそぶ
    </button>
    </div>
   
  )
}


