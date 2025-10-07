import { Interaction } from "discord.js";

import { Event, ExtendedClient } from "../../core";

class InteractionCreateEvent extends Event<"interactionCreate"> {
  name = "interactionCreate" as const;

  async execute(client: ExtendedClient, interaction: Interaction) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      await command.execute(client, interaction);
    }

    if (interaction.isButton()) {
      if (interaction.customId.startsWith("callback-button:")) {
        const button = client.buttons.get("callback-button");
        if (button) {
          await button.execute(client, interaction);
          return;
        }
      }
      
      const button = client.buttons.get(interaction.customId);
      if (!button) return;
      await button.execute(client, interaction);
    }

    if (interaction.isModalSubmit()) {
      if (interaction.customId.startsWith("callback-modal:")) {
        const modal = client.modals.get("callback-modal");
        if (modal) {
          await modal.execute(client, interaction);
          return;
        }
      }
      
      const modal = client.modals.get(interaction.customId);
      if (!modal) return;
      await modal.execute(client, interaction);
    }

    if (interaction.isStringSelectMenu()) {
      if (interaction.customId.startsWith("callback-menu:")) {
        const menu = client.selectMenus.get("callback-menu");
        if (menu) {
          await menu.execute(client, interaction);
          return;
        }
      }
      
      const menu = client.selectMenus.get(interaction.customId);
      if (!menu) return;
      await menu.execute(client, interaction);
    }
  }
}

export default new InteractionCreateEvent();
