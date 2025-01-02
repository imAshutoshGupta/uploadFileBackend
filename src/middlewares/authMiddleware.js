const jwt = require('jsonwebtoken')

exports.protectedRoute = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            message: "Authorization required"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }

}
