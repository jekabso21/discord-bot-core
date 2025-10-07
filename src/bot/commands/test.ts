import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";

class TestCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test")
    .setDescription("Sends a test message");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    await interaction.reply({
      content: "Test",
      flags: MessageFlags.Ephemeral,
    });
  }
}

export default new TestCommand();
