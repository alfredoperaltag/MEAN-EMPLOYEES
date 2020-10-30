const express = require('express')
const app = express()

const { mongoose } = require('./database')

// Settings
app.set('port', process.env.PORT || 3000)

// Midlewares
app.use(express.json())

// Routes
app.use('/api/employees', require('./routes/employee.routes'))

// Starting server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
})