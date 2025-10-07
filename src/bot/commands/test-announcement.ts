import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ButtonStyle,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { PublicMessageComponents } from "../../components/public-messages";
import { CallbackManager } from "../../components/callbacks";

class TestAnnouncementCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-announcement")
    .setDescription("Creates a public announcement with buttons and menu");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    this.registerCallbacks();

    const announcement = PublicMessageComponents.createPublicMessage({
      embed: {
        title: "📢 Server Announcement",
        description: "Important updates and information for all members!",
        color: 0x3498db,
        author: {
          name: client.user?.username || "Bot",
          iconURL: client.user?.displayAvatarURL(),
        },
        fields: [
          { name: "📅 Date", value: `<t:${Math.floor(Date.now() / 1000)}:F>`, inline: true },
          { name: "👥 Audience", value: "All Members", inline: true },
          { name: "📋 Type", value: "General Update", inline: true },
        ],
        footer: {
          text: "Stay informed with the latest updates!",
        },
        timestamp: true,
      },
      buttons: [
        {
          callbackId: "announcement-acknowledge",
          label: "Acknowledge",
          style: ButtonStyle.Success,
          emoji: "✅",
        },
        {
          callbackId: "announcement-questions",
          label: "Ask Questions",
          style: ButtonStyle.Primary,
          emoji: "❓",
        },
        {
          label: "Read More",
          style: ButtonStyle.Link,
          url: "https://discord.js.org",
        },
      ],
      menu: {
        customId: "announcement-menu",
        callbackId: "announcement-menu",
        placeholder: "Select your interest",
        options: [
          { label: "General Updates", value: "general", description: "General server updates", emoji: "📢" },
          { label: "Feature Updates", value: "features", description: "New features and improvements", emoji: "✨" },
          { label: "Bug Fixes", value: "fixes", description: "Bug fixes and patches", emoji: "🐛" },
          { label: "Events", value: "events", description: "Upcoming events and activities", emoji: "🎉" },
        ],
      },
    });

    await interaction.reply(announcement);
  }

  private registerCallbacks() {
    CallbackManager.registerButtonCallback("announcement-acknowledge", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "✅ Acknowledged!",
          description: `${interaction.user.username} has acknowledged the announcement.`,
          color: 0x00ff00,
          timestamp: true,
        },
      });
      await interaction.reply(embed);
    });

    CallbackManager.registerButtonCallback("announcement-questions", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "❓ Questions?",
          description: `${interaction.user.username} has questions about the announcement.\n\nPlease contact the staff team for more information.`,
          color: 0x0099ff,
          timestamp: true,
        },
      });
      await interaction.reply(embed);
    });

    CallbackManager.registerMenuCallback("announcement-menu", async (client, interaction) => {
      const selectedValues = interaction.values;
      const selectedText = selectedValues.map(value => {
        switch(value) {
          case "general": return "General Updates 📢";
          case "features": return "Feature Updates ✨";
          case "fixes": return "Bug Fixes 🐛";
          case "events": return "Events 🎉";
          default: return value;
        }
      }).join(", ");

      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "🎯 Interest Selected!",
          description: `${interaction.user.username} is interested in: **${selectedText}**\n\nWe'll keep you updated on these topics!`,
          color: 0x9932cc,
          fields: [
            { name: "👤 User", value: interaction.user.username, inline: true },
            { name: "🎯 Interest", value: selectedText, inline: true },
          ],
          timestamp: true,
        },
      });
      await interaction.reply(embed);
    });
  }
}

export default new TestAnnouncementCommand();
