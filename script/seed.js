'use strict'

const db = require('../server/db')
const {User, Place} = require('../server/db/models')

const users = [
  {
    firstName: 'Jeff',
    lastName: 'Bezos',
    email: 'BigJDawg@ggmail.com',
    password: 'Password123'
  },

  {
    firstName: 'Logan',
    lastName: 'LClossier',
    email: 'Xxda14u2NvxX@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Don',
    lastName: 'Julio',
    email: 'ILuvYaats@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Richard',
    lastName: 'Long',
    email: 'CPT-R_LONG@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Cornelius',
    lastName: 'Blackbeard',
    email: 'NotThatBlackbeard@ggmail.com',
    password: 'Password123'
  },
  {
    firstName: 'Megan',
    lastName: 'Donnelly',
    email: 'megan@gmail.com',
    password: 'test1234'
  }
]

const places = [
  {
    name: 'Seatle',
    latitude: 47.6062,
    longitude: -122.3321
  },
  {
    name: 'Chicago',
    latitude: 41.8781,
    longitude: -87.6298
  },
  {
    name: 'Los Angeles',
    latitude: 34.0522,
    longitude: -118.2437
  }
]

async function seed() {
  await db.sync({force: true})
  await Place.bulkCreate(places)
  await User.bulkCreate(users)
  console.log('db synced!')
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
