import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Users, Clock, Trophy, BookOpen, Zap, Palette, HelpCircle } from 'lucide-react';
import GameScreen from '@/components/GameScreen';
import PlayerRegistration from '@/components/PlayerRegistration';
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
const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'registration' | 'game'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const categories = [{
    id: 'symbols',
    name: 'Semboller ve Birimler',
    description: 'Fizik büyüklüklerinin sembolleri ve SI birimleri',
    icon: BookOpen,
    color: 'bg-gray-500',
    scientist: 'Newton',
    cardCount: 65
  }, {
    id: 'drawing',
    name: 'Çizerek Anlatma',
    description: 'Kavramları çizerek anlatma oyunu',
    icon: Palette,
    color: 'bg-purple-500',
    scientist: 'Nikola Tesla',
    cardCount: 44
  }, {
    id: 'questions',
    name: 'Kısa Cevaplı Sorular',
    description: 'Fizik ve Fen Bilimleri kısa cevaplı sorular',
    icon: HelpCircle,
    color: 'bg-yellow-500',
    scientist: 'Galileo',
    cardCount: 63
  }, {
    id: 'taboo',
    name: 'Yasaklı Kelimeler',
    description: 'Yasaklı kelimeleri kullanmadan anlatma',
    icon: Zap,
    color: 'bg-red-500',
    scientist: 'Curie',
    cardCount: 60
  }];
  const startGame = (categoryId: string) => {
    if (teams.length === 0) {
      setSelectedCategory(categoryId);
      setCurrentScreen('registration');
    } else {
      setSelectedCategory(categoryId);
      setCurrentScreen('game');
    }
  };
  const handleRegistrationComplete = (registeredTeams: Team[]) => {
    setTeams(registeredTeams);
    setCurrentScreen('game');
  };
  const goHome = () => {
    setCurrentScreen('home');
    setSelectedCategory(null);
  };
  const resetTeams = () => {
    setTeams([]);
    setCurrentScreen('home');
    setSelectedCategory(null);
  };
  if (currentScreen === 'registration') {
    return <PlayerRegistration onComplete={handleRegistrationComplete} />;
  }
  const changeCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };
  if (currentScreen === 'registration') {
    return <PlayerRegistration onComplete={handleRegistrationComplete} />;
  }
  if (currentScreen === 'game' && selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    return <GameScreen category={category!} categories={categories} teams={teams} onBack={goHome} onResetTeams={resetTeams} onChangeCategory={changeCategory} />;
  }
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Eğlenerek Fiziği Tekrar Ediyorum
          </h1>
          <p className="text-lg text-gray-600 mb-4">Fizik kavramlarını eğlenceli oyunlarla öğren!</p>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>2-10 Oyuncu</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>30-60 Dakika</span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              <span>9. Sınıf Seviyesi</span>
            </div>
          </div>
        </div>

        {/* Game Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map(category => {
          const IconComponent = category.icon;
          return <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-full ${category.color} text-white`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary">{category.cardCount} Kart</Badge>
                  </div>
                  <CardTitle className="text-xl">{category.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                  <div className="text-xs text-gray-500 font-medium">
                    {category.scientist} Bölümü
                  </div>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => startGame(category.id)} className="w-full group-hover:bg-primary/90 transition-colors">
                    <Play className="w-4 h-4 mr-2" />
                    Oyunu Başlat
                  </Button>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Game Rules */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Oyun Kuralları
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Genel Kurallar:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 5'er kişilik 2 grup halinde oynanır</li>
                  <li>• Her öğrenci 1 kez anlatım yapar</li>
                  <li>• 38 kare ilerleyen grup kazanır</li>
                  <li>• Yasaklı kelime kullanımında 1 kare geri</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Süre Kuralları:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Çizerek Anlatma: 2 dakika</li>
                  <li>• Diğer kategoriler: 1 dakika</li>
                  <li>• Semboller ve Birimler: 30 saniye</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="py-6">
            <div className="text-center space-y-3">
              <div className="text-lg font-bold text-blue-800">
                2204-A Lise Öğrencileri Araştırma Projeleri Yarışması
              </div>
              <div className="text-xl font-bold text-indigo-700">
                "Eğlenerek Fiziği Tekrar Ediyorum"
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-semibold">Cumhuriyet Anadolu Lisesi 9. Sınıf Öğrencileri</p>
                <p>ile</p>
                <p className="font-semibold">Fizik Öğretmenleri Kerim ÖZKAN ve Ertuğrul AYDIN</p>
                <p className="font-medium text-blue-600">tarafından tasarlanmıştır</p>
              </div>
              <div className="text-xs text-gray-500 mt-4 pt-3 border-t border-blue-200">
                <p>Türkiye Yüzyılı Maarif Modeli'ne uygun olarak geliştirilmiştir</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default Index;