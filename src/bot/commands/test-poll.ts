import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ButtonStyle,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { PublicMessageComponents } from "../../components/public-messages";
import { CallbackManager } from "../../components/callbacks";

class TestPollCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-poll")
    .setDescription("Creates a public poll with voting buttons");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    this.registerCallbacks();

    const poll = PublicMessageComponents.createPublicMessage({
      embed: {
        title: "📊 Community Poll",
        description: "What's your favorite programming language?",
        color: 0x9932cc,
        fields: [
          { name: "📝 Question", value: "What's your favorite programming language?", inline: false },
          { name: "⚙️ Settings", value: "Single choice poll", inline: true },
          { name: "👥 Participants", value: "All members can vote", inline: true },
        ],
        footer: {
          text: "Vote using the buttons below!",
        },
        timestamp: true,
      },
      buttons: [
        {
          callbackId: "poll-javascript",
          label: "JavaScript",
          style: ButtonStyle.Primary,
          emoji: "🟨",
        },
        {
          callbackId: "poll-python",
          label: "Python",
          style: ButtonStyle.Success,
          emoji: "🐍",
        },
        {
          callbackId: "poll-typescript",
          label: "TypeScript",
          style: ButtonStyle.Primary,
          emoji: "🔷",
        },
        {
          callbackId: "poll-rust",
          label: "Rust",
          style: ButtonStyle.Danger,
          emoji: "🦀",
        },
        {
          callbackId: "poll-other",
          label: "Other",
          style: ButtonStyle.Secondary,
          emoji: "❓",
        },
      ],
    });

    await interaction.reply(poll);
  }

  private registerCallbacks() {
    const languages = {
      "poll-javascript": "JavaScript 🟨",
      "poll-python": "Python 🐍",
      "poll-typescript": "TypeScript 🔷",
      "poll-rust": "Rust 🦀",
      "poll-other": "Other ❓",
    };

    Object.entries(languages).forEach(([callbackId, languageName]) => {
      CallbackManager.registerButtonCallback(callbackId, async (client, interaction) => {
        const embed = PublicMessageComponents.createPublicMessage({
          embed: {
            title: "🗳️ Vote Recorded!",
            description: `${interaction.user.username} voted for **${languageName}**!`,
            color: 0x00ff00,
            fields: [
              { name: "👤 Voter", value: interaction.user.username, inline: true },
              { name: "🎯 Choice", value: languageName, inline: true },
              { name: "📊 Status", value: "Vote recorded successfully", inline: true },
            ],
            timestamp: true,
          },
        });
        await interaction.reply(embed);
      });
    });
  }
}

export default new TestPollCommand();
