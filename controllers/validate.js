const validator = require('validator');
const user = require('../models/User');

async function validateInput(body, route) {
    let {name, email, password} = body;
    let output = {
        status: true,
        errors: []
    };
    name = name + '';
    email = email + '';
    password = password + '';
    
    if (route == 'signUp') {
        if (!validator.isLength(name, {min: 2})) {
            output.status = false;
            output.errors.push({
                    "param": "name",
                    "message": "Name should be at least 2 characters.",
                    "code": "INVALID_INPUT"
            })
        }
    }
    
    if (!validator.isEmail(email)) {
        output.status = false;
        output.errors.push( {
            "param": "email",
            "message": "Please provide a valid email address",
            "code": "INVALID_INPUT"
        })
    }

    if (!validator.isLength(password, {min: 6})) {
        output.status = false;
        output.errors.push({
            "param": "password",
            "message": "Password should be at least 6 characters.",
            "code": "INVALID_INPUT"
        })
    }

    if (route == 'signUp') {
        let userExists = await user.findOne({email: email});
        if (userExists) {
            output.status = false;
            output.errors.push({
                "param": "email",
                "message": "User with this email address already exists.",
                "code": "RESOURCE_EXISTS"
            })
        }
    }

    if (route == 'signIn') {
        let userExists = await user.findOne({ email: email});
        if (!userExists) {
            output.status = false;
            output.errors.push({
                "param": "email",
                "message": "Please provide a valid email address.",
                "code": "INVALID_INPUT"
            })
        }
    }
    return output;
}

module.exports = validateInput;