module.exports = async function (req, res){
    const col = req.mongoDB.db(req.mainDB).collection("referrals")
    const {search} = req.query
    let filter = {}
    if (search) {
        filter['$text'] = { $search: search }
      }
    try {

        let result = await col.find(filter).toArray()
        console.log(result)
        return res.status(200).json({
            code: 200,
            success: true,
            data: result
        })
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            code: 500,
            success: false,
            msg: "Internal server error"
        })
    }
}