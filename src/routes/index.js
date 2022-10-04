const express = require('express')
const app = express()
const refModule = require("../modules/referralCode")

module.exports = function (app) {
    const router = express.Router()

    groupPath = '/medicine'
    router.get("/list", refModule.listHandler)
    router.post("/add", refModule.addHandler)
    router.post("/edit/:id", refModule.updateHandler)
    router.post("/delete/:id", refModule.deleteHandler)
    router.get("/:id", refModule.getOneHandler)
    router.post("/:id", refModule.updateHandler)
    app.use(`${groupPath}`, router)

}