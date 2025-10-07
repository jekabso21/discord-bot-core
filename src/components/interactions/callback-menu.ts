import { AnySelectMenuInteraction } from "discord.js";
import { SelectMenu, ExtendedClient } from "../../core";
import { CallbackManager } from "../callbacks";

class CallbackMenu extends SelectMenu {
  customId = "callback-menu";

  async execute(client: ExtendedClient, interaction: AnySelectMenuInteraction) {
    const callbackId = interaction.customId.split(':')[1];
    
    if (!callbackId) {
      console.error(`[!] No callback ID found in customId: ${interaction.customId}`);
      return;
    }

    console.log(`[+] Executing menu callback: ${callbackId}`);
    await CallbackManager.executeMenuCallback(callbackId, client, interaction);
  }
}

export default new CallbackMenu();
