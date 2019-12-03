const config = require('./../config.json')

module.exports.bash_execute = async function(obj_sub) {
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