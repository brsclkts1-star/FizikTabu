import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw, Users, Timer, Trophy, CheckCircle, XCircle, SkipForward, Eraser } from 'lucide-react';
import { gameData } from '@/data/gameData';
import ScoreBoard from '@/components/ScoreBoard';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  scientist: string;
  cardCount: number;
}

interface Player {
  name: string;
  surname: string;
  class: string;
  school: string;
}

interface Team {
  name: string;
  players: Player[];
}

interface GameScreenProps {
  category: Category;
  categories: Category[];
  teams: Team[];
  onBack: () => void;
  onResetTeams: () => void;
  onChangeCategory: (categoryId: string) => void;
}

const GameScreen = ({ category, categories, teams, onBack, onResetTeams, onChangeCategory }: GameScreenProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(1);
  const [gamePhase, setGamePhase] = useState<'setup' | 'playing' | 'paused' | 'finished'>('setup');
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Global game state - persists across all categories
  const [globalGameBoard, setGlobalGameBoard] = useState(() => {
    const saved = localStorage.getItem('physicsGameBoard');
    return saved ? JSON.parse(saved) : { team1Position: 0, team2Position: 0 };
  });
  
  const [categoryScores, setCategoryScores] = useState(() => {
    const saved = localStorage.getItem('physicsGameScores');
    return saved ? JSON.parse(saved) : {
      symbols: { team1: 0, team2: 0 },
      drawing: { team1: 0, team2: 0 },
      questions: { team1: 0, team2: 0 },
      taboo: { team1: 0, team2: 0 }
    };
  });
  
  const WINNING_POSITION = 38; // 38 squares to win across ALL categories
  
  // Reset card index when category changes
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsPlaying(false);
    setGamePhase('setup');
    setTimeLeft(category.id === 'drawing' ? 120 : category.id === 'symbols' ? 30 : 60);
    if (category.id === 'drawing') {
      clearCanvas();
    }
  }, [category.id]);
  
  // Save game state to localStorage
  useEffect(() => {
    localStorage.setItem('physicsGameBoard', JSON.stringify(globalGameBoard));
    localStorage.setItem('physicsGameScores', JSON.stringify(categoryScores));
  }, [globalGameBoard, categoryScores]);
  
  // Canvas refs for drawing
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);

  const cards = gameData[category.id] || [];
  const currentCard = cards[currentCardIndex];
  
  // Get current category scores
  const currentCategoryScore = categoryScores[category.id as keyof typeof categoryScores];

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0 && gamePhase === 'playing') {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsPlaying(false);
            setGamePhase('paused');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, gamePhase]);

  // Canvas drawing functions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || category.id !== 'drawing') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Set drawing style
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      if (gamePhase !== 'playing') return;
      isDrawingRef.current = true;
      const rect = canvas.getBoundingClientRect();
      const x = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - rect.left;
      const y = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) - rect.top;
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current || gamePhase !== 'playing') return;
      const rect = canvas.getBoundingClientRect();
      const x = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - rect.left;
      const y = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) - rect.top;
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
    };

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      startDrawing(e);
    });
    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      draw(e);
    });
    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      stopDrawing();
    });

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [category.id, gamePhase]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const startTimer = () => {
    setGamePhase('playing');
    setIsPlaying(true);
    
    // Set timer based on category
    if (category.id === 'drawing') {
      setTimeLeft(120); // 2 minutes for drawing
    } else if (category.id === 'symbols') {
      setTimeLeft(30); // 30 seconds for symbols
    } else {
      setTimeLeft(60); // 1 minute for others
    }
  };

  const pauseTimer = () => {
    setIsPlaying(false);
    setGamePhase('paused');
  };

  const nextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    } else {
      setCurrentCardIndex(0);
    }
    // Don't reset timer automatically
    if (category.id === 'drawing') {
      clearCanvas();
    }
  };

  const skipCard = () => {
    nextCard();
  };

  const correctAnswer = () => {
    if (gamePhase !== 'playing') return;
    
    // Update category scores
    const newCategoryScores = { ...categoryScores };
    if (currentTeam === 1) {
      newCategoryScores[category.id as keyof typeof categoryScores].team1 += 1;
    } else {
      newCategoryScores[category.id as keyof typeof categoryScores].team2 += 1;
    }
    setCategoryScores(newCategoryScores);
    
    // Move forward on the GLOBAL board
    const newPosition = currentTeam === 1 
      ? globalGameBoard.team1Position + 1 
      : globalGameBoard.team2Position + 1;
    
    if (currentTeam === 1) {
      setGlobalGameBoard(prev => ({ ...prev, team1Position: newPosition }));
      
      if (newPosition >= WINNING_POSITION) {
        setGamePhase('finished');
        setIsPlaying(false);
        return;
      }
    } else {
      setGlobalGameBoard(prev => ({ ...prev, team2Position: newPosition }));
      
      if (newPosition >= WINNING_POSITION) {
        setGamePhase('finished');
        setIsPlaying(false);
        return;
      }
    }
    nextCard();
  };

  const wrongAnswer = () => {
    if (gamePhase !== 'playing') return;
    
    if (category.id === 'taboo') {
      // Update category scores
      const newCategoryScores = { ...categoryScores };
      if (currentTeam === 1) {
        newCategoryScores[category.id as keyof typeof categoryScores].team1 = Math.max(0, newCategoryScores[category.id as keyof typeof categoryScores].team1 - 1);
      } else {
        newCategoryScores[category.id as keyof typeof categoryScores].team2 = Math.max(0, newCategoryScores[category.id as keyof typeof categoryScores].team2 - 1);
      }
      setCategoryScores(newCategoryScores);
      
      // Taboo penalty: move back 1 square on GLOBAL board
      const newPosition = currentTeam === 1 
        ? Math.max(0, globalGameBoard.team1Position - 1)
        : Math.max(0, globalGameBoard.team2Position - 1);
      
      if (currentTeam === 1) {
        setGlobalGameBoard(prev => ({ ...prev, team1Position: newPosition }));
      } else {
        setGlobalGameBoard(prev => ({ ...prev, team2Position: newPosition }));
      }
    }
    nextCard();
  };

  const switchTeam = () => {
    setCurrentTeam(prev => prev === 1 ? 2 : 1);
    setIsPlaying(false);
    setGamePhase('setup');
    setTimeLeft(category.id === 'drawing' ? 120 : category.id === 'symbols' ? 30 : 60);
    if (category.id === 'drawing') {
      clearCanvas();
    }
  };

  const resetGame = () => {
    setCurrentCardIndex(0);
    setTimeLeft(category.id === 'drawing' ? 120 : category.id === 'symbols' ? 30 : 60);
    setIsPlaying(false);
    setGlobalGameBoard({ team1Position: 0, team2Position: 0 });
    setCategoryScores({
      symbols: { team1: 0, team2: 0 },
      drawing: { team1: 0, team2: 0 },
      questions: { team1: 0, team2: 0 },
      taboo: { team1: 0, team2: 0 }
    });
    setCurrentTeam(1);
    setGamePhase('setup');
    if (category.id === 'drawing') {
      clearCanvas();
    }
    // Clear localStorage
    localStorage.removeItem('physicsGameBoard');
    localStorage.removeItem('physicsGameScores');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMaxTime = () => {
    if (category.id === 'drawing') return 120;
    if (category.id === 'symbols') return 30;
    return 60;
  };

  const progress = ((getMaxTime() - timeLeft) / getMaxTime()) * 100;

  if (!currentCard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <Button onClick={onBack} variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ana Menüye Dön
          </Button>
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-lg text-gray-600">Bu kategori için henüz kart bulunmuyor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Game finished screen
  if (gamePhase === 'finished') {
    const winner = globalGameBoard.team1Position >= WINNING_POSITION ? teams[0] : teams[1];
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="mb-6">
            <CardContent className="py-8">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <h1 className="text-3xl font-bold mb-2">Oyun Bitti!</h1>
              <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                🎉 {winner.name} Kazandı! 🎉
              </h2>
              <div className="text-lg mb-6">
                <p>Final Skorları:</p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="font-semibold">{teams[0].name}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {globalGameBoard.team1Position}/{WINNING_POSITION}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="font-semibold">{teams[1].name}</div>
                    <div className="text-2xl font-bold text-green-600">
                      {globalGameBoard.team2Position}/{WINNING_POSITION}
                    </div>
                  </div>
                </div>
                
                {/* Category Breakdown */}
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Kategori Bazında Skorlar:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="font-medium">Kategori</div>
                    <div className="font-medium">Skorlar</div>
                    
                    <div>Semboller ve Birimler</div>
                    <div>{categoryScores.symbols.team1} - {categoryScores.symbols.team2}</div>
                    
                    <div>Çizerek Anlatma</div>
                    <div>{categoryScores.drawing.team1} - {categoryScores.drawing.team2}</div>
                    
                    <div>Kısa Cevaplı Sorular</div>
                    <div>{categoryScores.questions.team1} - {categoryScores.questions.team2}</div>
                    
                    <div>Yasaklı Kelimeler</div>
                    <div>{categoryScores.taboo.team1} - {categoryScores.taboo.team2}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Button onClick={resetGame} className="w-full">
                  Yeni Oyun Başlat
                </Button>
                <Button onClick={onResetTeams} variant="outline" className="w-full">
                  Yeni Takımlarla Oyna
                </Button>
                <Button onClick={onBack} variant="ghost" className="w-full">
                  Ana Menüye Dön
                </Button>
              </div>
              
              {/* Project Footer in Game End Screen */}
              <div className="mt-6 pt-4 border-t border-gray-200 text-center text-sm text-gray-600">
                <div className="font-semibold text-blue-700">2204-A Lise Öğrencileri Araştırma Projeleri Yarışması</div>
                <div className="font-medium text-indigo-600">"Eğlenerek Fiziği Tekrar Ediyorum"</div>
                <div className="text-xs mt-2">Cumhuriyet Anadolu Lisesi 9. sınıf Öğrencileri ile</div>
                <div className="text-xs">Fizik Öğretmenleri Kerim ÖZKAN ve Ertuğrul AYDIN tarafından tasarlanmıştır</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <Badge variant="secondary" className="text-sm">
            {category.scientist} Bölümü
          </Badge>
        </div>

        {/* Visual Score Board */}
        <ScoreBoard 
          teams={teams}
          gameBoard={globalGameBoard}
          currentTeam={currentTeam}
          winningPosition={WINNING_POSITION}
        />

        {/* Current Category Scores */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">{category.name} - Kategori Skorları</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-600">{teams[0]?.name || 'Takım 1'}</div>
                <div className="text-2xl font-bold">{currentCategoryScore?.team1 || 0}</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="font-semibold text-green-600">{teams[1]?.name || 'Takım 2'}</div>
                <div className="text-2xl font-bold">{currentCategoryScore?.team2 || 0}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timer */}
        <Card className="mb-6">
          <CardContent className="py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <span className="font-semibold">Süre</span>
                <Badge variant={gamePhase === 'playing' ? 'default' : 'secondary'}>
                  {gamePhase === 'setup' ? 'Hazır' : gamePhase === 'playing' ? 'Oynanıyor' : 'Duraklatıldı'}
                </Badge>
              </div>
              <div className="text-2xl font-bold">
                {formatTime(timeLeft)}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Game Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{category.name}</CardTitle>
              <Badge variant="outline">
                {currentCardIndex + 1} / {cards.length}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.id === 'symbols' && (
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">{currentCard.concept}</div>
                <p className="text-gray-600">Bu büyüklüğün {currentCard.type === 'symbol' ? 'sembolü' : 'birimi'} nedir?</p>
                {gamePhase === 'playing' && currentCard.answer && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">Cevap:</p>
                    <p className="font-semibold">{currentCard.answer}</p>
                  </div>
                )}
              </div>
            )}

            {category.id === 'drawing' && (
              <div className="text-center">
                <div className="text-2xl font-bold mb-4">{currentCard.concept}</div>
                <p className="text-gray-600 mb-4">Bu kavramı çizerek anlatın!</p>
                <div className="relative">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-64 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-crosshair touch-none"
                    style={{ touchAction: 'none' }}
                  />
                  {gamePhase === 'playing' && (
                    <Button
                      onClick={clearCanvas}
                      variant="outline"
                      size="sm"
                      className="absolute top-2 right-2"
                    >
                      <Eraser className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                {gamePhase !== 'playing' && (
                  <p className="text-sm text-gray-500 mt-2">
                    Çizim yapmak için önce süreyi başlatın
                  </p>
                )}
              </div>
            )}

            {category.id === 'questions' && (
              <div>
                <div className="text-lg font-semibold mb-3">{currentCard.question}</div>
                {gamePhase === 'playing' && currentCard.answer && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-600">Cevap:</p>
                    <p className="font-semibold">{currentCard.answer}</p>
                  </div>
                )}
              </div>
            )}

            {category.id === 'taboo' && (
              <div>
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold mb-2">{currentCard.concept}</div>
                  <p className="text-gray-600">Bu kavramı yasaklı kelimeleri kullanmadan anlatın!</p>
                </div>
                {currentCard.tabooWords && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 font-semibold mb-2">Yasaklı Kelimeler:</p>
                    <div className="flex flex-wrap gap-2">
                      {currentCard.tabooWords.map((word, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Game Controls */}
        <div className="space-y-4">
          {/* Timer Controls */}
          <div className="flex gap-3">
            {gamePhase === 'setup' ? (
              <Button onClick={startTimer} className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Süreyi Başlat
              </Button>
            ) : gamePhase === 'playing' ? (
              <Button onClick={pauseTimer} variant="outline" className="flex-1">
                <Pause className="w-4 h-4 mr-2" />
                Duraklat
              </Button>
            ) : (
              <Button onClick={startTimer} className="flex-1">
                <Play className="w-4 h-4 mr-2" />
                Devam Et
              </Button>
            )}
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Game Action Controls - Only show when playing */}
          {gamePhase === 'playing' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={correctAnswer} variant="default" className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Doğru
                </Button>
                <Button onClick={wrongAnswer} variant="destructive">
                  <XCircle className="w-4 h-4 mr-2" />
                  {category.id === 'taboo' ? 'Tabu!' : 'Yanlış'}
                </Button>
              </div>
              
              <Button onClick={skipCard} variant="outline" className="w-full">
                <SkipForward className="w-4 h-4 mr-2" />
                Soruyu Atla
              </Button>
            </>
          )}

          <Button onClick={switchTeam} variant="outline" className="w-full">
            Takım Değiştir (Şu an: {currentTeam === 1 ? teams[0]?.name || 'Takım 1' : teams[1]?.name || 'Takım 2'})
          </Button>
        </div>

        {/* Category Switcher */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-center text-sm">Diğer Kategorilere Geç</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isActive = cat.id === category.id;
                return (
                  <Button
                    key={cat.id}
                    onClick={() => onChangeCategory(cat.id)}
                    variant={isActive ? "default" : "outline"}
                    className={`h-auto p-3 ${isActive ? 'ring-2 ring-primary' : ''}`}
                    disabled={isActive}
                  >
                    <div className="text-center">
                      <div className={`p-2 rounded-full mx-auto mb-2 ${cat.color} text-white`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-medium">{cat.name}</div>
                      <div className="text-xs text-gray-500">{cat.scientist}</div>
                      {/* Show category scores */}
                      <div className="text-xs mt-1">
                        {(() => {
                          const catScore = categoryScores[cat.id as keyof typeof categoryScores];
                          return (
                            <>
                              <span className="text-blue-600">{catScore?.team1 || 0}</span>
                              {" - "}
                              <span className="text-green-600">{catScore?.team2 || 0}</span>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
            
            {/* Quick category scores overview */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-xs font-semibold mb-2 text-center">Kategori Skorları</div>
              <div className="grid grid-cols-4 gap-2 text-xs">
                {categories.map((cat) => {
                  const catScore = categoryScores[cat.id as keyof typeof categoryScores];
                  return (
                    <div key={cat.id} className="text-center">
                      <div className="font-medium truncate">{cat.scientist}</div>
                      <div className="text-blue-600">{catScore?.team1 || 0}</div>
                      <div className="text-green-600">{catScore?.team2 || 0}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 bg-white/50 rounded-lg p-3">
          <div className="font-semibold text-blue-700">"Eğlenerek Fiziği Tekrar Ediyorum"</div>
          <div className="mt-1">Cumhuriyet Anadolu Lisesi - Kerim ÖZKAN & Ertuğrul AYDIN</div>
        </div>
      </div>
    </div>
  );
};

export default GameScreen;