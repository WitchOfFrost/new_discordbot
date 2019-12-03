module.exports.ping = function(obj_sub) {

    let ping_color;
    let current_ping = Math.floor(obj_sub.dc_client.ping);

    if (current_ping < 150) {
        ping_color = 10868391
    } else if (current_ping >= 150 && current_ping <= 200) {
        ping_color = 16773494
    } else {
        ping_color = 16740419
    };

    obj_sub.dc_msg.channel.send({ embed: { color: ping_color, title: "Your Ping:", description: `${current_ping}ms` } });


};

module.exports.color = async function(obj_sub) {

    if (obj_sub.dc_args[1] == null) {
        var newcolor = Math.floor(Math.random() * 16777215).toString(16)
    } else {
        var newcolor = obj_sub.dc_args[1]
    }
    let stringint = await parseInt(newcolor, 16)
    if (obj_sub.dc_msg.guild.me.hasPermission("MANAGE_ROLES") || obj_sub.dc_msg.guild.me.hasPermission("ADMINISTRATOR")) {
        if (obj_sub.dc_msg.member.hasPermission("ADMINISTRATOR") || obj_sub.dc_msg.guild.roles.find('name', "Color") != null) {
            console.log(obj_sub.dc_msg.member.colorRole.position)

            if (obj_sub.dc_msg.guild.roles.find('name', obj_sub.dc_msg.member.user.id) == null) {
                let role = await obj_sub.dc_msg.guild.createRole({ name: obj_sub.dc_msg.member.user.id, permissions: 0, mentionable: false, position: obj_sub.dc_msg.member.colorRole.position, color: newcolor }, "New Color Role").catch(err => { obj_sub.dc_msg.channel.send("Something went wrong!") })
                obj_sub.dc_msg.channel.send({ embed: { author: { name: obj_sub.dc_msg.member.user.tag, icon_url: obj_sub.dc_msg.member.user.avatarURL }, description: `Set your color to **${newcolor}**`, color: stringint, } })
                obj_sub.dc_msg.member.addRole(role)
            } else {
                obj_sub.dc_msg.guild.roles.find("name", obj_sub.dc_msg.member.user.id).setColor(newcolor).catch(err => {})

                if (obj_sub.dc_msg.member.colorRole.position != obj_sub.dc_msg.guild.roles.find("name", obj_sub.dc_msg.member.user.id).position) {
                    obj_sub.dc_msg.guild.roles.find("name", obj_sub.dc_msg.member.user.id).setColor(newcolor).catch(err => {})
                    let role = obj_sub.dc_msg.guild.roles.find("name", obj_sub.dc_msg.member.user.id).setPosition(obj_sub.dc_msg.member.colorRole.position).catch(err => { obj_sub.dc_msg.channel.send("Something went wrong!") })
                    obj_sub.dc_msg.member.addRole(obj_sub.dc_msg.guild.roles.find("name", obj_sub.dc_msg.member.user.id))
                }
                obj_sub.dc_msg.channel.send({ embed: { author: { name: obj_sub.dc_msg.member.user.tag, icon_url: obj_sub.dc_msg.member.user.avatarURL }, description: `Set your color to **${newcolor}**`, color: stringint, } })
            }
        } else { obj_sub.dc_msg.channel.send("You need either Administrator permission or a role named 'Color' to use the Color Command.") }
    } else { obj_sub.dc_msg.channel.send("I don't have Manage Roles permission!") }
};