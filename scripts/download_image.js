const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  const file = fs.createWriteStream(dest);
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };
  https.get(url, options, (response) => {
    if (response.statusCode === 302 || response.statusCode === 301) {
      download(response.headers.location, dest);
      return;
    }
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('Download completed: ' + dest);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error('Error downloading: ' + err.message);
  });
};

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: node download.js <url> <dest>');
  process.exit(1);
}

download(args[0], args[1]);
