const Unsplash = require('unsplash-js').default;
const fetch = require('node-fetch');
global.fetch = fetch;

const unsplash = new Unsplash({
  applicationId:
    '76a57cff6fcae7e282f1d61877152af19147458180ef91a9882e78bd4c0e3917',
  secret: 'b946a7c81feedceeda523fd8aa110f28c5aab3b772330d8860321d52c8cb7227',
});

const getResizedImage = raw => `${raw}&w=250&h=250&fit=crop`;

module.exports = server => {
  server.get('/api/images', async (req, res, next) => {
    try {
      const { take } = req.query;
      const images = await unsplash.search
        .photos('cat', take || 10)
        .then(res => res.json());

      res.json(images);
    } catch (error) {
      console.log('error', error);
      res.status(500).send(error);
    }
  });
  return server;
};
