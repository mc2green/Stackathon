const Place = require('./place')
const User = require('./user')
const UserPlace = require('./userPlace')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
//User Model Associations

// Place.hasMany(User)
User.hasMany(Place)
Place.belongsToMany(User, {through: UserPlace})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Place,
  UserPlace
}
