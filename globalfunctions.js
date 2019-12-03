const axios = require('axios');

module.exports.str_replace = String.prototype.replaceAll = function(search, replacement, target) {
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports.animal_api = async function(url, file) {
    let img = await axios.get(url)
    return (img.data[file])
};