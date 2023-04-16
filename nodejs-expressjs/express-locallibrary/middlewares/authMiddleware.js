
function authMiddleware(req, res, next) {
    const user = res.locals.user
    if (!user) {
        return res.redirect('/auth/login')
    }
    next()
}

module.exports = authMiddleware