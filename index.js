const json_reload = require('self-reload-json');
const config = new json_reload("./config.json");
const Discord = require("discord.js");
const dc_client = new Discord.Client();
const module_index = require("./module_index.js")

dc_client.on('ready', state => {
    console.log(`Logged in as ${dc_client.user.tag}`)
});

dc_client.on('message', async dc_msg => {

    // Message Logs
    if (config.bot_config.debug == "true") {
        console.log(`[${new Date(Date.now()).toLocaleString()}] ${dc_msg.guild.id} - ${dc_msg.member.user.tag}: ${dc_msg}`);
    } else {}

    // Message Guards
    if (dc_msg.author.bot) return;
    var dc_args = await dc_msg.content.split(/\s+/g);
    var link_finder = await dc_msg.content.split('/');

    // Switch Code

    switch (dc_args[0]) {
        case `${config.bot_config.prefix}color`:
        case `${config.bot_config.prefix}colour`:
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg, dc_client: dc_client }
            module_index.util_loader.color(obj_sub)
            break;

        case `${config.bot_config.prefix}ping`:
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg, dc_client: dc_client }
            module_index.util_loader.ping(obj_sub)
            break;

        case `${config.bot_config.prefix}commands`:
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.help_loader.commands(obj_sub)
            break;

        case `${config.bot_config.prefix}help`:
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.help_loader.help(obj_sub)
            break;

        case `${config.bot_config.prefix}owner.exec`:
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.owner_commands_loader.bash_execute(obj_sub)
            break;

        case `${config.bot_config.prefix}owner.config`:
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.owner_commands_loader.owner_config(obj_sub)
            break;

        case (`${config.bot_config.prefix}cat`):
        case (`${config.bot_config.prefix}dog`):
        case (`${config.bot_config.prefix}fox`):
        case (`${config.bot_config.prefix}shibe`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.image_loader.animals(obj_sub)
            break;

        case `${config.bot_config.prefix}speedrun`:
            //obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            //module_index.speedrun_loader.speedrun(obj_sub)
            dc_msg.channel.send("Not yet rewrote, use !speedrun.")
            break;

        case (`${config.bot_config.prefix}neko`):
        case (`${config.bot_config.prefix}hug`):
        case (`${config.bot_config.prefix}fluff`):
        case (`${config.bot_config.prefix}wag`):
        case (`${config.bot_config.prefix}kiss`):
        case (`${config.bot_config.prefix}pat`):
        case (`${config.bot_config.prefix}cuddle`):
        case (`${config.bot_config.prefix}poke`):
        case (`${config.bot_config.prefix}wallpaper`):
        case (`${config.bot_config.prefix}gecg`):
        case (`${config.bot_config.prefix}8ball`):
        case (`${config.bot_config.prefix}slap`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.image_loader.neko(obj_sub)
            break;

        case (`${config.bot_config.prefix}suck`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.image_loader.lewdneko(obj_sub)
            break;

        case (`${config.bot_config.prefix}agdq`):
        case (`${config.bot_config.prefix}sgdq`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.gdq_loader.main(obj_sub)
            break;

        case (`${config.bot_config.prefix}spotify`):
        case (`${config.bot_config.prefix}s`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.spotify_loader.main(obj_sub)
            break;

        case (`${config.bot_config.prefix}urban`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.util_loader.urban(obj_sub)
            break;

        case (`${config.bot_config.prefix}twitter`):
        case (`${config.bot_config.prefix}t`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.twitter_loader.search(obj_sub)
            break;
    };

    // Link Scanner

});
dc_client.login(config.bot_config.token);