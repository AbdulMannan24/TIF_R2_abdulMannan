// ONLY used while creating a community
const { Snowflake } = require('@theinternetfolks/snowflake');
const role = require('../models/Role');

async function assignRole(name) {
    try {
        let createRole = await role.create({
            id: Snowflake.generate(),
            name: name
        })
        if (createRole) {
            return createRole.id;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = assignRole;