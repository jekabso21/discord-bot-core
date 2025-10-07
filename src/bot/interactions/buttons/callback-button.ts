import { ButtonInteraction } from "discord.js";

import { Button, ExtendedClient } from "../../../core";
import { CallbackManager } from "../../../components/callbacks";

class CallbackButton extends Button {
  customId = "callback-button";

  async execute(client: ExtendedClient, interaction: ButtonInteraction) {

    const callbackId = interaction.customId.split(':')[1];
    
    if (!callbackId) {
      console.error(`[!] No callback ID found in customId: ${interaction.customId}`);
      return;
    }

    console.log(`[+] Executing button callback: ${callbackId}`);
    await CallbackManager.executeButtonCallback(callbackId, client, interaction);
  }
}

export default new CallbackButton();
