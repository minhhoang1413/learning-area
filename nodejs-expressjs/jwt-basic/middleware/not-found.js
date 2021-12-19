const notFound = (req,res) => {
    return res.status(404).json({msg:'route does not exist'})
}
module.exports = notFound