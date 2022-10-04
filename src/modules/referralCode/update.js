module.exports = async function (req, res){
    const col = req.mongoDB.db(req.mainDB).collection("drugs")
    const params = req.params
    let body = req.body

    const bodyRules = joi.object({
        refCode: joi.string().required().error( new Error ('Must input referral code')),
        type: joi.string().required().error( new Error ('Must input type')),
        description: joi.string().required().error( new Error ('Must input description')),
    })

    const objToUpdate = {
        ...body,
        updatedAt: new Date()
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
        const item = await col.findOne({_id: params.id})
        if(!item) return res.status(401).json({
            code: 401,
            success: false,
            msg: "Can not find referral code"
        })

        let updated = await col.updateOne({_id: params.id}, {$set: objToUpdate})
        updated = await col.findOne({_id: params.id})
        return res.status(200).json({
            code: 200,
            success: true,
            data: updated,
            msg: "Success update data"
        })
    } catch (err) {
        return res.status(500).json({
            code: 500,
            success: false,
            msg: "Internal server error"
        })
    }
}