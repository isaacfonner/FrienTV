const express = require('express');
const { searchMedia, getMediaImage, getPlaceholder } = require('./media.js')

const router = express.Router();

router.all('/', (req, res) => {
  res.send('OK');
});

router.all('/search/:query/:page?', async(req, res) => {
    const page = req.params.page || 1;
    const search = await searchMedia(req.params.query, page);
    res.json(search);
});

router.all('/image/:key/', async(req, res) => {
    const img = await getMediaImage(req.params.key);
    if (img.error) {
        res.status(404).json({ error: img.error });
    } else {
        const imgb = Buffer.from(img, 'binary');
        res.set('Content-Type', 'image/jpeg');
        res.send(imgb);
    }
});

router.all('/placeholder/:size', async(req, res) => {
    const img = await getPlaceholder(req.params.size);
    if (img.error) {
        res.status(404).json({ error: img.error });
    } else {
        const imgb = Buffer.from(img, 'binary');
        res.set('Content-Type', 'image/jpeg');
        res.send(imgb);
    }
});

module.exports = {
    router
}