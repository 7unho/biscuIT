// const express = require('express');
// const fetch = require('node-fetch');
// const { JSDOM } = require('jsdom');

import express from 'express';
import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

const app = express();

app.get('/', async (req, res) => {
  try {
    const url = req.query.url;
    const html = await fetch(url).then((res) => res.text());
    const dom = new JSDOM(html);
    const { image, desc } = scrap(dom.window.document, url);
    res.json({ image, desc });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

function scrap(doc, url) {
  // 이미지
  let imageEl = doc.querySelector("meta[property='og:image']");
  let image = imageEl ? imageEl.getAttribute('content') : null;

  if (!image) {
    imageEl = doc.querySelector('img');
    image = imageEl ? imageEl.getAttribute('src') : null;

    if (image && image.indexOf('http') === 0) {
    } else if (image && image[0] === '/') {
      image = getProtocol(url) + getHostname(url) + image;
    } else {
      image = '';
    }
  }

  // 글요약
  let descEl = doc.querySelector("meta[property='og:description']");
  let desc = descEl ? descEl.getAttribute('content') : '';

  return { image, desc };
}

function getProtocol(url) {
  let end = url.indexOf('://') + 3;
  return url.slice(0, end);
}

function getHostname(url) {
  let start = url.indexOf('://') + 3;
  let end = url.indexOf('/', start);
  return url.slice(start, end);
}
