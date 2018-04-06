
let Botkit = require('botkit');


// conditional to ensure authentication is properly processed, if any of the values are false, display error.
if (!process.env.CLIENT_ID || !process.env.CLIENT_SECRET || !process.env.PORT || !process.env.VERIFICATION_TOKEN) {
    console.log('Error: Specify CLIENT_ID, CLIENT_SECRET, VERIFICATION_TOKEN and PORT in environment');
    process.exit(1);
}


//configuration of settings, dection and storage of channels, teams and users.
let config = {}
if (process.env.MONGOLAB_URI) {
    let BotkitStorage = require('botkit-storage-mongo')
    config = {
        storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
    };
} else {
    config = {
        json_file_store: './db_slackbutton_slash_command/',
    }
}


// objected stored in controller variable to manage the the requests coming in from the created slack app.
// slack app hold details and credentials that must all be true in order for requests to be successfull.
let controller = Botkit.slackbot(config).configureSlackApp(
    {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        scopes: ['commands'],
    }
)

//verfying the authentication of the app creator, ensure the creator has acccess to the created app before proceeding.
controller.setupWebserver(process.env.PORT, function (err, webserver) {
    controller.createWebhookEndpoints(controller.webserver)

    controller.createOauthEndpoints(controller.webserver, function (err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err)
        } else {
            res.send('Success!');
        }
    })
})

// Switch statement to handel the user input variations, using conditionals to print corresponding reply to the provided command.
controller.on('slash_command', function (slashCommand, message) {

    switch (message.command) {
        case "/batmood": //handle the `/batmood` slash command.

            // Ensuring the token matches. 
            if (message.token !== process.env.VERIFICATION_TOKEN) return; // if verification token is invalid, ignore command.

            if (message.text === "") {
                moodmoji = [":simple_smile:", ":blush:", ":relaxed:",":stuck_out_tongue_winking_eye:", 
                ":grin:", ":sleeping:", ":worried:",":relieved:", 
                ":wink:", ":anguished:", ":confused:",":hushed:", 
                ":unamused:", ":expressionless:", ":weary:",":confounded:", 
                ":cold_sweat:", ":fearful:", ":cry:", ":rage:",":neutral_face:", 
                ":sob:", ":scream:", ":tired_face:", ":mask:",":sunglasses:", 
                ":heart_eyes:", ":pensive:", ":joy:", ":persevere:", ":innocent:",":no_mouth:", 
                ":thumbsup:", ":thumbsdown:", ":fire:",":raised_hands:", 
                ":muscle:"];
                let mood1 = moodmoji[Math.floor(Math.random() * moodmoji.length)]; //emoji randomizer
                slashCommand.replyPublic(message, "Hello " + message.user + " are you feeling " + mood1 + " today?"); //prints a random moodmoji
            }

            // if command is followed with the string "help" the reply will print out brief instructions and description of slash command.
            if (message.text === "help") {
                slashCommand.replyPublic(message, "the batmood slash command is a caring command that asks you how you're feeling :open_mouth:" +
                " Becuase even Batman has feelings. Just type `/batmood`" )
            }

            break;
        default:
            slashCommand.replyPublic(message, "Apologies " + message.user + //if command is invlaid, reply will print out the following:
                ",command does not exist. :robot_face:");

    }

})
;
