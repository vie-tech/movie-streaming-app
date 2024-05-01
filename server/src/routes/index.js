const express = require('express')
const userRoute = require('./user.route').router
const mediaRoute = require('./media.route').router
const personRoute = require('./person.route.js').router
const reviewRoute = require('./review.route.js').router


const router = express.Router()

router.use("/user", userRoute)
router.use("/:mediaType", mediaRoute)
router.use("/person", personRoute)
router.use("/reviews", reviewRoute)

module.exports = {router} 