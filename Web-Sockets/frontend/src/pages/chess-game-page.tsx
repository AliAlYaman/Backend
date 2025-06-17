import { useEffect } from 'react';
import socket from '../lib/socket';

interface Move {
  from: string;
  to: string;
  promotion?: string;
}

interface GameProps {
  roomId: string;
}

export default function Game({ roomId }: GameProps) {
  useEffect(() => {
    socket.emit('joinGame', roomId);

    socket.on('opponentMove', (move: Move) => {
      console.log('Opponent move:', move);
      // Update your game state here (e.g., using chess.js)
    });

    return () => {
      socket.off('opponentMove');
    };
  }, [roomId]);

  const handleMove = (move: Move) => {
    socket.emit('makeMove', { roomId, move });
    // Update your local game state
  };

  return (
    <div>
      {/* Hook up your chessboard here */}
      <h2>Room: {roomId}</h2>
      <button onClick={() => handleMove({ from: 'e2', to: 'e4' })}>
        Test Move e2 → e4
      </button>
    </div>
  );
}
