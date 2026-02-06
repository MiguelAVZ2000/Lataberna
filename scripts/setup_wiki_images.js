const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})` + (response.headers.location ? ` -> ${response.headers.location}` : '')));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Descargado: ' + dest);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const images = [
  // Razas
  { url: "https://images.unsplash.com/photo-1599408162162-cdb25bf3f392?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/humano.jpg" },
  { url: "https://images.unsplash.com/photo-1542831371-d6482c97f48e?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/elfo.jpg" },
  { url: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/enano.jpg" },
  { url: "https://images.unsplash.com/photo-1627843563095-f6e94676cee0?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/mediano.jpg" },
  { url: "https://images.unsplash.com/photo-1615017046036-7e997a0cad70?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/draconido.jpg" },
  { url: "https://images.unsplash.com/photo-1626084300760-5391123933f8?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/gnomo.jpg" },
  { url: "https://images.unsplash.com/photo-1514332930284-8d753af1c304?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/semielfo.jpg" },
  { url: "https://images.unsplash.com/photo-1579309117601-5a9d8ed07c42?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/semiorco.jpg" },
  { url: "https://images.unsplash.com/photo-1519448301147-380126a978f4?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/razas/tiefling.jpg" },
  
  // Clases
  { url: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/barbaro.jpg" },
  { url: "https://images.unsplash.com/photo-1469510360132-9fa6aba9dfb2?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/bardo.jpg" },
  { url: "https://images.unsplash.com/photo-1533134486753-c812c140cb0b?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/clerigo.jpg" },
  { url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/druida.jpg" },
  { url: "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/guerrero.jpg" },
  { url: "https://images.unsplash.com/photo-1555513941-94d70425026c?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/monje.jpg" },
  { url: "https://images.unsplash.com/photo-1519448301147-380126a978f4?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/paladin.jpg" },
  { url: "https://images.unsplash.com/photo-1444464666168-49d633b867ad?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/explorador.jpg" },
  { url: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/picaro.jpg" },
  { url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/hechicero.jpg" },
  { url: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/brujo.jpg" },
  { url: "https://images.unsplash.com/photo-1532012197367-2806972d77d2?q=80&w=800&auto=format&fit=crop", path: "public/images/wiki/clases/mago.jpg" },
];

async function run() {
  console.log('Iniciando descarga masiva...');
  for (const img of images) {
    try {
      const dir = path.dirname(img.path);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      await download(img.url, img.path);
    } catch (err) {
      console.error(`Error con ${img.path}: ${err.message}`);
    }
  }
}

run();
