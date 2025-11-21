# 🚀 Fizik Eğitimi Oyunu - GitHub & Vercel Deployment

## 📦 Build Hazır!
Projeniz build edildi ve deployment için hazır. İşte yapmanız gerekenler:

## 🔗 **Adım 1: GitHub Repository Oluşturun**

1. **GitHub'a gidin:** https://github.com
2. **"New repository" tıklayın**
3. **Repository ayarları:**
   ```
   Repository name: fizik-egitim-oyunu
   Description: Lise 9. sınıf fizik kavramları eğlenceli tekrar oyunu - 4 kategori, 38 kare yarış sistemi
   Visibility: Public ✅
   Add a README file: ❌ (zaten var)
   Add .gitignore: ❌ (zaten var)
   Choose a license: MIT ✅
   ```
4. **"Create repository" tıklayın**

## 📁 **Adım 2: Proje Dosyalarını İndirin**

Size hazırladığım build dosyasını indirin:
- **Dosya:** `fizik-egitim-oyunu-build.tar.gz` (644KB)
- **İçerik:** Tüm kaynak kodlar + build edilmiş dist/ klasörü

## 💻 **Adım 3: GitHub'a Yükleyin**

Dosyayı bilgisayarınıza indirdikten sonra:

```bash
# 1. Dosyayı açın
tar -xzf fizik-egitim-oyunu-build.tar.gz
cd mobile_web_app

# 2. Git repository'yi başlatın
git init
git add .
git commit -m "İlk commit: Fizik eğitimi oyunu"

# 3. GitHub repo'nuzu bağlayın (URL'i kendi repo URL'inizle değiştirin)
git remote add origin https://github.com/KULLANICI_ADINIZ/fizik-egitim-oyunu.git
git branch -M main
git push -u origin main
```

## 🚀 **Adım 4: Vercel'de Deploy Edin**

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **"Add New..." → "Project"**
3. **"Import Git Repository"**
4. **GitHub repo'nuzu seçin:** `fizik-egitim-oyunu`
5. **Build ayarları (otomatik gelecek):**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```
6. **"Deploy" tıklayın**

## ⚡ **Hızlı Alternatif: Netlify Drop**

Eğer GitHub ile uğraşmak istemiyorsanız:

1. **Netlify Drop:** https://app.netlify.com/drop
2. **`dist/` klasörünü sürükleyin**
3. **30 saniyede canlı!**

## 🎯 **Beklenen Sonuç**

Deploy tamamlandığında şöyle bir URL alacaksınız:
- **Vercel:** `https://fizik-egitim-oyunu.vercel.app`
- **Netlify:** `https://amazing-physics-game-abc123.netlify.app`

## 📋 **Deployment Checklist**

- ✅ Build tamamlandı (dist/ klasörü hazır)
- ✅ Tüm özellikler çalışıyor
- ✅ 4 kategori oyunu aktif
- ✅ Oyuncu kayıt sistemi hazır
- ✅ 38 kare yarış sistemi çalışıyor
- ✅ Mobil uyumlu
- ✅ Kategori arası geçiş sistemi aktif

## 🆘 **Sorun mu Yaşıyorsunuz?**

1. **Build hatası:** `npm install` sonra `npm run build`
2. **Git hatası:** Repository URL'ini kontrol edin
3. **Vercel hatası:** Build ayarlarını kontrol edin

---

**Hangi adımda yardıma ihtiyacınız var? GitHub repo oluşturdunuz mu?** 🚀