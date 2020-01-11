const config = require('./../config.json');
const axios = require('axios')
const fs = require('fs')

module.exports.main = async function(obj_sub) {

    switch (obj_sub.dc_args[1]) {
        case (obj_sub.dc_args[1] = `next`):
            next(obj_sub);
            break;
        case (obj_sub.dc_args[1] = `current`):
        case (obj_sub.dc_args[1] = `now`):
        case (obj_sub.dc_args[1] = undefined):
            current(obj_sub);
            break;
        case (obj_sub.dc_args[1] = `previous`):
            previous(obj_sub);
            break;
        case (obj_sub.dc_args[1] = `schedule`):
            schedule(obj_sub);
            break;

    };

    async function next(obj_sub) {
        let api = await axios.get("https://horaro.org/-/api/v1/events/agdq/schedules/2020/ticker")
        if (api.data.data.ticker.next == null) {
            obj_sub.dc_msg.channel.send({
                embed: {
                    title: "Event Concluded!",
                    description: `The event has concluded. See you at SGDQ 2020!`,
                    color: 44783,
                    thumbnail: {
                        url: "https://respek.de/gfg.png"
                    },
                    footer: {
                        text: "Summer Games Done Quick 2020 | 21.06 - 28.06",
                        icon_url: "https://respek.de/j1V.png"
                    },
                }
            })
        } else {
            obj_sub.dc_msg.channel.send({
                embed: {
                    title: "Next up:",
                    description: `**${api.data.data.ticker.next.data[0]} | ${api.data.data.ticker.next.data[3]}**\n\n\n**Start Time:** ${new Date(api.data.data.ticker.next.scheduled).toLocaleString()}\n\n**Length:** ${api.data.data.ticker.next.data[2]}\n\n**Setup:** ${api.data.data.ticker.next.data[5]}\n\n**Runner:** ${api.data.data.ticker.next.data[1]}\n\n**Host:** ${api.data.data.ticker.next.data[4]}`,
                    color: 44783,
                    thumbnail: {
                        url: "https://respek.de/gfg.png"
                    },
                    footer: {
                        text: "Awesome Games Done Quick 2020 | 05.01 - 12.01",
                        icon_url: "https://respek.de/j1V.png"
                    },
                }
            })
        }

    }
}

async function current(obj_sub) {
    let api = await axios.get("https://horaro.org/-/api/v1/events/agdq/schedules/2020/ticker")
    if (api.data.data.ticker.current == null) {
        obj_sub.dc_msg.channel.send({
            embed: {
                title: "Event concluded!",
                description: `The event has concluded. See you at SGDQ 2020!`,
                color: 44783,
                thumbnail: {
                    url: "https://respek.de/gfg.png"
                },
                footer: {
                    text: "Summer Games Done Quick 2020 | 21.06 - 28.06",
                    icon_url: "https://respek.de/j1V.png"
                },
            }
        })
    } else {
        obj_sub.dc_msg.channel.send({
            embed: {
                title: "Current event:",
                description: `**${api.data.data.ticker.current.data[0]} | ${api.data.data.ticker.current.data[3]}**\n\n\n**Start Time:** ${new Date(api.data.data.ticker.current.scheduled).toLocaleString()}\n\n**Length:** ${api.data.data.ticker.current.data[2]}\n\n**Setup:** ${api.data.data.ticker.current.data[5]}\n\n**Runner:** ${api.data.data.ticker.current.data[1]}\n\n**Host:** ${api.data.data.ticker.current.data[4]}`,
                color: 44783,
                thumbnail: {
                    url: "https://respek.de/gfg.png"
                },
                footer: {
                    text: "Awesome Games Done Quick 2020 | 05.01 - 12.01",
                    icon_url: "https://respek.de/j1V.png"
                },
            }
        })
    }
}

async function previous(obj_sub) {
    let api = await axios.get("https://horaro.org/-/api/v1/events/agdq/schedules/2020/ticker")
    if (api.data.data.ticker.previous == null) {
        obj_sub.dc_msg.channel.send({
            embed: {
                title: "The event has concluded!",
                description: `See you at SGDQ 2020!`,
                color: 44783,
                thumbnail: {
                    url: "https://respek.de/gfg.png"
                },
                footer: {
                    text: "Summer Games Done Quick 2020 | 21.06 - 28.06",
                    icon_url: "https://respek.de/j1V.png"
                },
            }
        })
    } else {
        obj_sub.dc_msg.channel.send({
            embed: {
                title: "Previous event:",
                description: `**${api.data.data.ticker.previous.data[0]} | ${api.data.data.ticker.previous.data[3]}**\n\n\n**Start Time:** ${new Date(api.data.data.ticker.previous.scheduled).toLocaleString()}\n\n**Length:** ${api.data.data.ticker.previous.data[2]}\n\n**Setup:** ${api.data.data.ticker.previous.data[5]}\n\n**Runner:** ${api.data.data.ticker.previous.data[1]}\n\n**Host:** ${api.data.data.ticker.previous.data[4]}`,
                color: 44783,
                thumbnail: {
                    url: "https://respek.de/gfg.png"
                },
                footer: {
                    text: "Awesome Games Done Quick 2020 | 05.01 - 12.01",
                    icon_url: "https://respek.de/j1V.png"
                },
            }
        })
    }
}

async function schedule(obj_sub) {
    let api = await axios.get("https://horaro.org/-/api/v1/events/agdq/schedules/2020/ticker")
    if (api.data.data.ticker.current == null) {
        obj_sub.dc_msg.channel.send({
            embed: {
                title: "Event concluded!",
                description: `The event has concluded. See you at SGDQ 2020!\n\n**Searching for the full schedule? You can find it __[HERE](https://gamesdonequick.com/schedule)__**.`,
                color: 44783,
                thumbnail: {
                    url: "https://respek.de/gfg.png"
                },
                footer: {
                    text: "Summer Games Done Quick 2020 | 21.06 - 28.06",
                    icon_url: "https://respek.de/j1V.png"
                },
            }
        })
    } else {
        obj_sub.dc_msg.channel.send({
            embed: {
                title: "Current event:",
                description: `**${api.data.data.ticker.current.data[0]} | ${api.data.data.ticker.current.data[3]}**\n\n\n**Start Time:** ${new Date(api.data.data.ticker.current.scheduled).toLocaleString()}\n\n**Length:** ${api.data.data.ticker.current.data[2]}\n\n**Setup:** ${api.data.data.ticker.current.data[5]}\n\n**Runner:** ${api.data.data.ticker.current.data[1]}\n\n**Host:** ${api.data.data.ticker.current.data[4]}\n\n**Searching for the full schedule? You can find it __[HERE](https://gamesdonequick.com/schedule)__**.`,
                color: 44783,
                thumbnail: {
                    url: "https://respek.de/gfg.png"
                },
                footer: {
                    text: "Awesome Games Done Quick 2020 | 05.01 - 12.01",
                    icon_url: "https://respek.de/j1V.png"
                },
            }
        })
    }
}