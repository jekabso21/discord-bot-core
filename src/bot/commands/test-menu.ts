import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  MessageFlags,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { MenuComponents } from "../../components/menus";
import { EmbedComponents } from "../../components/embeds";
import { CallbackManager } from "../../components/callbacks";

class TestMenuCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-menu")
    .setDescription("Sends a test select menu");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    // Register callbacks for this command
    this.registerCallbacks();

    const selectRow = MenuComponents.createCustomMenu({
      customId: "test-menu",
      callbackId: "test-menu",
      placeholder: "Choose an option",
      options: [
        { label: "Option 1", value: "1", description: "First option" },
        { label: "Option 2", value: "2", description: "Second option" },
        { label: "Option 3", value: "3", description: "Third option" },
        { label: "Option 4", value: "4", description: "Fourth option" },
        { label: "Option 5", value: "5", description: "Fifth option" },
      ],
    });

    const embed = EmbedComponents.createCustomEmbed({
      title: "📋 Test Menu",
      description: "Choose an option from the dropdown below!",
      color: 0x0099ff,
      timestamp: true,
    });

    await interaction.reply({
      embeds: [embed],
      components: [selectRow],
      flags: MessageFlags.Ephemeral,
    });
  }

  private registerCallbacks() {
    CallbackManager.registerMenuCallback("test-menu", async (client, interaction) => {
      const embed = EmbedComponents.createCustomEmbed({
        title: "✅ Selection Made!",
        description: `You selected: **${interaction.values.join(", ")}**`,
        color: 0x00ff00,
        timestamp: true,
      });
      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    });
  }
}

export default new TestMenuCommand();
