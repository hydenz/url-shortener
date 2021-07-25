const express = require('express');
const urls = require('./urls');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(urls);

app.listen(port, () => console.log(`Server listening at port ${port}`));
