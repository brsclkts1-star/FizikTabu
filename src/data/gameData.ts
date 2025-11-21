// Game data based on the physics education project
export const gameData = {
  symbols: [
    { concept: "Isı", type: "symbol", answer: "Q" },
    { concept: "Sıcaklık", type: "symbol", answer: "T" },
    { concept: "Kuvvet", type: "symbol", answer: "F" },
    { concept: "Kütle", type: "symbol", answer: "m" },
    { concept: "Hız", type: "symbol", answer: "v" },
    { concept: "İvme", type: "symbol", answer: "a" },
    { concept: "Zaman", type: "symbol", answer: "t" },
    { concept: "Uzunluk", type: "symbol", answer: "l" },
    { concept: "Hacim", type: "symbol", answer: "V" },
    { concept: "Yoğunluk", type: "symbol", answer: "ρ" },
    { concept: "Basınç", type: "symbol", answer: "P" },
    { concept: "Enerji", type: "symbol", answer: "E" },
    { concept: "Güç", type: "symbol", answer: "P" },
    { concept: "Elektrik Akımı", type: "symbol", answer: "I" },
    { concept: "Gerilim", type: "symbol", answer: "V" },
    { concept: "Direnç", type: "symbol", answer: "R" },
    { concept: "Işık Hızı", type: "symbol", answer: "c" },
    { concept: "Yerçekimi İvmesi", type: "symbol", answer: "g" },
    { concept: "Momentum", type: "symbol", answer: "p" },
    { concept: "Frekans", type: "symbol", answer: "f" },
    
    // Units
    { concept: "Kuvvet", type: "unit", answer: "Newton (N)" },
    { concept: "Enerji", type: "unit", answer: "Joule (J)" },
    { concept: "Güç", type: "unit", answer: "Watt (W)" },
    { concept: "Basınç", type: "unit", answer: "Pascal (Pa)" },
    { concept: "Sıcaklık", type: "unit", answer: "Kelvin (K)" },
    { concept: "Elektrik Akımı", type: "unit", answer: "Amper (A)" },
    { concept: "Gerilim", type: "unit", answer: "Volt (V)" },
    { concept: "Direnç", type: "unit", answer: "Ohm (Ω)" },
    { concept: "Frekans", type: "unit", answer: "Hertz (Hz)" },
    { concept: "Işık Şiddeti", type: "unit", answer: "Kandela (cd)" },
    { concept: "Madde Miktarı", type: "unit", answer: "Mol (mol)" },
    { concept: "Uzunluk", type: "unit", answer: "Metre (m)" },
    { concept: "Kütle", type: "unit", answer: "Kilogram (kg)" },
    { concept: "Zaman", type: "unit", answer: "Saniye (s)" },
    { concept: "Hacim", type: "unit", answer: "Metreküp (m³)" }
  ],

  drawing: [
    { concept: "Dinamometre" },
    { concept: "Sürtünme Kuvveti" },
    { concept: "Hal Değişimi" },
    { concept: "Erime Olayı" },
    { concept: "Yenilenebilir Enerji" },
    { concept: "Isıl Denge" },
    { concept: "Güneş Saati" },
    { concept: "Dış Gezegenler" },
    { concept: "Meteor Yağmurları" },
    { concept: "Yankı" },
    { concept: "Donma Olayı" },
    { concept: "Güneş Tutulması" },
    { concept: "Ay Tutulması" },
    { concept: "Isı Yalıtımı" },
    { concept: "Yalıtkan Cisim" },
    { concept: "Uzay İstasyonu" },
    { concept: "Teleskop" },
    { concept: "Gözlem Evi" },
    { concept: "Hava Direnci" },
    { concept: "Serap Görme" },
    { concept: "Termometre" },
    { concept: "Sera Etkisi" },
    { concept: "Küresel Isınma" },
    { concept: "Pascal Prensibi" },
    { concept: "Makara" },
    { concept: "Palanga" },
    { concept: "Eğik Düzlem" },
    { concept: "Kaldıraç" },
    { concept: "Çıkrık" },
    { concept: "Vida" },
    { concept: "Kasnak" },
    { concept: "Elektroskop" },
    { concept: "Topraklama" },
    { concept: "Rüzgar Santrali" },
    { concept: "Hidroelektrik Santral" },
    { concept: "Nükleer Santral" },
    { concept: "Evren" },
    { concept: "Mekanik" },
    { concept: "Elektromanyetizma" },
    { concept: "Termodinamik" },
    { concept: "Optik" },
    { concept: "Kütle Çekim" },
    { concept: "Konum" },
    { concept: "Güçlü Nükleer" }
  ],

  questions: [
    { question: "Fiziğin temel büyüklüklerinden biri olan ve 'kg' ile ölçülen nedir?", answer: "Kütle" },
    { question: "Işığın hızı yaklaşık kaç m/s'dir?", answer: "300.000.000 m/s" },
    { question: "Yerçekimi ivmesi yaklaşık kaç m/s²'dir?", answer: "9,8 m/s²" },
    { question: "Suyun kaynama noktası kaç Kelvin'dir?", answer: "373 K" },
    { question: "Elektrik akımının birimi nedir?", answer: "Amper (A)" },
    { question: "Kuvvetin birimi nedir?", answer: "Newton (N)" },
    { question: "Enerjinin birimi nedir?", answer: "Joule (J)" },
    { question: "Basıncın birimi nedir?", answer: "Pascal (Pa)" },
    { question: "Frekansın birimi nedir?", answer: "Hertz (Hz)" },
    { question: "Güneş sisteminde kaç gezegen vardır?", answer: "8" },
    { question: "Atomun çekirdeğinde hangi parçacıklar bulunur?", answer: "Proton ve Nötron" },
    { question: "Ses hangi ortamda yayılamaz?", answer: "Boşluk" },
    { question: "Ohm yasası hangi büyüklükler arasındaki ilişkiyi verir?", answer: "Gerilim, Akım ve Direnç" },
    { question: "Kinetik enerji formülü nedir?", answer: "Ek = ½mv²" },
    { question: "Potansiyel enerji formülü nedir?", answer: "Ep = mgh" },
    { question: "Newton'un birinci yasası ne olarak bilinir?", answer: "Eylemsizlik Yasası" },
    { question: "Işık yılı neyin birimidir?", answer: "Uzunluk" },
    { question: "Elektron hangi yüke sahiptir?", answer: "Negatif (-)" },
    { question: "Proton hangi yüke sahiptir?", answer: "Pozitif (+)" },
    { question: "Nötron hangi yüke sahiptir?", answer: "Nötr (0)" },
    { question: "Maddenin dördüncü hali nedir?", answer: "Plazma" },
    { question: "Ses dalgaları hangi tür dalgalardır?", answer: "Boyuna dalgalar" },
    { question: "Işık dalgaları hangi tür dalgalardır?", answer: "Enine dalgalar" },
    { question: "Arşimet prensibi neyle ilgilidir?", answer: "Kaldırma kuvveti" },
    { question: "Bernoulli prensibi neyle ilgilidir?", answer: "Akışkanlar" },
    { question: "Doppler olayı neyle ilgilidir?", answer: "Frekans değişimi" },
    { question: "Fotoelektrik olay neyle ilgilidir?", answer: "Işık ve elektron" },
    { question: "Compton saçılması neyle ilgilidir?", answer: "X-ışınları ve elektron" },
    { question: "Planck sabiti hangi alanda kullanılır?", answer: "Kuantum fiziği" },
    { question: "Einstein'ın ünlü formülü nedir?", answer: "E = mc²" }
  ],

  taboo: [
    { 
      concept: "Fizik", 
      tabooWords: ["Bilim", "Enerji", "Kuvvet", "Yerçekimi"] 
    },
    { 
      concept: "Evren", 
      tabooWords: ["Gezegen", "Uzay", "Galaksi", "Yıldızlar"] 
    },
    { 
      concept: "Gezegen", 
      tabooWords: ["Dünya", "Güneş Sistemi", "Mars", "Satürn"] 
    },
    { 
      concept: "Yıldız", 
      tabooWords: ["Güneş", "Işık", "Sıcaklık", "Parlak"] 
    },
    { 
      concept: "Atom", 
      tabooWords: ["Elektron", "Proton", "Çekirdek", "En küçük"] 
    },
    { 
      concept: "Molekül", 
      tabooWords: ["Atomlar", "Atom", "Birleşik", "Kimya"] 
    },
    { 
      concept: "Tsunami", 
      tabooWords: ["Su", "Deniz", "Dalga", "Okyanus"] 
    },
    { 
      concept: "Aristo", 
      tabooWords: ["Filozof", "Mantık", "Bilim İnsanı", "Fizik"] 
    },
    { 
      concept: "Deney", 
      tabooWords: ["Gözlem", "Laboratuvar", "Hipotez", "Kimya"] 
    },
    { 
      concept: "Güneş", 
      tabooWords: ["Yıldız", "Işık", "Isı", "Sıcaklık"] 
    },
    { 
      concept: "Mars", 
      tabooWords: ["Kızıl Gezegen", "Gezegen", "Güneş sistemi", "Su"] 
    },
    { 
      concept: "Newton", 
      tabooWords: ["Elma", "Yerçekimi", "Bilim İnsanı", "Yerçekimi"] 
    },
    { 
      concept: "Einstein", 
      tabooWords: ["Bilim İnsanı", "Enerji-madde", "Matematik", "Fizik"] 
    },
    { 
      concept: "Tesla", 
      tabooWords: ["Bilim İnsanı", "Alternatif akım", "Elektrik", "Edison"] 
    },
    { 
      concept: "Curie", 
      tabooWords: ["Kadın Bilim insanı", "Radyoaktif", "Nobel", "Radyoaktivite"] 
    },
    { 
      concept: "Kütle", 
      tabooWords: ["Ağırlık", "Kilogram", "Temel büyüklük", "Hacim"] 
    },
    { 
      concept: "Kuvvet", 
      tabooWords: ["Newton", "Vektörel büyüklük", "Güç", "Hareket"] 
    },
    { 
      concept: "Enerji", 
      tabooWords: ["Madde", "Kinetik", "Potansiyel", "Isı"] 
    },
    { 
      concept: "Hız", 
      tabooWords: ["Sürat", "Araba", "Vektörel büyüklük", "Yol"] 
    },
    { 
      concept: "İvme", 
      tabooWords: ["Hız", "Değişim", "Zaman", "Vektör"] 
    }
  ]
};