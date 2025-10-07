import { ModalSubmitInteraction } from "discord.js";
import { Modal, ExtendedClient } from "../../core";
import { CallbackManager } from "../callbacks";

class CallbackModal extends Modal {
  customId = "callback-modal";

  async execute(client: ExtendedClient, interaction: ModalSubmitInteraction) {
    const callbackId = interaction.customId.split(':')[1];
    
    if (!callbackId) {
      console.error(`[!] No callback ID found in customId: ${interaction.customId}`);
      return;
    }

    console.log(`[+] Executing modal callback: ${callbackId}`);
    await CallbackManager.executeModalCallback(callbackId, client, interaction);
  }
}

export default new CallbackModal();
