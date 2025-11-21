import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, School, User, Trophy } from 'lucide-react';

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

interface PlayerRegistrationProps {
  onComplete: (teams: Team[]) => void;
}

const PlayerRegistration = ({ onComplete }: PlayerRegistrationProps) => {
  const [currentStep, setCurrentStep] = useState<'teams' | 'team1' | 'team2'>('teams');
  const [teams, setTeams] = useState<Team[]>([
    { name: '', players: [] },
    { name: '', players: [] }
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    name: '',
    surname: '',
    class: '',
    school: ''
  });

  const updateTeamName = (teamIndex: number, name: string) => {
    const newTeams = [...teams];
    newTeams[teamIndex].name = name;
    setTeams(newTeams);
  };

  const addPlayer = (teamIndex: number) => {
    if (!currentPlayer.name || !currentPlayer.surname) return;
    
    const newTeams = [...teams];
    newTeams[teamIndex].players.push({ ...currentPlayer });
    setTeams(newTeams);
    
    setCurrentPlayer({ name: '', surname: '', class: '', school: '' });
  };

  const removePlayer = (teamIndex: number, playerIndex: number) => {
    const newTeams = [...teams];
    newTeams[teamIndex].players.splice(playerIndex, 1);
    setTeams(newTeams);
  };

  const canProceed = () => {
    return teams[0].name && teams[1].name && 
           teams[0].players.length > 0 && teams[1].players.length > 0;
  };

  const handleComplete = () => {
    if (canProceed()) {
      onComplete(teams);
    }
  };

  if (currentStep === 'teams') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Takım Kayıt Sistemi
            </h1>
            <p className="text-gray-600">
              Oyuna başlamadan önce takımlarınızı oluşturun
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Takım İsimleri
              </CardTitle>
              <CardDescription>
                Her takım için bir isim belirleyin
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="team1">1. Takım İsmi</Label>
                <Input
                  id="team1"
                  placeholder="Örn: Fizik Kahramanları"
                  value={teams[0].name}
                  onChange={(e) => updateTeamName(0, e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="team2">2. Takım İsmi</Label>
                <Input
                  id="team2"
                  placeholder="Örn: Enerji Savaşçıları"
                  value={teams[1].name}
                  onChange={(e) => updateTeamName(1, e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Button 
              onClick={() => setCurrentStep('team1')}
              disabled={!teams[0].name}
              className="h-20"
            >
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-1" />
                <div>{teams[0].name || '1. Takım'}</div>
                <div className="text-sm opacity-75">
                  {teams[0].players.length} oyuncu
                </div>
              </div>
            </Button>
            <Button 
              onClick={() => setCurrentStep('team2')}
              disabled={!teams[1].name}
              variant="outline"
              className="h-20"
            >
              <div className="text-center">
                <Users className="w-6 h-6 mx-auto mb-1" />
                <div>{teams[1].name || '2. Takım'}</div>
                <div className="text-sm opacity-75">
                  {teams[1].players.length} oyuncu
                </div>
              </div>
            </Button>
          </div>

          <Button 
            onClick={handleComplete}
            disabled={!canProceed()}
            className="w-full"
            size="lg"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Oyuna Başla
          </Button>

          {!canProceed() && (
            <p className="text-center text-sm text-gray-500 mt-4">
              Her takımda en az 1 oyuncu olmalıdır
            </p>
          )}
          
          {/* Project Footer */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="py-4">
              <div className="text-center space-y-2">
                <div className="text-sm font-bold text-blue-800">
                  2204-A Lise Öğrencileri Araştırma Projeleri Yarışması
                </div>
                <div className="text-lg font-bold text-indigo-700">
                  "Eğlenerek Fiziği Tekrar Ediyorum"
                </div>
                <div className="text-xs text-gray-700">
                  <p>Cumhuriyet Anadolu Lisesi 9. sınıf Öğrencileri ile</p>
                  <p>Fizik Öğretmenleri Kerim ÖZKAN ve Ertuğrul AYDIN tarafından tasarlanmıştır</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentTeamIndex = currentStep === 'team1' ? 0 : 1;
  const currentTeam = teams[currentTeamIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={() => setCurrentStep('teams')} 
            variant="ghost"
          >
            ← Geri
          </Button>
          <Badge variant="secondary">
            {currentTeam.name}
          </Badge>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Oyuncu Ekle
            </CardTitle>
            <CardDescription>
              {currentTeam.name} takımına oyuncu ekleyin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Ad *</Label>
                <Input
                  id="name"
                  placeholder="Adınız"
                  value={currentPlayer.name}
                  onChange={(e) => setCurrentPlayer(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="surname">Soyad *</Label>
                <Input
                  id="surname"
                  placeholder="Soyadınız"
                  value={currentPlayer.surname}
                  onChange={(e) => setCurrentPlayer(prev => ({ ...prev, surname: e.target.value }))}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class">Sınıf</Label>
                <Input
                  id="class"
                  placeholder="Örn: 9-A"
                  value={currentPlayer.class}
                  onChange={(e) => setCurrentPlayer(prev => ({ ...prev, class: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="school">Okul</Label>
                <Input
                  id="school"
                  placeholder="Okul adınız"
                  value={currentPlayer.school}
                  onChange={(e) => setCurrentPlayer(prev => ({ ...prev, school: e.target.value }))}
                />
              </div>
            </div>
            <Button 
              onClick={() => addPlayer(currentTeamIndex)}
              disabled={!currentPlayer.name || !currentPlayer.surname}
              className="w-full"
            >
              Oyuncu Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Current Team Players */}
        {currentTeam.players.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {currentTeam.name} Oyuncuları ({currentTeam.players.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentTeam.players.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-semibold">
                        {player.name} {player.surname}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-4">
                        {player.class && (
                          <span className="flex items-center gap-1">
                            <School className="w-3 h-3" />
                            {player.class}
                          </span>
                        )}
                        {player.school && (
                          <span className="text-xs">{player.school}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() => removePlayer(currentTeamIndex, index)}
                      variant="destructive"
                      size="sm"
                    >
                      Sil
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Button 
          onClick={() => setCurrentStep('teams')}
          variant="outline"
          className="w-full"
        >
          Takım Kaydını Tamamla
        </Button>
        
        {/* Project Footer */}
        <div className="mt-6 text-center text-xs text-gray-500 bg-white/50 rounded-lg p-3">
          <div className="font-semibold text-blue-700">"Eğlenerek Fiziği Tekrar Ediyorum"</div>
          <div className="mt-1">Cumhuriyet Anadolu Lisesi - Kerim ÖZKAN & Ertuğrul AYDIN</div>
        </div>
      </div>
    </div>
  );
};

export default PlayerRegistration;