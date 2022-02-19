const router = require("express").Router();
const { validate, User } = require("../Models/userModel");
const bycrypt = require("bcrypt");

router.post("/", async (req,res) => {
    try {
        const {error} = validate(req.body);
        if(error) {
            return res.status(400).send(
                {
                    message: error.details[0].message
                }
        )};
        const user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(409).send({message: "Users with given email already exist!"});
        }

        const salt = await bycrypt.genSalt(Number(process.env.SALT));
        const hashPssword = await bycrypt.hash(req.body.password, salt);

        await new User({...req.body, password:hashPssword}).save();
        res.status(201).send({message: "User created successfully"});
    }
    catch(error) {
        res.status(500).send({message: "Internal Server Error"});
    }
});

module.exports = router;