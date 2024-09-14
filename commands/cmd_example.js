const Wrapper = require('../util/Wrapper')

module.exports = {
    data: {
        name: 'example',
        description: 'Just an example command.',
        type: Wrapper.SlashCommand.Type.SLASH_COMMAND,
        integration_types: [Wrapper.IntegrationType.USER]
    },

    /**
     * 
     * @param {import("discord.js").Interaction} interaction
     */
    execute (interaction) {
        interaction.reply( { content: 'Hello, world! `aaa\'s userapp base v1` test' } )
    }
}