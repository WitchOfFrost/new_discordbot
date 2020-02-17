const json_reload = require('self-reload-json');
var strings = new json_reload("./strings.json");
const config = require('./../config.json');
const module_index = require("./../module_index.js")

module.exports.help = async function (obj_sub) {

    switch (obj_sub.dc_args[1]) {
        default:
            embed_data_help = {
                embed: {
                    title: strings.help_strings.help_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.help_desc)
                }
            }
            break;
        case "ping":
            embed_data_help = {
                embed: {
                    title: strings.help_strings.ping_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.ping_desc)
                }
            }
            break;
        case "color":
            embed_data_help = {
                embed: {
                    title: strings.help_strings.color_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.color_desc)
                }
            }
            break;
        case ("cat"):
        case ("dog"):
        case ("fox"):
            embed_data_help = {
                embed: {
                    title: strings.help_strings.animal_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.animal_desc)
                }
            }
            break;
        case (`neko`):
        case (`hug`):
        case (`fluff`):
        case (`wag`):
        case (`kiss`):
        case (`pat`):
        case (`cuddle`):
        case (`poke`):
        case (`wallpaper`):
        case (`gecg`):
        case (`8ball`):
            embed_data_help = {
                embed: {
                    title: strings.help_strings.neko_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.neko_desc)
                }
            }
            break;
        case (`suck`):
            embed_data_help = {
                embed: {
                    title: strings.help_strings.lewdneko_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.lewdneko_desc)
                }
            }
            break;
        case (`agdq`):
        case (`sgdq`):
            embed_data_help = {
                embed: {
                    title: strings.help_strings.agdq_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.agdq_desc),
                    color: 44783,
                    thumbnail: {
                        url: "https://respek.de/umi.png"
                    },
                    footer: {
                        text: "Current event: AGDQ 2020."
                    }
                }
            }
            break;
        case (`urban`):
            embed_data_help = {
                embed: {
                    title: strings.help_strings.urban_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.urban_desc),
                    color: 16576515
                }
            }
            break;
        case (`spotify`):
        case (`s`):
            embed_data_help = {
                embed: {
                    title: strings.help_strings.spotify_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.spotify_desc),
                    color: 1947988
                }
            }
            break;
        case (`twitter`):
        case (`t`):
            embed_data_help = {
                embed: {
                    title: strings.help_strings.twitter_title,
                    description: module_index.globalfunctions_loader.str_replace("%prefix%", config.bot_config.prefix, strings.help_strings.twitter_desc),
                    color: 565481
                }
            }
            break;
    };
    obj_sub.dc_msg.channel.send(embed_data_help);
};

module.exports.commands = async function (obj_sub) {
    obj_sub.dc_msg.channel.send({
        embed: {
            title: strings.command_strings.command_title,
            description: strings.command_strings.command_desc,
            fields: [{
                name: strings.command_strings.utility_title,
                value: strings.command_strings.utility_desc
            },
            {
                name: strings.command_strings.image_title,
                value: strings.command_strings.image_desc
            },
            {
                name: strings.command_strings.nsfw_title,
                value: strings.command_strings.nsfw_desc
            },
            {
                name: strings.command_strings.misc_title,
                value: strings.command_strings.misc_desc
            }
            ]
        }
    });
}