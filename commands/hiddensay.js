const { SlashCommandStringOption } = require('discord.js')
const Wrapper = require('../util/Wrapper')

module.exports = {
    data: {
        name: 'hiddensay',
        description: 'Say something secretly. requested by Romnci',
        type: Wrapper.SlashCommand.Type.SLASH_COMMAND,
        integration_types: [Wrapper.IntegrationType.USER],
        options: [
            new SlashCommandStringOption()
                .setName('message')
                .setDescription('The message.')
                .setMinLength(1)
                .setMaxLength(2000)
                .setRequired(true)
        ]
    },

    /**
     * 
     * @param {import("discord.js").Interaction} interaction
     */
    execute (interaction) {
        interaction.reply({
            content : '\u200b',
            ephemeral: true
        }).then(() => {
            interaction.followUp(interaction.options.getString('message'))
            interaction.deleteReply()
        })
    }
}