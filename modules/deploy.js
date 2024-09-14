const { Client, InteractionType, EmbedBuilder } = require("discord.js")
const config = require('../config.json')
const api = require('../api')
const path = require('path')
const fs = require('fs')

/**
 * 
 * @param {Client} bot 
 */
module.exports = (bot) => {
    
    const commands = fs.readdirSync(path.join(__dirname, '..', 'commands'))

    const realCommands = new Map()

    commands.forEach(name => {
        const command = require(`../commands/${name}`)

        command.data['contexts'] = [0, 1, 2]

        if(!command?.interactComponent) command.interactComponent = () => {}

        realCommands.set(command.data.name, command)
    })

    registerCommands()

    /**
     * 
     * @param {*} command 
     */

    async function registerCommands() {
        const commands = []

        realCommands.forEach(command => {
            commands.push(command.data)
        })

        const res = await api(`applications/${config.application_id}/commands`, {
            method: 'PUT',
            body: commands
        })

        console.log(`[userbase/v1.0] Slash command status ~ ` + res.ok)
    }

    bot.on('interactionCreate', async function (interaction) {
        if(interaction.type === InteractionType.MessageComponent) {
            realCommands.forEach(command => {
                command.interactComponent(interaction)
            })
        }

        if (interaction.type === InteractionType.ApplicationCommand) {
            const name = interaction.commandName

            try {
                const command = realCommands.get(name)

                if(!command) throw new Error('Command doesn\'t exist.');
    
                await realCommands.get(name).execute(interaction)
            } catch (e) {
                const thing = '```'

                const embed = new EmbedBuilder()
                    .setTitle(e.name)
                    .setDescription(`${thing}ansi\n\x1b[31m${e}\n${thing}`)
                    .setTimestamp();

                interaction.reply({ embeds: [ embed ]})
            }
        }
    })
}