import User from "../models/userModel"
import jwt from "jsonwebtoken"
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        //transform token to user object
        const decoded = jwt.verify(token, 'secret123')
        const user = await User.findOne({ _id: decoded.id, "tokens.token": token })
        if (user) {
            throw new Error();
        }
        req.user = user
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate." });
    }
}
export default auth