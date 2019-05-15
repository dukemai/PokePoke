const express = require('express');
const { parse } = require('url');
const next = require('next');
const helmet = require('helmet');
const fetch = require('node-fetch');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const ROOT_URL = dev ? `http://localhost:${port}` : 'https://builderbook.org';

const URL_MAP = {};
global.fetch = fetch;
app.prepare().then(() => {
  const server = express();
  server.use(helmet());

  // give all Nextjs's request to Nextjs server
  server.get('/_next/*', (req, res) => {
    handle(req, res);
  });

  server.get('/static/*', (req, res) => {
    handle(req, res);
  });


  server.get('*', (req, res) => {
    const url = URL_MAP[req.path];
    if (url) {
      app.render(req, res, url);
    } else {
      handle(req, res);
    }
  });
  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on ${ROOT_URL}`);
  });
});
