const express = require('express');
const connectDB = require('./config/db')
const app = express();

//connect database
connectDB();

const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
app.use(jsonParser);

//Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API Running'))

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/user/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/uploadFile', require('./routes/api/sourcefile'));
app.use('/api/translation', require('./routes/api/translation'));
// app.use('/a/api/uploadFilepi/translation', require('./routes/api/translation'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))