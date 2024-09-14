const { SlashCommandSubcommandBuilder, SlashCommandStringOption } = require('discord.js')
const Wrapper = require('../util/Wrapper')
const { EmbedBuilder } = require('@discordjs/builders')
const config = require('../config.json')

module.exports = {
    data: {
        name: 'base64',
        description: 'Base64 encode/decode a string.',
        type: Wrapper.SlashCommand.Type.SLASH_COMMAND,
        integration_types: [Wrapper.IntegrationType.USER],
        options: [
            new SlashCommandSubcommandBuilder()
                .setName("encode")
                .setDescription('Encode a string')
                .addStringOption(new SlashCommandStringOption()
                    .setName('input')
                    .setDescription('input')
                    .setMinLength(1)
                    .setMaxLength(2000)
                    .setRequired(true)),
            new SlashCommandSubcommandBuilder()
                .setName("decode")
                .setDescription('Decode a string')
                .addStringOption(new SlashCommandStringOption()
                    .setName('input')
                    .setDescription('input')
                    .setMinLength(1)
                    .setMaxLength(2000)
                    .setRequired(true))
        ]
    },

    /**
     * 
     * @param {import("discord.js").Interaction} interaction
     */
    execute (interaction) {
        const options = interaction.options
        const input = options.getString('input')
        
        try {
            const output = options.getSubcommand() == 'encode' ? btoa(input) : atob(input)
            
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Result")
                        .addFields(
                            {
                                name: 'Output',
                                value: `\`\`\`\n${output}\n\`\`\``
                            }
                        )
                        .setColor(parseInt(config.colors.primary))
                ]
            })
        } catch {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("Error")
                        .setDescription('Invalid base64!')
                        .setColor(parseInt(config.colors.error))
                ]
            })
        }
    }
}