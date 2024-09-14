const config = require('./config.json')
const djs = require('discord.js')

const client = new djs.Client({
    intents: ["Guilds", "GuildMessages", "MessageContent"]
})

client.commands = new Map()

require('./modules/deploy')(client)

client.login(config.token)

process.on('uncaughtException', (err) => {
    console.log(`[userbase/v1.0] [${err.name}] ${err.stack}`)
})