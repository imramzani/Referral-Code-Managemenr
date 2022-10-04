const {v4: uuid} = require('uuid')
const joi = require('joi')

const bodyRules = joi.object({
    refCode: joi.string().required().error( new Error ('Must input referral code')),
    type: joi.string().required().error( new Error ('Must input type')),
    description: joi.string().required().error( new Error ('Must input description')),
})

module.exports = async function (req, res){
    const col = req.mongoDB.db(req.mainDB).collection("referrals")
    let body = req.body
    console.log(body)
    const id = uuid()

    let objToInsert = {
        _id: id,
        refCode: body.refCode,
        type: body.type,
        description: body.description,
        createdBy: 'user',
        createdAt: new Date()
    }

    try {
        body = await bodyRules.validateAsync(body, {stripUnknown: true})
    } catch (err) {
        return res.status(401).json({
            code: 401,
            success: false,
            msg: "Must input all field"
        })
    }

    try {
        await col.insertOne(objToInsert)
        const newItem = await col.findOne({_id: objToInsert._id})
        return res.status(201).json({
            code: 201,
            success: true,
            data: newItem,
            msg: "Success add referral code"
        })
    } catch (err) {
        return res.status(401).json({
            code: 401,
            success: false,
            msg: "Failed add referral code"
        })
    }
    
}