const express = require('express');
const { exec } = require('child_process');
const googleTrends = require('google-trends-api');
const app = express();
const port = 3001;

app.use(express.json());

// 정적 파일을 제공하는 미들웨어 설정
app.use(express.static('public'));

// 기본 경로에 대한 라우트 추가
// app.get('/', (req, res) => {
//   res.send('Hello, World! This is the root path.');
// });

app.post('/getKeywords', async (req, res) => {
  const keyword = req.body.keyword;

  // Node.js 결과
  let nodeResult;
  await googleTrends
    .relatedQueries({ keyword, geo: 'KR' })
    .then((result) => {
      console.log('Node.js result:', result);
      const queries = JSON.parse(result).default.rankedList[0].rankedKeyword;
      console.log('Top 10 related keywords:', queries);
      nodeResult = queries
        .map((query, index) => `${index + 1}. ${query.query}`)
        .slice(0, 50);
    })
    .catch((err) => {
      console.error('Error:', err);
    });

  // Python 결과
  exec(`python3 googleTrendsPython.py ${keyword}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error}`);
      return;
    }
    const pythonResult = stdout;

    // 클라이언트에 응답 보내기
    res.json({
      nodeResult,
      pythonResult: pythonResult.trim().split('\n'),
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
