const axios = require('axios');

module.exports.speedrun = async function(obj_sub) {

    let speedrun_api = axios.create({ baseURL: 'https://www.speedrun.com/api/v1', json: false });
    obj_sub.game_id = await speedrun_api.get(`games?name=${obj_sub.dc_args.slice(1).join(" ")}`)
    obj_sub.embed_data = { embed: { description: {}, footer: {} } }
    obj_sub.embed_data1 = { embed: {} }


    obj_sub.game_request = await speedrun_api.get(`games/${obj_sub.game_id.data.data[0].id}/categories`).catch(err => {
        console.log(err.response.data);
        embed_data.embed.title = `Error ${err.response.data.status}`;
        embed_data.embed.description = `${err.response.data.message}`;
        embed_data.embed.color = 16711680;
        obj_sub.dc_msg.channel.send(embed_data);
    });

    let page_current = 0

    function game_page() {
        if (obj_sub.game_request.data.data[page_current] < 0) {
            return;
            page_current++
        } else if (obj_sub.game_request.data.data[page_current] == undefined) {
            return;
            page_current--
        } else if (obj_sub.game_request.data.data[page_current].rules.length > 250) { obj_sub.ruleset_length = `${obj_sub.game_request.data.data[page_current].rules.slice(0,250)} [...]` } else { obj_sub.ruleset_length = obj_sub.game_request.data.data[page_current].rules; };

        obj_sub.embed_data.embed.title = `Speedrun.com page of ${obj_sub.game_id.data.data[0].names.international}`;
        obj_sub.embed_data.embed.url = `${obj_sub.game_request.data.data[page_current].weblink}`;
        obj_sub.embed_data.embed.description = `Run Category: **${obj_sub.game_request.data.data[page_current].name}**\nID: **${obj_sub.game_request.data.data[page_current].id}**\n\nCategory Rules:\n${obj_sub.ruleset_length}`;
        obj_sub.embed_data.embed.footer.text = `Page: ${page_current + 1}`
    }
    game_page(obj_sub)

    async function level_page() {
        let board_request = obj_sub.board_request = await speedrun_api.get(`leaderboards/${obj_sub.game_id.data.data[0].id}/category/${obj_sub.game_request.data.data[page_current].id}`).then(res => { obj_sub.leaderboard_data = res.data }).catch(err => {
            if (err.response.data.status = 400) {
                level_select(obj_sub)
            } else if (err.response.data.status = 404) {
                obj_sub.embed_data1.embed.title = `Error ${err.response.data.status}`;
                obj_sub.embed_data1.embed.description = `${err.response.data.message}`;
                obj_sub.embed_data1.embed.color = 16711680;
                main_embed.edit(obj_sub.embed_data1);
                main_embed.clearReactions();
                main_embed.react('❌');
                let filter_back = (reaction, user) => {
                    return ['❌'].includes(reaction.emoji.name) && user.id === obj_sub.dc_msg.author.id;
                }
                main_embed.createReactionCollector(filter_back, { time: 60000, max: 1 }).on('collect', async user_reaction_back => {
                    switch (user_reaction_back.emoji.name) {
                        case '❌':
                            await game_page(page_current)
                            await main_embed.clearReactions();
                            await main_embed.edit(obj_sub.embed_data);
                            reactions_main(obj_sub);
                            break;
                    }
                })
            }
        })

        if (obj_sub.leaderboard_data != undefined) {
            leaderboard_display(obj_sub)
        }
        async function level_select() {
            let level_request = obj_sub.board_request = await speedrun_api.get(`games/${obj_sub.game_id.data.data[0].id}/levels`)
            console.log(level_request.data)
            obj_sub.embed_data.embed.title = `Please select the level you wish to display:`;
            obj_sub.embed_data.embed.description = `Name: ${level_request.data.data[level_pagenum].name}\nID: ${level_request.data.data[level_pagenum].name}`;
            main_embed.edit(obj_sub.embed_data);
            main_embed.clearReactions();
        }
        async function leaderboard_display() {

        }

    }

    let main_embed = await obj_sub.dc_msg.channel.send(obj_sub.embed_data);

    main_embed.react('◀️').then(() => main_embed.react('▶️')).then(() => main_embed.react('❌')).then(() => main_embed.react('📄'))

    function reactions_main() {
        let filter_main = (reaction, user) => {
            return ['◀️', '▶️', '❌', '📄'].includes(reaction.emoji.name) && user.id === obj_sub.dc_msg.author.id;
        }
        main_embed.createReactionCollector(filter_main, { time: 60000, max: 1 })
            .on('collect', async user_reaction_main => {
                switch (user_reaction_main.emoji.name) {
                    case '▶️':
                        page_current++
                        await game_page(page_current)
                        await main_embed.edit(obj_sub.embed_data)
                        user_reaction_main.remove(obj_sub.dc_msg.author.id)
                        reactions_main(obj_sub)
                        break;

                    case '◀️':
                        page_current--
                        await game_page(page_current)
                        await main_embed.edit(obj_sub.embed_data)
                        user_reaction_main.remove(obj_sub.dc_msg.author.id)
                        reactions_main(obj_sub)
                        break;

                    case '❌':
                        main_embed.delete();
                        break;

                    case '📄':
                        level_page(obj_sub)
                        break;
                }
            })
    }

    function reactions_level() {
        let filter_level = (reaction, user) => {
            return ['◀️', '▶️', '⏫', '❌'].includes(reaction.emoji.name) && user.id === obj_sub.dc_msg.author.id;
        }
        main_embed.createReactionCollector(filter_level, { time: 60000, max: 1 })
            .on('collect', async user_reaction_level => {
                switch (user_reaction_level.emoji.name) {
                    case '▶️':
                        level_pagenum++
                        await game_page(page_current)
                        await main_embed.edit(obj_sub.embed_data)
                        user_reaction_main.remove(obj_sub.dc_msg.author.id)
                        reactions_main(obj_sub)
                        break;

                    case '◀️':
                        page_current--
                        await game_page(page_current)
                        await main_embed.edit(obj_sub.embed_data)
                        user_reaction_main.remove(obj_sub.dc_msg.author.id)
                        reactions_main(obj_sub)
                        break;

                    case '❌':
                        main_embed.delete();
                        break;

                    case '⏫':
                        await game_page(page_current)
                        await main_embed.edit(obj_sub.embed_data)
                        main_embed.clearReactions()
                        main_embed.react('◀️').then(() => main_embed.react('▶️')).then(() => main_embed.react('❌')).then(() => main_embed.react('📄'))
                        reactions_main(obj_sub)
                        break;
                }
            })
    }
    reactions_main(obj_sub)
};