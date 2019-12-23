const router = require('express').Router()
const {Place, UserPlace, User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const places = await Place.findAll({
      where: {
        userId: req.user.id
      }
    })
    if (places) {
      res.send(places)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {name, latitude, longitude} = req.body
    const createPlace = await Place.create({
      name: name,
      latitude: latitude,
      longitude: longitude,
      userId: req.user.id
    })
    if (createPlace) {
      res.json(createPlace)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
