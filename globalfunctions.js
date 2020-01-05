const axios = require('axios');

module.exports.str_replace = String.prototype.replaceAll = function(search, replacement, target) {
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports.animal_api = async function(url, file) {
    let img = await axios.get(url)
    return (img.data[file])
};

module.exports.date = async function(get_date) {
    let date = ("0" + get_date.getDate()).slice(-2);
    let month = ("0" + (get_date.getMonth() + 1)).slice(-2);
    let year = get_date.getFullYear();
    let hours = ("0" + get_date.getHours()).slice(-2);
    let minutes = ("0" + get_date.getMinutes()).slice(-2);
    let seconds = ("0" + get_date.getSeconds()).slice(-2);
    return (month + "/" + date + "/" + year + " " + hours + ":" + minutes + ":" + seconds)
};