const mongoose = require('mongoose')

const seatSchema = new mongoose.Schema({
  seat_number: {
    type: Number,
    required: true
  },
  row: {
    type:Number,
    required: true
  },
  column: {
    type: Number,
    required: true,
  }
})

module.exports = mongoose.model('Seat', seatSchema)