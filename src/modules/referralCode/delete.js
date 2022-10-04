module.exports = async function (req, res){
    const col = req.mongoDB.db(req.mainDB).collection("referrals")
    const params = req.params

    try {
        const item = await col.findOne({_id: params.id})
        if(!item) return res.status(404).json({
            code: 404,
            success: false,
            msg: "Can not find referral code"
        })
        await col.deleteOne({_id: params.id})
        return res.status(200).json({
            code: 200,
            success: true,
            msg: "Success delete data"
        })
    } catch (err) {
        return res.status(500).json({
            code: 500,
            success: false,
            msg: "Internal server error"
        })
    }
}