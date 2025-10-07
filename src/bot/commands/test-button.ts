import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
  ButtonStyle,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { ButtonComponents } from "../../components/buttons";
import { EmbedComponents } from "../../components/embeds";
import { CallbackManager } from "../../components/callbacks";

class TestCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-button")
    .setDescription("Sends a test button");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    // Register callbacks for this command
    this.registerCallbacks();

    const row = ButtonComponents.createCustomButtonRow([
      {
        callbackId: "test-success",
        label: "Success",
        style: ButtonStyle.Success,
        emoji: "✅",
      },
      {
        callbackId: "test-danger",
        label: "Danger", 
        style: ButtonStyle.Danger,
        emoji: "❌",
      },
      {
        callbackId: "test-primary",
        label: "Primary",
        style: ButtonStyle.Primary,
        emoji: "🔵",
      },
      {
        callbackId: "test-secondary",
        label: "Secondary",
        style: ButtonStyle.Secondary,
        emoji: "⚪",
      },
    ]);

    const embed = EmbedComponents.createCustomEmbed({
      title: "🔘 Test Buttons",
      description: "Click any of the buttons below to test different styles!",
      color: 0x0099ff,
      timestamp: true,
    });

    await interaction.reply({
      embeds: [embed],
      components: [row],
      flags: MessageFlags.Ephemeral,
    });
  }

  private registerCallbacks() {
    CallbackManager.registerButtonCallback("test-success", async (client, interaction) => {
      const embed = EmbedComponents.createCustomEmbed({
        title: "✅ Success Button Clicked!",
        description: "This is a success button with green styling!",
        color: 0x00ff00,
        timestamp: true,
      });
      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    });

    CallbackManager.registerButtonCallback("test-danger", async (client, interaction) => {
      const embed = EmbedComponents.createCustomEmbed({
        title: "❌ Danger Button Clicked!",
        description: "This is a danger button with red styling!",
        color: 0xff0000,
        timestamp: true,
      });
      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    });

    CallbackManager.registerButtonCallback("test-primary", async (client, interaction) => {
      const embed = EmbedComponents.createCustomEmbed({
        title: "🔵 Primary Button Clicked!",
        description: "This is a primary button with blue styling!",
        color: 0x0099ff,
        timestamp: true,
      });
      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    });

    CallbackManager.registerButtonCallback("test-secondary", async (client, interaction) => {
      const embed = EmbedComponents.createCustomEmbed({
        title: "⚪ Secondary Button Clicked!",
        description: "This is a secondary button with gray styling!",
        color: 0x808080,
        timestamp: true,
      });
      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    });
  }
}

export default new TestCommand();
