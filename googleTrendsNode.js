const googleTrends = require('google-trends-api');

googleTrends
  .relatedQueries({ keyword: '수면', geo: 'KR' })
  .then((result) => {
    const queries = JSON.parse(result).default.rankedList[0].rankedKeyword;
    const topQueries = queries.map((query) => query.query).slice(0, 10);
    console.log('Top 5 related keywords:', topQueries);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
