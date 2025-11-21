import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Users } from 'lucide-react';

interface Team {
  name: string;
  players: any[];
}

interface ScoreBoardProps {
  teams: Team[];
  gameBoard: { team1Position: number; team2Position: number };
  currentTeam: number;
  winningPosition: number;
}

const ScoreBoard = ({ teams, gameBoard, currentTeam, winningPosition }: ScoreBoardProps) => {
  // Create visual board with 38 squares
  const createBoardSquares = () => {
    const squares = [];
    for (let i = 0; i < winningPosition; i++) {
      const isTeam1Position = gameBoard.team1Position === i + 1;
      const isTeam2Position = gameBoard.team2Position === i + 1;
      const isFinishLine = i === winningPosition - 1;
      
      squares.push(
        <div
          key={i}
          className={`
            w-8 h-8 border-2 border-gray-300 flex items-center justify-center text-xs font-bold
            ${isFinishLine ? 'bg-yellow-400 border-yellow-600' : 'bg-white'}
            ${isTeam1Position ? 'ring-2 ring-blue-500 bg-blue-100' : ''}
            ${isTeam2Position ? 'ring-2 ring-green-500 bg-green-100' : ''}
            ${isTeam1Position && isTeam2Position ? 'bg-purple-100 ring-purple-500' : ''}
          `}
        >
          {isFinishLine ? (
            <Trophy className="w-4 h-4 text-yellow-700" />
          ) : (
            i + 1
          )}
          {isTeam1Position && (
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
          )}
          {isTeam2Position && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-white"></div>
          )}
        </div>
      );
    }
    return squares;
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Trophy className="w-5 h-5" />
          Oyun Tahtası - 38 Kare Yarışı
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Team Legend */}
        <div className="flex justify-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm font-medium">{teams[0]?.name || 'Takım 1'}</span>
            <Badge variant={currentTeam === 1 ? 'default' : 'secondary'}>
              {gameBoard.team1Position}/38
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium">{teams[1]?.name || 'Takım 2'}</span>
            <Badge variant={currentTeam === 2 ? 'default' : 'secondary'}>
              {gameBoard.team2Position}/38
            </Badge>
          </div>
        </div>

        {/* Game Board - Mobile Responsive Grid */}
        <div className="relative">
          {/* Desktop/Tablet View */}
          <div className="hidden md:block">
            <div className="grid grid-cols-19 gap-1 mb-4">
              {createBoardSquares().slice(0, 19)}
            </div>
            <div className="grid grid-cols-19 gap-1" style={{ direction: 'rtl' }}>
              {createBoardSquares().slice(19, 38)}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            <div className="grid grid-cols-10 gap-1 mb-2">
              {createBoardSquares().slice(0, 10)}
            </div>
            <div className="grid grid-cols-10 gap-1 mb-2" style={{ direction: 'rtl' }}>
              {createBoardSquares().slice(10, 20)}
            </div>
            <div className="grid grid-cols-9 gap-1 mb-2">
              {createBoardSquares().slice(20, 29)}
            </div>
            <div className="grid grid-cols-9 gap-1" style={{ direction: 'rtl' }}>
              {createBoardSquares().slice(29, 38)}
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="mt-6 space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-blue-600">
                {teams[0]?.name || 'Takım 1'}
              </span>
              <span className="text-sm text-gray-500">
                {gameBoard.team1Position}/{winningPosition}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(gameBoard.team1Position / winningPosition) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-green-600">
                {teams[1]?.name || 'Takım 2'}
              </span>
              <span className="text-sm text-gray-500">
                {gameBoard.team2Position}/{winningPosition}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(gameBoard.team2Position / winningPosition) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current Turn Indicator */}
        <div className="mt-4 text-center">
          <Badge variant="outline" className="text-sm">
            Sıra: {currentTeam === 1 ? teams[0]?.name || 'Takım 1' : teams[1]?.name || 'Takım 2'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScoreBoard;