const { User } = require('../../models/index');

const validation = async (req, res, next) => {
    const id = req.params.id
    // console.log(id)
    const user = await User.findOne({
        where: {
            id: id,
            Active: "True"
        }
    })
    // console.log(!user)
    if (!user) {
        return res.send("usuario invalido")
    }
    next()

}

module.exports = { validation }