const json_reload = require('self-reload-json');
var schedule = new json_reload('./gdq.json');
const config = require('./../config.json');
const module_index = require("./../module_index.js");

module.exports.main = async function(obj_sub) {

    switch (obj_sub.dc_args[1]) {
        case (obj_sub.dc_args[1] = `next`):
            next(obj_sub);
            break;
        case (obj_sub.dc_args[1] = `schedule`):
            schedule(obj_sub);
            break;
        case (obj_sub.dc_args[1] = undefined):
            undefined_func(obj_sub);
            break;

    };

    async function next(obj_sub) {
        let get_date = new Date().toLocaleTimeString()

        await Object.keys(schedule.agdq2020).some(async key => {
            let parsed_date = await new Date(key)
            parsed_date = await parsed_date.setDate(parsed_date.getDate())
            if (parsed_date < get_date) {} else {
                await Object.keys(schedule.agdq2020[key]).some(async key1 => {
                    let time_hr = await get_date.toString().slice(16, 18)
                    let time_min = await get_date.toString().slice(19, 21)
                    if (time_hr < key1.slice(0, 2)) {
                        if (time_min < key1.slice(3, 5)) {
                            obj_sub.dc_msg.channel.send({
                                embed: {
                                    title: "Next up:",
                                    description: `**${schedule.agdq2020[key][key1].title}**\n\n\n**Start Time:** ${key1.slice(0, 2)}:${key1.slice(3, 5)}\n\n**Length:** ${schedule.agdq2020[key][key1].length}\n\n**Setup:** ${schedule.agdq2020[key][key1].setup}\n\n**Runner:** ${schedule.agdq2020[key][key1].runner}\n\n**Host:** ${schedule.agdq2020[key][key1].host}`,
                                    color: 44783,
                                    thumbnail: {
                                        url: "https://respek.de/umi.png"
                                    },
                                    footer: {
                                        text: "Awesome Games Done Quick 2020 | 05.01 - 12.01"
                                    },
                                }
                            })
                            return;
                        } else {}
                    } else {}
                })
                return;
            }
        })
    }
};

async function schedule(obj_sub) {
    let get_date = new Date().toLocaleTimeString()

    await Object.keys(schedule.agdq2020).some(async key => {
        let parsed_date = await new Date(key)
        parsed_date = await parsed_date.setDate(parsed_date.getDate())
        if (parsed_date < get_date) {} else {
            await Object.keys(schedule.agdq2020[key]).some(async key1 => {
                let time_hr = await get_date.toString().slice(16, 18)
                let time_min = await get_date.toString().slice(19, 21)
                if (time_hr < key1.slice(0, 2)) {
                    if (time_min < key1.slice(3, 5)) {
                        obj_sub.dc_msg.channel.send({
                            embed: {
                                title: "Next up:",
                                description: `**${schedule.agdq2020[key][key1].title}**\n\n\n**Start Time:** ${key1.slice(0, 2)}:${key1.slice(3, 5)}\n\n**Length:** ${schedule.agdq2020[key][key1].length}\n\n**Setup:** ${schedule.agdq2020[key][key1].setup}\n\n**Runner:** ${schedule.agdq2020[key][key1].runner}\n\n**Host:** ${schedule.agdq2020[key][key1].host}`,
                                color: 44783,
                                thumbnail: {
                                    url: "https://respek.de/umi.png"
                                },
                                footer: {
                                    text: "Awesome Games Done Quick 2020 | 05.01 - 12.01"
                                },
                            }
                        })
                        return;
                    } else {}
                } else {}
            })
            return;
        }
    })
};

async function undefined_func(obj_sub) {
    obj_sub.dc_msg.channel.send({
        embed: {
            title: "Error: No argument given!",
            description: 'For a list of arguments, use `' + config.bot_config.prefix + 'help agdq/sgdq`!',
            color: 44783,
            thumbnail: {
                url: "https://respek.de/umi.png"
            },
            footer: {
                text: "Awesome Games Done Quick 2020 | 05.01 - 12.01"
            },
        }
    })
};