const config = require('./../config.json');
const module_index = require("./../module_index.js");

module.exports.animals = async function(obj_sub) {
    let animal_embed_data = { embed: { author: { name: obj_sub.dc_msg.author.tag, icon_url: obj_sub.dc_msg.author.avatarURL }, image: {} } }
    switch (obj_sub.dc_args[0]) {
        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}cat`):
            animal_embed_data.embed.title = "Meow 🐱";
            animal_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("http://aws.random.cat/meow", "file").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}dog`):
            animal_embed_data.embed.title = "Woof 🐶";
            animal_embed_data.embed.image.urll = await module_index.globalfunctions_loader.animal_api("https://random.dog/woof.json", "url").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}fox`):
            animal_embed_data.embed.title = "*screams* 🦊";
            animal_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://randomfox.ca/floof", "image").catch(err => { console.log(err) })
            break;
    };
    obj_sub.dc_msg.channel.send(animal_embed_data).catch(err => { console.log(err) })
};