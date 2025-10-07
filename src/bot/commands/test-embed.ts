import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { EmbedComponents } from "../../components/embeds";

class TestEmbedCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-embed")
    .setDescription("Sends a test embed message");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    const embed = EmbedComponents.createCustomEmbed({
      title: "🧪 Test Embed",
      description: "This is a test embed message!",
      color: 0x00ff00,
      author: {
        name: "Test Bot",
        iconURL: client.user?.displayAvatarURL(),
      },
      thumbnail: "https://images.unsplash.com/photo-1683029096295-7680306aa37d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      image: "https://images.unsplash.com/photo-1679057001914-59ab4131dfff?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fields: [
        { name: "Field 1", value: "This is the first field", inline: true },
        { name: "Field 2", value: "This is the second field", inline: true },
        { name: "Long Field", value: "This is a longer field that demonstrates how embeds handle longer text content. It can span multiple lines and still look good!", inline: false },
      ],
      footer: {
        text: "Test Embed Footer",
        iconURL: client.user?.displayAvatarURL(),
      },
      timestamp: true,
    });

    await interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestEmbedCommand();
