const User = require("../Models/userModel");

const router = require("express").Router();
const mongoose = require("mongoose");

router.post("/", async (req,res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        user.firstName = req.body.firstName || user,firstName;
        user.lastName = req.body.lastName || user,lastName;
        user.email = req.body.email || user,email;

        if(req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id:updatedUser._id,
            firstName:updatedUser.firstName,
            lastName:updatedUser.lastName,
            email:updatedUser.email,
            token:user.generateToken(updatedUser._id),
        });
    }
    else {
        return res.status(404).send({message: "User not Found"});
    }
});

module.exports = router;