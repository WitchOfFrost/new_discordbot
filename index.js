const config = require("./config.json");
const Discord = require("discord.js");
const dc_client = new Discord.Client();
const module_index = require("./module_index.js")

dc_client.on('ready', state => {
    console.log(`Logged in as ${dc_client.user.tag}`)
});

dc_client.on('message', async dc_msg => {

    // Message Logs
    console.log(`[${new Date(Date.now()).toLocaleString()}] ${dc_msg.guild.id} - ${dc_msg.member.user.tag}: ${dc_msg}`);

    // Message Guards
    if (dc_msg.author.bot) return;
    var dc_args = await dc_msg.content.split(/\s+/g);

    // Switch Code

    switch (dc_args[0]) {
        case `${config.bot_config.prefix}color`:
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

        case `${config.bot_config.prefix}exec`:
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.owner_commands_loader.bash_execute(obj_sub)
            break;

        case (`${config.bot_config.prefix}cat`):
        case (`${config.bot_config.prefix}dog`):
        case (`${config.bot_config.prefix}fox`):
            obj_sub = { dc_args: dc_args, dc_msg: dc_msg }
            module_index.image_loader.animals(obj_sub)
            break;
    };


});
dc_client.login(config.bot_config.token);