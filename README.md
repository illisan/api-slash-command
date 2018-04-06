# Building a custom slash command with Slack Web API

A slash command allows your team members to interact with slack. Essentially, they are messages that trigger and event.
They must begin with a /, slack has some slash commands already built it, which are pretty neat to play with. With a
slack app you're able to create your own commands and have tailor the response in a plethora of ways. This slash command
will ask you how you're feeling when the command /batmood is sent. 

1. Create a Slack App if you haven't already. 
2. In the Auth and Permissions section take note of the credentials, Client token, id and secret. You will need all three for this app. 
3. Take a look at the dependencies, will be using one called Botkit. 
4. `npm install localtunnel` in order for the slash command to work, we need a secure local server. 
5. Create a custom url with the command `lt --port 8765 --subdomain myslashcommand`
6. The URL for this app is running on https://testcommand.localtunnel.me
7. You'll need to inform slack about this URL since it will be recieving the requests. 
8. Setup your slash command and run it with 
`CLIENT_ID=xxx.yyy CLIENT_SECRET=abc VERIFICATION_TOKEN=123 PORT=8765 npm start`
* You'll need to rerun the command above whenever you make changes to your code. 

Once  you have the local tunnel running and the credentials have been verified, you'll be able to test the slash command!

This command uses a switch statement to display a few different messages depending on the input. 
The default will say the command is not valid, but the `/batmood` command will run code that will select emojis at 
random and print a string that asks you how you're feeling. Writing `/batmood` followd by the string: "help", will print a brief description about the batmood slash command. 

Check it out: 

![Alt text](/imgs/sample.png?raw=true)

