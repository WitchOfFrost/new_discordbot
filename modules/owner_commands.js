const config = require('./../config.json')

module.exports.bash_execute = async function (obj_sub) {
    if (obj_sub.dc_msg.member.id == config.bot_config.owner) {
        var exec = require('child_process').exec
        async function puts(err, stdout, stderr) {
            console.log(err)
            console.log(stderr)
            console.log(stdout)

            if (err == null) {
                obj_sub.dc_msg.channel.send("```bash\n" + stdout + "```")
            } else {
                obj_sub.dc_msg.channel.send("```bash\n" + err + "```")
            }
        }
        await exec(`${obj_sub.dc_args.slice(1).join(" ")}`, puts).catch(err => { console.log(err) })
    }
}

module.exports.owner_config = async function (obj_sub) {
    if (obj_sub.dc_msg.member.id == config.bot_config.owner) {
        var fs = require('fs');
        var fileName = './config.json'
        var file = require('./../config.json');

        if (config.bot_config.allow_edit == "true") {
            file[obj_sub.dc_args.slice(1, 2).toString()][obj_sub.dc_args.slice(2, 3).toString()] = obj_sub.dc_args.slice(3, 4).toString();

            fs.writeFile(fileName, JSON.stringify(file), function (err) {
                if (err) return console.log(err);
                obj_sub.dc_msg.channel.send(`Edited config.json, set ${file[obj_sub.dc_args.slice(1, 2).toString()][obj_sub.dc_args.slice(2, 3).toString()]} to ${obj_sub.dc_args.slice(3, 4).toString()}. If this was a mistake, please revert it asap!`)
                console.log('\n\nWriting new config to ' + fileName);
            });
        } else {
            obj_sub.dc_msg.channel.send('This is an advanced configuration utility, its disabled by default. To activate it, please set bot_config.allow_edit to `"true"`. Danger: Please only do this if you know what you are doing!')
        }


    }
}