const authorize = (permittedRole) => {
    return (req, res, next) => {
        if (permittedRole.includes(req.role)) {
            next()
        } else {
            res.status(400).json({ msg: "not authorized" })

        }
    }
}


module.exports = {
    authorize
}