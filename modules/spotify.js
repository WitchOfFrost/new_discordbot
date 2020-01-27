const config = require('./../config.json');
const axios = require('axios');
const module_index = require('./../module_index.js');
var spotify_api;

function refreshSpotifyToken() {
    console.log("Refreshing Spotify Token\n");
    axios({
        url: "https://accounts.spotify.com/api/token",
        method: "post",
        params: {
            grant_type: "client_credentials"
        },
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
            username: `${config.api_config.spotify.client_id}`,
            password: `${config.api_config.spotify.client_secret}`
        }
    }).then(data => {
        console.log("Changing Spotify auth token \n");
        spotify_token = data.data.access_token;
        spotify_api.defaults.headers['Authorization'] = 'Bearer ' + spotify_token;
        setTimeout(refreshSpotifyToken, 29 * 60 * 1000);
    }).catch(err => {
        console.log(err);
    })
};
refreshSpotifyToken();

let sent_embed
let i = 0
var spotify_token;
spotify_api = axios.create({ baseURL: 'https://api.spotify.com/v1/', headers: { 'Authorization': 'Bearer ' + spotify_token }, json: true });

module.exports.main = async function(obj_sub) {
    switch (obj_sub.dc_args[1]) {
        case "search":
            obj_sub.start_arg = 2;
            await search_func(obj_sub);
            break;

        case undefined:
            obj_sub.dc_msg.channel.send({
                embed: {
                    title: "An error occured!",
                    description: `Missing Argument, please add atleast one Search term!`,
                    color: 16741235
                }
            });
            break;

        default:
            obj_sub.start_arg = 1;
            await search_func(obj_sub);
            break;
    };

    async function search_func(obj_sub) {
        let searches = [spotify_api.get(`search?q=${obj_sub.dc_args.slice(obj_sub.start_arg).join(" ")}&type=album,artist,playlist,track&limit=5`)]
        let search_result = await Promise.all(searches)
            .catch(error => {
                obj_sub.error_status = error.response.data.error.status;
                obj_sub.error_message = error.response.data.error.message;
                module_index.error_handler.main(obj_sub)
                throw error;
            });


        let content_type = "Track"

        async function message_creator() {

            obj_sub.embed_data = {
                embed: {
                    title: `Top 5 Results for ${content_type}s searching ${obj_sub.dc_args.slice(obj_sub.start_arg).join(" ")}`,
                    color: 1947988,
                    thumbnail: { url: "" }
                }
            };


            switch (content_type) {
                case "Album":
                    await album_field_creator(obj_sub);
                    break;
                case "Artist":
                    await artist_field_creator(obj_sub);
                    break;
                case "Playlist":
                    await playlist_field_creator(obj_sub);
                    break;
                case "Track":
                    await track_field_creator(obj_sub);
                    break;
            };

            async function album_field_creator(obj_sub) {
                obj_sub.field_data = ""
                await search_result[0].data.albums.items.forEach((item, field_number) => {
                    if (field_number <= 5) {
                        obj_sub.field_data += `Name: ** ${item.name}** ✦ Artist: [** ${item.artists[0].name} **](${item.artists[0].external_urls.spotify}) ✦[** Album Link **](${item.artists[0].external_urls.spotify}) \n`
                    };
                });
                obj_sub.embed_data.embed.thumbnail.url = search_result[0].data.albums.items[0].images[0].url
                obj_sub.embed_data.embed.description = obj_sub.field_data;
                react_listener(obj_sub);
            };

            async function artist_field_creator(obj_sub) {

                if (search_result[0].data.artists.genres == undefined) {
                    obj_sub.genres_switch = "n/a"
                } else {
                    obj_sub.genres_switch = search_result[0].data.artists.genres.join(", ")
                }

                obj_sub.field_data = ""
                await search_result[0].data.playlists.items.forEach((item, field_number) => {
                    if (field_number <= 5) {
                        obj_sub.field_data += `Name: **${item.name}** ✦ Genres: **${obj_sub.genres_switch}** ✦[** Artist Profile **](${item.external_urls.spotify}) \n`
                    };
                });
                obj_sub.embed_data.embed.thumbnail.url = search_result[0].data.artists.items[0].images[0].url
                obj_sub.embed_data.embed.description = obj_sub.field_data;

                await react_listener(obj_sub);
            };

            async function playlist_field_creator(obj_sub) {
                obj_sub.field_data = ""
                await search_result[0].data.playlists.items.forEach((item, field_number) => {
                    if (field_number <= 5) {
                        obj_sub.field_data += `Name: ** ${item.name}** ✦ Tracks: ** ${item.tracks.total}** ✦ Owner: [** ${item.owner.display_name} **](${item.owner.external_urls.spotify}) ✦[** Playlist Link **](${item.external_urls.spotify}) \n`
                    };
                });
                obj_sub.embed_data.embed.thumbnail.url = search_result[0].data.playlists.items[0].images[0].url
                obj_sub.embed_data.embed.description = obj_sub.field_data;

                await react_listener(obj_sub);
            };

            async function track_field_creator(obj_sub) {
                obj_sub.field_data = ""
                await search_result[0].data.tracks.items.forEach((item, field_number) => {
                    if (field_number <= 5) {
                        obj_sub.field_data += `Name: ** ${item.name}** ✦ Artist: [** ${item.artists[0].name} **](${item.artists[0].external_urls.spotify}) ✦[** Track Link **](${item.external_urls.spotify}) \n`
                    };
                });
                obj_sub.embed_data.embed.thumbnail.url = search_result[0].data.tracks.items[0].album.images[0].url
                obj_sub.embed_data.embed.description = obj_sub.field_data;

                await react_listener(obj_sub);
            };

            async function react_listener(obj_sub) {



                if (i == 0) {
                    sent_embed = await obj_sub.dc_msg.channel.send(obj_sub.embed_data);
                    i++
                } else {
                    sent_embed.edit(obj_sub.embed_data)
                }

                sent_embed.react('💿')
                    .then(() => sent_embed.react('🎤'))
                    .then(() => sent_embed.react('🎵'))
                    .then(() => sent_embed.react('🗒️'))
                    .then(() => sent_embed.react('❌'));

                let reaction_filter = (reaction, user) => {
                    return ['💿', '🎤', '🎵', '🗒️', '❌'].includes(reaction.emoji.name) && user.id === obj_sub.dc_msg.author.id;
                }

                sent_embed.createReactionCollector(reaction_filter, { time: 60000, max: 1 })
                    .on('collect', async user_reaction => {
                        switch (user_reaction.emoji.name) {
                            case '💿':
                                content_type = "Album"
                                await message_creator(obj_sub)
                                user_reaction.remove(obj_sub.dc_msg.author.id);
                                break;
                            case '🎤':
                                content_type = "Artist"
                                await message_creator(obj_sub)
                                user_reaction.remove(obj_sub.dc_msg.author.id);
                                break;
                            case '🎵':
                                content_type = "Track"
                                await message_creator(obj_sub)
                                user_reaction.remove(obj_sub.dc_msg.author.id);
                                break;
                            case '🗒️':
                                content_type = "Playlist"
                                await message_creator(obj_sub)
                                user_reaction.remove(obj_sub.dc_msg.author.id);
                                break;
                            case '❌':
                                sent_embed.delete().catch(err => { throw err; });
                                break;
                        };
                    });


            };
        };
        if (i == 0) {
            message_creator()
        }
    };
};