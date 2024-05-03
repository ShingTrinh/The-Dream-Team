const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin = async (req, res) => {
    const { stuid, pwd } = req.body;
    if (!stuid || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

    const foundUser =await User.findOne({ studentid:stuid }).exec();

    if (!foundUser) return res.sendStatus(401); //unauthorized 
    // evaluate password 
    const match = await bcrypt.compare(pwd, foundUser.password);

    if (match) {
        const roles = Object.values(foundUser.roles);
        // create JWTs, this stuff gives users a special token to the user so that they can get access and how long they get to be on the site
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "studentid": foundUser.studentid,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '20m'}
        );
        const refreshToken = jwt.sign(
            {"studentid": foundUser.stuid },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        
        //saving refresh token to current user
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None',/*secure: true*/ maxAge: 24 * 60 * 60 * 1000 });
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}

module.exports = { handleLogin };