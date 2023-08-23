
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const body = req.body;

  res.status(200).json();

  res.end();
});

app.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});