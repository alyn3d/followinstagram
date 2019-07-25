
let Instagram = require('instagram-nodejs-without-api');
const username = process.env.INSTA_USER;
const password = process.env.INSTA_PASS;

Instagram = new Instagram();

async function instaStuff(instaUser) {
    Instagram.getCsrfToken().then((csrf) => {
        Instagram.csrfToken = csrf;
    }).then(() => {
        return Instagram.auth(username, password).then(sessionId => {
            Instagram.sessionId = sessionId

            return Instagram.getUserDataByUsername(instaUser).then((t) => {
                console.log(t.graphql.user.id);
                let userToFollowId = t.graphql.user.id;
                Instagram.follow(userToFollowId, 0);
                console.log("Followed " + instaUser + " with id: " + userToFollowId);
                
            })

        })
    }).catch(console.error);
}

module.exports = {
    followUser: async (req, res, next) => {
        console.log("Started app...");
        try {
            userTofollow = req.query.user;
            if (userTofollow) {
                instaStuff(userTofollow);
            } else {
                console.log("No parameter specified!");
            }
            
        } catch (err) {
            next(err);
        }

        return res.send('Done!');
    },
};