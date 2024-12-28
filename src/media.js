const axios = require('axios');

async function searchMedia(key, page) {
    try {
        const response = await axios.get('https://api.tmdb.org/3/search/movie', {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTI5Yzk1NjE3MzNlMzAyMGRlNjBhNTRlNTQ1MTdmMSIsIm5iZiI6MTczNTQwMjkzNS44NzY5OTk5LCJzdWIiOiI2NzcwMjViN2FhOGYzMTU5ZDYxMmU0YjgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0._VJspou2hGhaJApM3zyOf-WcSsuU8E-XFi2z0wf0wzM',
          },
          params: {
            query: key,
            language: 'en-US',
            page: page
          },
        });

        return response.data;
      } catch (error) {
        return { error: error.message };
    }
}

async function getMediaImage(key) {
    try {
        const response = await axios.get(`https://image.tmdb.org/t/p/original/${key}.jpg`, { responseType: 'arraybuffer' });

        return response.data;
      } catch (error) {
        return { error: error.message };
    }
}

async function getPlaceholder(size) {
  const [ w, h ] = size.split('x');
  try {
      const response = await axios.get(`https://picsum.photos/${w}/${h}?_=${Date.now()}`, {
        responseType: 'arraybuffer',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0'
        }
      });

      return response.data;
    } catch (error) {
      return { error: error.message };
  }
}

module.exports = {
    searchMedia,
    getMediaImage,
    getPlaceholder
}