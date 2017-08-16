const express = require('express');
const app = express();

// const cookieParser = require('cookie-session');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) =>{
  res.redirect('index.html')
});

app.listen(8080, ()=>{
  console.log('Listening on port 8080...')
});
