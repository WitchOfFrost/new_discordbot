const axios = require("axios");

module.exports.submission = async function(obj_sub) {
    var endpoints = ["neko", "hug", "fluff", "wag", "kiss", "pat", "cuddle", "poke", "wallpaper", "gecg", "8ball", "slap", "suck"]

    if (endpoints.includes(obj_sub.dc_args[1])) {
        obj_sub.dc_msg.channel.send("Submitted.");
    } else {
        obj_sub.dc_msg.channel.send("No valid endpoint specified!");
    }
};