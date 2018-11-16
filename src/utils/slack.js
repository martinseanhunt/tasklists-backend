const { WebClient, RTMClient } = require('@slack/client')

const token = process.env.SLACK_TOKEN
const botToken = process.env.SLACK_BOT_TOKEN

const web = new WebClient(token)
const webBot = new WebClient(botToken)
const rtm = new RTMClient(botToken)
rtm.start()

module.exports.sendSlackDM = (slackID, message) => {
  // using the web api as the bot to get the users / bot DM ID
  webBot.im.open({ user: slackID })
  .then(res => {
    rtm.sendMessage(message, res.channel.id)
      .then((result) => {
        // `res` contains information about the posted message
        console.log('Message sent: ', result.ts)
      })
      .catch(console.error)
  })
  .catch(console.error)
}

/* using web client - posts in slackbot channel rather than as the app bot

  // See: https://api.slack.com/methods/chat.postMessage
  web.chat.postMessage({ channel: slackID, text: message })
  .then((res) => {
    // `res` contains information about the posted message
    console.log('Message sent: ', res.ts)
  })
  .catch(console.error)

*/