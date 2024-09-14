const Wrapper = require('../util/Wrapper')

module.exports = {
    data: {
        name: 'rate (gay)',
        type: Wrapper.SlashCommand.Type.APPLICATION,
        integration_types: [Wrapper.IntegrationType.USER]
    },

    /**
     * 
     * @param {import("discord.js").Interaction} interaction
     */
    execute (interaction) {
        const random = Math.floor(Math.random() * 101)
        
        interaction.reply(`<@${interaction.targetId}> is ${random}% gay`)
    }
}