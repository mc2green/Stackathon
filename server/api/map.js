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
      res.status(404).send('Can not get places!')
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
      res.status(404).send('Can not add place!')
    }
  } catch (error) {
    next(error)
  }
})
router.delete('/:place', async (req, res, next) => {
  try {
    const {place} = req.params
    const deletePlace = await Place.findOne({
      where: {
        name: place,
        userId: req.user.id
      }
    })
    if (deletePlace) {
      const deletedPlace = await deletePlace.destroy()
      if (deletedPlace) {
        res.send(deletePlace)
      } else {
        res.send(`Failed to delete ${deletePlace}`)
      }
    } else {
      res.send(`${deletePlace} was not found`)
    }
  } catch (error) {
    next(error)
  }
})
