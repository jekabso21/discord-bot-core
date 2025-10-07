import {
  ChatInputCommandInteraction,
  MessageFlags,
  SlashCommandBuilder,
  ButtonStyle,
  TextInputStyle,
  ButtonInteraction,
  AnySelectMenuInteraction,
} from "discord.js";

import { Command, ExtendedClient } from "../../core";
import { EmbedComponents } from "../../components/embeds";
import { ButtonComponents } from "../../components/buttons";
import { MenuComponents } from "../../components/menus";
import { ModalComponents } from "../../components/modals";
import { CallbackManager } from "../../components/callbacks";

class TestConfigurableCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("test-configurable")
    .setDescription("Demonstrates configurable components");

  async execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ) {
    // Register callback functions for this command
    this.registerCallbacks();
    // Custom embed with configuration
    const embed = EmbedComponents.createCustomEmbed({
      title: "Configurable Components Demo",
      description: "This demonstrates how components can be customized!",
      color: 0x9932cc,
      author: {
        name: "Custom Bot",
        iconURL: client.user?.displayAvatarURL(),
      },
      fields: [
        { name: "Feature", value: "Configurable Components", inline: true },
        { name: "Status", value: "✅ Working", inline: true },
        { name: "Customization", value: "You can set your own values for all components!", inline: false },
      ],
      footer: {
        text: "Try the buttons and menu below!",
        iconURL: client.user?.displayAvatarURL(),
      },
      timestamp: true,
    });

    // Custom button row with callback system
    const customButtons = ButtonComponents.createCustomButtonRow([
      {
        callbackId: "demo-success",
        label: "Success Callback",
        style: ButtonStyle.Success,
        emoji: "✅",
      },
      {
        callbackId: "demo-danger", 
        label: "Danger Callback",
        style: ButtonStyle.Danger,
        emoji: "❌",
      },
      {
        label: "Visit Website",
        style: ButtonStyle.Link,
        url: "https://discord.js.org",
      },
    ]);

    // Custom menu with callback system
    const customMenu = MenuComponents.createCustomMenu({
      customId: "demo-menu",
      callbackId: "demo-menu",
      placeholder: "Choose your favorite option",
      minValues: 1,
      maxValues: 2,
      options: [
        {
          label: "Option A",
          value: "a",
          description: "This is option A",
          emoji: "🔵",
        },
        {
          label: "Option B", 
          value: "b",
          description: "This is option B",
          emoji: "🟢",
        },
        {
          label: "Option C",
          value: "c", 
          description: "This is option C",
          emoji: "🔴",
        },
      ],
    });

    await interaction.reply({
      embeds: [embed],
      components: [customButtons, customMenu],
      flags: MessageFlags.Ephemeral,
    });
  }

  private registerCallbacks() {
    // Register button callbacks
    CallbackManager.registerButtonCallback("demo-success", async (client, interaction) => {
      const embed = EmbedComponents.createCustomEmbed({
        title: "✅ Callback Success!",
        description: "This button was handled by a callback function! 🎉\n\nYou can write any custom logic here!",
        color: 0x00ff00,
        timestamp: true,
      });
      
      await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    });

    CallbackManager.registerButtonCallback("demo-danger", async (client, interaction) => {
      const embed = EmbedComponents.createCustomEmbed({
        title: "❌ Callback Danger!",
        description: "This button was also handled by a callback function! ⚠️\n\nEach callback can have completely different logic!",
        color: 0xff0000,
        timestamp: true,
      });
      
      await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    });

    // Register menu callback
    CallbackManager.registerMenuCallback("demo-menu", async (client, interaction) => {
      const selectedValues = interaction.values;
      const selectedText = selectedValues.map(value => {
        switch(value) {
          case "a": return "Option A 🔵";
          case "b": return "Option B 🟢";
          case "c": return "Option C 🔴";
          default: return value;
        }
      }).join(", ");

      const embed = EmbedComponents.createCustomEmbed({
        title: "🎯 Menu Callback!",
        description: `You selected: **${selectedText}**\n\nThis menu was handled by a callback function!\n\nYou can process the selections however you want!`,
        color: 0x0099ff,
        timestamp: true,
      });

      await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      });
    });
  }
}

export default new TestConfigurableCommand();
