const express = require('express')
const router = express.Router({mergeParams: true})
const personController = require("../controllers/person.controller.js")


router.get("/:personId/medias", personController.personMedias)
router.get("/:personId", personController.personDetail)

module.exports = {
    router
}

 
