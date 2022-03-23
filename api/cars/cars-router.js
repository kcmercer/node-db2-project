// DO YOUR MAGIC

const Cars = require('./cars-model')
const router = require('express').Router()

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

router.get('/', async (req, res, next) => {
  try {
    const data = await Cars.getAll()
    res.status(200).json(data)
  }

  catch(error) {
    res.status(500).json({
      message: 'unable to find car'
    })
  }
})

router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    res.status(200).json(req.car)
  }

  catch(error) {
    next(error)
  }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
  try {
    const newCar = await Cars.create(req.body)
    res.status(201).json(newCar)
  }

  catch(error) {
    res.status(500).json({
      message: 'unable to add car'
    })
  }
})

router.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    customError: 'Something went wrong',
    message: error.message,
    stack: error.stack
  })
})

module.exports = router;
