import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ButtonStyle,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { PublicMessageComponents } from "../../components/public-messages";
import { CallbackManager } from "../../components/callbacks";

class TestWelcomeCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-welcome")
    .setDescription("Creates a welcome message with interactive elements");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    this.registerCallbacks();

    const welcome = PublicMessageComponents.createPublicMessage({
      embed: {
        title: "🎉 Welcome to Our Server!",
        description: `Welcome ${interaction.user.username}! We're excited to have you here.`,
        color: 0x00ff00,
        thumbnail: interaction.user.displayAvatarURL(),
        fields: [
          { name: "👤 User", value: interaction.user.username, inline: true },
          { name: "🆔 ID", value: interaction.user.id, inline: true },
          { name: "📅 Joined", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
          { name: "🎯 Next Steps", value: "Read the rules, get roles, and introduce yourself!", inline: false },
        ],
        footer: {
          text: "Enjoy your stay in our community!",
        },
        timestamp: true,
      },
      buttons: [
        {
          callbackId: "welcome-rules",
          label: "Read Rules",
          style: ButtonStyle.Primary,
          emoji: "📋",
        },
        {
          callbackId: "welcome-roles",
          label: "Get Roles",
          style: ButtonStyle.Secondary,
          emoji: "🎭",
        },
        {
          callbackId: "welcome-introduce",
          label: "Introduce Yourself",
          style: ButtonStyle.Success,
          emoji: "👋",
        },
        {
          label: "Support Server",
          style: ButtonStyle.Link,
          url: "https://discord.gg/your-support-server",
        },
      ],
      menu: {
        customId: "welcome-interests",
        callbackId: "welcome-interests",
        placeholder: "What are you interested in?",
        options: [
          { label: "Gaming", value: "gaming", description: "I love gaming", emoji: "🎮" },
          { label: "Programming", value: "programming", description: "I love coding", emoji: "💻" },
          { label: "Music", value: "music", description: "I love music", emoji: "🎵" },
          { label: "Art", value: "art", description: "I love art", emoji: "🎨" },
          { label: "Sports", value: "sports", description: "I love sports", emoji: "⚽" },
          { label: "Technology", value: "tech", description: "I love technology", emoji: "🔧" },
        ],
      },
    });

    await interaction.reply(welcome);
  }

  private registerCallbacks() {
    CallbackManager.registerButtonCallback("welcome-rules", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "📋 Server Rules",
          description: "Please read and follow our server rules:",
          color: 0x0099ff,
          fields: [
            { name: "1️⃣", value: "Be respectful to everyone", inline: false },
            { name: "2️⃣", value: "No spam or excessive self-promotion", inline: false },
            { name: "3️⃣", value: "Keep discussions relevant to the channel", inline: false },
            { name: "4️⃣", value: "Follow Discord's Terms of Service", inline: false },
          ],
          footer: {
            text: "Rules are enforced by our moderation team",
          },
          timestamp: true,
        },
      });
      await interaction.reply(embed);
    });

    CallbackManager.registerButtonCallback("welcome-roles", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "🎭 Available Roles",
          description: "Choose roles that match your interests:",
          color: 0x9932cc,
          fields: [
            { name: "🎮 Gamer", value: "For gaming enthusiasts", inline: true },
            { name: "💻 Developer", value: "For programmers and developers", inline: true },
            { name: "🎵 Music Lover", value: "For music enthusiasts", inline: true },
            { name: "🎨 Artist", value: "For creative individuals", inline: true },
            { name: "⚽ Sports Fan", value: "For sports enthusiasts", inline: true },
            { name: "🔧 Tech Enthusiast", value: "For technology lovers", inline: true },
          ],
          footer: {
            text: "Use the menu below to select your interests!",
          },
          timestamp: true,
        },
      });
      await interaction.reply(embed);
    });

    CallbackManager.registerButtonCallback("welcome-introduce", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "👋 Introduce Yourself!",
          description: `${interaction.user.username} wants to introduce themselves!\n\nHead to the #introductions channel to tell us about yourself.`,
          color: 0x00ff00,
          fields: [
            { name: "💡 Tips", value: "• Tell us your name\n• Share your interests\n• Mention what brought you here", inline: false },
          ],
          footer: {
            text: "We're excited to get to know you!",
          },
          timestamp: true,
        },
      });
      await interaction.reply(embed);
    });

    CallbackManager.registerMenuCallback("welcome-interests", async (client, interaction) => {
      const selectedValues = interaction.values;
      const selectedText = selectedValues.map(value => {
        switch(value) {
          case "gaming": return "Gaming 🎮";
          case "programming": return "Programming 💻";
          case "music": return "Music 🎵";
          case "art": return "Art 🎨";
          case "sports": return "Sports ⚽";
          case "tech": return "Technology 🔧";
          default: return value;
        }
      }).join(", ");

      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "🎯 Interests Selected!",
          description: `${interaction.user.username} is interested in: **${selectedText}**\n\nWe'll make sure you get relevant updates and can connect with like-minded members!`,
          color: 0x9932cc,
          fields: [
            { name: "👤 User", value: interaction.user.username, inline: true },
            { name: "🎯 Interests", value: selectedText, inline: true },
            { name: "📢 Next Steps", value: "Check out the relevant channels for your interests!", inline: false },
          ],
          timestamp: true,
        },
      });
      await interaction.reply(embed);
    });
  }
}

export default new TestWelcomeCommand();
