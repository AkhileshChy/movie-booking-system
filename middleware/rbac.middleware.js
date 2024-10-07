const authorize = (roles = []) => {
    return (req, res, next) => {
        const userRole = req.user.role;

        if (!roles.includes(userRole)) {
            return res.status(403).json({ msg: 'Unauthorized' });
        }

        next();
    }
}

export default authorize;