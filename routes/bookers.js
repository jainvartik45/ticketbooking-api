const express= require('express');
const router = express.Router();
const Seats = require('../models/booker')

router.get('/', async (req, res) => {
    try {
      const seats = await Seats.find()
      res.json(seats)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
//   // Getting One
  router.get('/:id', getSeats, (req, res) => {
    res.json(res.seat)
  })
  
  // Creating one
  router.post('/', async (req, res) => {
    const seat = new Seats({
      seat_number: req.body.seat_number,
      row: req.body.row,
      column:req.body.column
    })
    try {
      const newSeat = await seat.save()
      res.status(201).json(newSeat)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
  // Updating One
  router.patch('/:id', getSeats, async (req, res) => {
    if (req.body.seat_number != null) {
      res.seat.seat_number = req.body.seat_number
    }
    if (req.body.row != null) {
      res.seat.row = req.body.row
    }
    if (req.body.column != null) {
        res.booker.column = req.body.column
      }
    try {
      const updatedSeat = await res.seat.save()
      res.json(updatedSeat)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
  
//   Deleting One
  router.delete('/:id', getSeats, async (req, res) => {
    try {
      await res.seat.remove()
      res.json({ message: 'Deleted seat' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  async function getSeats(req, res, next) {
    let seat;
    try {
      seat = await Seats.findById(req.params.id)
      if (seat == null) {
        return res.status(404).json({ message: 'Cannot find seat' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.seat = seat
    next()
  }
  

module.exports = router