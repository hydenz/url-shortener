const { Router } = require('express');
const path = require('path');
const fs = require('fs/promises');

const jsonFilePath = path.resolve('urls.json');
const router = Router();

// Generate a eight character length hexadecimal string
const genRanHex = () =>
  [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

router.get('/:id', async (req, res) => {
  const urls = await fs
    .readFile(jsonFilePath, {
      encoding: 'utf-8',
    })
    .then((resp) => JSON.parse(resp));
  const originalURL = urls[req.params.id];

  if (originalURL) return res.redirect(301, originalURL);
  return res.status(404).json({ message: 'Shortened URL not found!' });
});

router.post('/', async (req, res) => {
  const { urlToShorten } = req.body;
  const urls = await fs
    .readFile(jsonFilePath, {
      encoding: 'utf-8',
    })
    .then((resp) => JSON.parse(resp));

  const urlWithoutProtocol = urlToShorten.split('//').pop();
  const ranHex = genRanHex();
  const protocol = /^https/.test(urlToShorten) ? 'https' : 'http';
  urls[ranHex] = `${protocol}://${urlWithoutProtocol}`;

  await fs.writeFile(jsonFilePath, JSON.stringify(urls, null, 2));

  return res.json({
    message: 'Shortened URL with success!',
    shortenedUrl: `${req.protocol}://${req.hostname}/${ranHex}`,
  });
});

module.exports = router;
