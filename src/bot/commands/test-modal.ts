import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  MessageFlags,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { ModalComponents } from "../../components/modals";
import { EmbedComponents } from "../../components/embeds";
import { CallbackManager } from "../../components/callbacks";

class TestModalCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-modal")
    .setDescription("Sends a test modal");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    // Register callbacks for this command
    this.registerCallbacks();

    const modal = ModalComponents.createCustomModal({
      customId: "test-modal",
      callbackId: "test-modal",
      title: "Test Modal",
      inputs: [
        {
          customId: "testInput",
          label: "Type something",
          style: 1, // TextInputStyle.Short
          required: true,
        }
      ],
    });
    await interaction.showModal(modal);
  }

  private registerCallbacks() {
    CallbackManager.registerModalCallback("test-modal", async (client, interaction) => {
      const inputValue = interaction.fields.getTextInputValue("testInput");
      const embed = EmbedComponents.createCustomEmbed({
        title: "✅ Modal Submitted!",
        description: `You submitted: **${inputValue}**`,
        color: 0x00ff00,
        timestamp: true,
      });
      await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
    });
  }
}

export default new TestModalCommand();
