module.exports = async function (req, res){
    const col = req.mongoDB.db(req.mainDB).collection("drugs")
    const params = req.params

    try {
        const item = await col.findOne({_id: params.id})
        return res.status(200).json({
            data: item,
            msg: "Success fetch data"
        })
    } catch (err) {
        return res.status(401).json({
            msg: "Can not find medicine"
        })
    }
}