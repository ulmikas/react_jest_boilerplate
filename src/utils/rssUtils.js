import Parser from 'rss-parser';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

const getRssContent = async (url) => {
  const parser = new Parser();
  let result;

  try {
    const feed = await parser.parseURL(`${CORS_PROXY}${url}`);
    result = feed.items.map(item => item.title);
  } catch (err) {
    result = { error: err };
  }

  return result;
};

export { getRssContent };
