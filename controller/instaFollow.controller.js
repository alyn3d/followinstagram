const sleep = require('system-sleep');
const Instagram = require('instagram-web-api');
const username = process.env.INSTA_USER;
const password = process.env.INSTA_PASS;

const client = new Instagram({ username, password });

async function followUserOnInsta(user) {
    try {
        await client.login();
        sleep(500);
        var theUserId = await client.getUserByUsername({ username: user });
        var followId = theUserId.id;
        await client.follow({ userId: followId })
        console.log("Followed " + user + " with id: " + followId);
        sleep(1000);
    } catch (err) {
        console.log('Fail!');
        console.log(err);
    }

}

module.exports = {
    followUser: async (req, res, next) => {
        console.log("Started app...");
        try {
            userTofollow = req.query.user;
            if (userTofollow) {
                followUserOnInsta(userTofollow);
            } else {
                console.log("No parameter specified!");
            }

        } catch (err) {
            next(err);
        }

        return res.send('Done!');
    },
}; 