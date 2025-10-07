import { ButtonInteraction, AnySelectMenuInteraction, ModalSubmitInteraction } from "discord.js";
import { ExtendedClient } from "../core";

export type ButtonCallback = (client: ExtendedClient, interaction: ButtonInteraction) => Promise<void>;
export type MenuCallback = (client: ExtendedClient, interaction: AnySelectMenuInteraction) => Promise<void>;
export type ModalCallback = (client: ExtendedClient, interaction: ModalSubmitInteraction) => Promise<void>;

export class CallbackManager {
  private static buttonCallbacks = new Map<string, ButtonCallback>();
  private static menuCallbacks = new Map<string, MenuCallback>();
  private static modalCallbacks = new Map<string, ModalCallback>();

  static registerButtonCallback(customId: string, callback: ButtonCallback) {
    this.buttonCallbacks.set(customId, callback);
  }

  static registerMenuCallback(customId: string, callback: MenuCallback) {
    this.menuCallbacks.set(customId, callback);
  }

  static registerModalCallback(customId: string, callback: ModalCallback) {
    this.modalCallbacks.set(customId, callback);
  }

  static async executeButtonCallback(customId: string, client: ExtendedClient, interaction: ButtonInteraction) {
    const callback = this.buttonCallbacks.get(customId);
    if (callback) {
      try {
        await callback(client, interaction);
      } catch (error) {
        console.error(`[!] Error executing button callback ${customId}:`, error);
      }
    } else {
      console.error(`[!] No button callback found for: ${customId}`);
      console.log(`[i] Available button callbacks:`, Array.from(this.buttonCallbacks.keys()));
    }
  }

  static async executeMenuCallback(customId: string, client: ExtendedClient, interaction: AnySelectMenuInteraction) {
    const callback = this.menuCallbacks.get(customId);
    if (callback) {
      try {
        await callback(client, interaction);
      } catch (error) {
        console.error(`[!] Error executing menu callback ${customId}:`, error);
      }
    } else {
      console.error(`[!] No menu callback found for: ${customId}`);
      console.log(`[i] Available menu callbacks:`, Array.from(this.menuCallbacks.keys()));
    }
  }

  static async executeModalCallback(customId: string, client: ExtendedClient, interaction: ModalSubmitInteraction) {
    const callback = this.modalCallbacks.get(customId);
    if (callback) {
      try {
        await callback(client, interaction);
      } catch (error) {
        console.error(`[!] Error executing modal callback ${customId}:`, error);
      }
    } else {
      console.error(`[!] No modal callback found for: ${customId}`);
      console.log(`[i] Available modal callbacks:`, Array.from(this.modalCallbacks.keys()));
    }
  }

  static clearCallbacks() {
    this.buttonCallbacks.clear();
    this.menuCallbacks.clear();
    this.modalCallbacks.clear();
  }

  static getRegisteredCallbacks() {
    return {
      buttons: Array.from(this.buttonCallbacks.keys()),
      menus: Array.from(this.menuCallbacks.keys()),
      modals: Array.from(this.modalCallbacks.keys()),
    };
  }
}
