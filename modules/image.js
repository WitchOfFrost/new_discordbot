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

module.exports.neko = async function(obj_sub) {
    let neko_embed_data = { embed: { author: { name: obj_sub.dc_msg.author.tag, icon_url: obj_sub.dc_msg.author.avatarURL }, image: {} } }

    switch (obj_sub.dc_args[0]) {
        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}neko`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/neko", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}hug`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/hug", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}fluff`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/fluff", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}wag`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/wag", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}kiss`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/kiss", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}pat`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/pat", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}cuddle`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/cuddle", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}poke`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/poke", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}wallpaper`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/wallpaper", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}gecg`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/kiss", "gecg").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}8ball`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/8ball", "image").catch(err => { console.log(err) })
            break;

        case (obj_sub.dc_args[0] = `${config.bot_config.prefix}slap`):
            neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/slap", "image").catch(err => { console.log(err) })
            break;
    };
    obj_sub.dc_msg.channel.send(neko_embed_data).catch(err => { console.log(err) })
};

module.exports.lewdneko = async function(obj_sub) {
    let neko_embed_data = { embed: { author: { name: obj_sub.dc_msg.author.tag, icon_url: obj_sub.dc_msg.author.avatarURL }, image: {} } }
    if (obj_sub.dc_msg.channel.nsfw) {
        switch (obj_sub.dc_args[0]) {
            case (obj_sub.dc_args[0] = `${config.bot_config.prefix}suck`):
                neko_embed_data.embed.image.url = await module_index.globalfunctions_loader.animal_api("https://api.i-love-catgirls.de/v1/media/suck", "image").catch(err => { console.log(err) })
                break;
        }
        obj_sub.dc_msg.channel.send(neko_embed_data).catch(err => { console.log(err) });
    } else {
        obj_sub.dc_msg.channel.send("This channel has to be NSFW!")
    }

}