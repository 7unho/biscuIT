function getProtocol(url: string) {
  let end = url.indexOf('://') + 3;
  return url.slice(0, end);
}

function getHostname(url: string) {
  let start = url.indexOf('://') + 3;
  let end = url.indexOf('/', start);
  return url.slice(start, end);
}

function scrap(doc: Document, url: string) {
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

const getProxyUrl = (url: string) => {
  if (url.startsWith('https://blog.kmong.com')) return '/kmong';
  if (url.startsWith('https://devocean.sk.com/blog')) return '/sk';
  if (url.startsWith('https://medium.com/coupang-engineering/'))
    return '/coupang';
  if (url.startsWith('https://aws.amazon.com/')) return '/aws';
  if (url.startsWith('https://medium.com/29cm/')) return '/29cm';
  return url;
};

export const useGetMetaData = async (url: string) => {
  try {
    const html = await fetch(url, {
      mode: 'cors',
    }).then((res) => {
      // console.log(res);
      return res.text();
    });
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const { image, desc } = scrap(doc, url);
    return { image, desc };
  } catch (error) {
    console.log(url, error);
    return;
  }
};
