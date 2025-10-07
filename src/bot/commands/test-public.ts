import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ButtonStyle,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { PublicMessageComponents } from "../../components/public-messages";
import { CallbackManager } from "../../components/callbacks";

class TestPublicCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-public")
    .setDescription("Sends a public message with buttons that everyone can see");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    // Register callbacks for this command
    this.registerCallbacks();

    // Create a public announcement with buttons and menu
    const publicMessage = PublicMessageComponents.createPublicMessage({
      embed: {
        title: "🚀 Public Test Message",
        description: "This message is visible to everyone in the channel! You can interact with the buttons and menu below.",
        color: 0x9932cc,
        fields: [
          { name: "✨ Feature", value: "Public Messages", inline: true },
          { name: "🎯 Status", value: "Working!", inline: true },
          { name: "👥 Visibility", value: "Everyone can see this", inline: true },
        ],
        footer: {
          text: "Try the buttons and menu below!",
        },
        timestamp: true,
      },
      buttons: [
        {
          callbackId: "public-like",
          label: "Like",
          style: ButtonStyle.Success,
          emoji: "👍",
        },
        {
          callbackId: "public-dislike",
          label: "Dislike",
          style: ButtonStyle.Danger,
          emoji: "👎",
        },
        {
          callbackId: "public-info",
          label: "More Info",
          style: ButtonStyle.Primary,
          emoji: "ℹ️",
        },
        {
          label: "Visit Website",
          style: ButtonStyle.Link,
          url: "https://discord.js.org",
        },
      ],
      menu: {
        customId: "public-menu",
        callbackId: "public-menu",
        placeholder: "Choose an option",
        options: [
          { label: "Option A", value: "a", description: "First option", emoji: "🔵" },
          { label: "Option B", value: "b", description: "Second option", emoji: "🟢" },
          { label: "Option C", value: "c", description: "Third option", emoji: "🔴" },
          { label: "Option D", value: "d", description: "Fourth option", emoji: "🟡" },
        ],
      },
    });

    // Send the public message (no MessageFlags.Ephemeral)
    await interaction.reply(publicMessage);
  }

  private registerCallbacks() {
    CallbackManager.registerButtonCallback("public-like", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "👍 Thanks for the like!",
          description: `${interaction.user.username} liked this message!`,
          color: 0x00ff00,
          timestamp: true,
        },
      });

      await interaction.reply(embed);
    });

    CallbackManager.registerButtonCallback("public-dislike", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "👎 Thanks for the feedback!",
          description: `${interaction.user.username} disliked this message. We'll work to improve!`,
          color: 0xff0000,
          timestamp: true,
        },
      });

      await interaction.reply(embed);
    });

    CallbackManager.registerButtonCallback("public-info", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "ℹ️ More Information",
          description: "This is a public message system that allows everyone to see and interact with the content!",
          color: 0x0099ff,
          fields: [
            { name: "🔧 Technology", value: "Discord.js + TypeScript", inline: true },
            { name: "🎨 Components", value: "Reusable & Configurable", inline: true },
            { name: "⚡ Performance", value: "Fast & Efficient", inline: true },
          ],
          timestamp: true,
        },
      });

      await interaction.reply(embed);
    });

    // Register menu callback
    CallbackManager.registerMenuCallback("public-menu", async (client, interaction) => {
      const selectedValues = interaction.values;
      const selectedText = selectedValues.map(value => {
        switch(value) {
          case "a": return "Option A 🔵";
          case "b": return "Option B 🟢";
          case "c": return "Option C 🔴";
          case "d": return "Option D 🟡";
          default: return value;
        }
      }).join(", ");

      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "🎯 Menu Selection!",
          description: `${interaction.user.username} selected: **${selectedText}**\n\nThis menu was handled by a callback function!`,
          color: 0x9932cc,
          fields: [
            { name: "👤 User", value: interaction.user.username, inline: true },
            { name: "🎯 Selection", value: selectedText, inline: true },
            { name: "⚡ Status", value: "Success!", inline: true },
          ],
          timestamp: true,
        },
      });

      await interaction.reply(embed);
    });
  }
}

export default new TestPublicCommand();
