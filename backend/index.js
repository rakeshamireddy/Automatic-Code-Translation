const express = require('express');
const connectDB = require('./config/db')
const app = express();

//connect database
connectDB();

app.get('/', (req, res) => res.send('API Running'))

//Define Routes

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/admin', require('./routes/api/admin'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))