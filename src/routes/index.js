const express = require('express')
const app = express()
const refModule = require("../modules/referralCode")

module.exports = function (app) {
    const router = express.Router()

    groupPath = '/referrals'
    router.get("/list", refModule.listHandler)
    router.post("/add", refModule.addHandler)
    router.post("/edit/:id", refModule.updateHandler)
    router.post("/delete/:id", refModule.deleteHandler)
    router.get("/:id", refModule.getOneHandler)
    app.use(`${groupPath}`, router)

}