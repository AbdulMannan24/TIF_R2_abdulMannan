// ONLY used while creating a community
const { Snowflake } = require('@theinternetfolks/snowflake');
const member = require('../models/Member');

async function addMember({community, user, role}) {
    try {
        let newMember = await member.create({
            id: Snowflake.generate(),
            community: community,
            user: user,
            role: role
        })
        if (newMember) {
            return newMember;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
        return null;
    }
}

module.exports = addMember;
