const mongoose = require('mongoose')
const { Schema } = mongoose

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    office: { type: String, required: true },
    salary: { type: Number, required: true }
})

//nombre de la tabla y los datos que estara almacenando
module.exports = mongoose.model('Employee', EmployeeSchema)