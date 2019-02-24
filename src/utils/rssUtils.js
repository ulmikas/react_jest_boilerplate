import Parser from 'rss-parser';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const getRssContent = async (url) => {
  const parser = new Parser();
  const feed = await parser.parseURL(`${CORS_PROXY}${url}`);
  return feed.items.map(item => item.title);
};

export { getRssContent };
