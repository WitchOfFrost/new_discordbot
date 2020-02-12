const config = require('./../config.json');
const axios = require('axios');
var twitter_api;

function refreshSpotifyToken() {
    console.log("Refreshing Twitter Token\n");
    axios({
        url: "https://api.twitter.com/oauth2/token",
        method: "post",
        params: {
            grant_type: "client_credentials"
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
            username: `${config.api_config.twitter.client_id}`,
            password: `${config.api_config.twitter.client_secret}`
        }
    }).then(data => {
        console.log("Changing Twitter auth token \n");
        twitter_token = data.data.access_token;
        twitter_api.defaults.headers['Authorization'] = 'Bearer ' + twitter_token;
        setTimeout(refreshSpotifyToken, 29 * 60 * 1000);
    }).catch(err => {
        console.log(err);
    })
};
refreshSpotifyToken();

var twitter_token;
var i = 0;
twitter_api = axios.create({ baseURL: 'https://api.twitter.com/1.1/', headers: { 'Authorization': 'Bearer ' + twitter_token }, json: true });


module.exports.search = async function (obj_sub) {

    let encode_this = encodeURIComponent(obj_sub.dc_args.slice(1))
    let encode_uri = `search/tweets.json?q=` + encode_this + `&possibly_sensitive=false&tweet_mode=extended&filter:safe`
    let res = await twitter_api.get(encode_uri).catch(err => console.log(err))

    if (res.data.statuses[i] == undefined) {
        obj_sub.dc_msg.channel.send("No tweet found!")
    } else {
        obj_sub.dc_msg.channel.send({ embed: { title: `Tweet by: @${res.data.statuses[i].user.screen_name}`, url: `https://twitter.com/${res.data.statuses[i].user.screen_name}/status/${res.data.statuses[i].id_str}`, thumbnail: { url: res.data.statuses[i].user.profile_image_url }, description: res.data.statuses[i].full_text, color: 565481, footer: { icon_url: "https://emilia-tan.s-ul.eu/CmlAx66s", text: "Twitter" } } });
    };
};