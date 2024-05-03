const User = require('../models/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {

    console.log('Request body:', req.body);
    
    const { stuid, pwd, fname,lname,email } = req.body;
    if (!stuid || !pwd || !fname || !lname || !email) return res.status(400).json({ 'message': 'Please Fill Out All Boxes.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ studentid:stuid }).exec();

    if (duplicate) return res.sendStatus(409).json(); //Conflict 

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
        
        //create and store the new user
        const result = await User.create({ 
            "studentid": stuid, 
            "firstname": fname,
            "lastname": lname,
            "email": email,
            "password": hashedPwd,
        });

        console.log(result);
        
        res.status(201).json({ 'success': `New user ${stuid} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = { handleNewUser };