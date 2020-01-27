module.exports.main = async function(obj_sub) {

    var error_code;
    var error_message;


    switch (obj_sub.error_status) {
        case (404):
            error_code = 404
            error_message = "Not Found!"
            break;
        case (400):
            error_code = 400
            error_message = "Bad request, please contact a developer!"
            break;
    }


    obj_sub.dc_msg.channel.send({
        embed: {
            title: "An error occured!",
            description: `Error **${error_code}**: ${error_message}`,
            color: 16741235
        }
    })

};