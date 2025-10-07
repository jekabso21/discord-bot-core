import {
  Client,
  ClientEvents,
  Collection,
  GatewayIntentBits,
  Partials,
} from "discord.js";

import fs from "fs";
import path from "path";

import { logger } from "../utils/logger";

import { Button, Command, Event, Modal, SelectMenu } from "./";

export class ExtendedClient extends Client {
  public commands = new Collection<string, Command>();
  public buttons = new Collection<string, Button>();
  public modals = new Collection<string, Modal>();
  public selectMenus = new Collection<string, SelectMenu>();

  constructor() {
    super({
      intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
      partials: Object.values(Partials) as Partials[],
    });
  }

  async loadCommands() {
    const commandsPath = path.join(__dirname, "..", "bot", "commands");
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const imported = await import(`file://${filePath}`);
      const command: Command = imported.default;

      if ("data" in command && "execute" in command) {
        this.commands.set(command.data.name, command);
        logger.info(`[+] Command loaded: ${command.data.name}`);
      } else {
        logger.warn(
          `[!] Invalid command in ${file}: missing "data" or "execute"`,
        );
      }
    }

    logger.info(`[=>] Total commands loaded: ${this.commands.size}`);
  }

  async loadEvents() {
    const eventsPath = path.join(__dirname, "..", "bot", "events");
    const eventFiles = fs
      .readdirSync(eventsPath)
      .filter((file) => file.endsWith(".ts"));

    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const imported = await import(`file://${filePath}`);
      const event: Event<keyof ClientEvents> = imported.default;

      if ("once" in event && "execute" in event) {
        if (event.once) {
          this.once(event.name, (...args) => event.execute(this, ...args));
        } else {
          this.on(event.name, (...args) => event.execute(this, ...args));
        }
        logger.info(`[+] Event loaded: ${event.name}`);
      } else {
        logger.warn(
          `[!] Invalid event in ${file}: missing "once" or "execute"`,
        );
      }
    }

    logger.info(`[=>] Total events loaded: ${eventFiles.length}`);
  }

  async loadInteractions() {
    const basePath = path.join(__dirname, "..", "components", "interactions");
    
    // Load callback files directly
    const callbackFiles = [
      { file: "callback-button.ts", collection: this.buttons, label: "Button" },
      { file: "callback-modal.ts", collection: this.modals, label: "Modal" },
      { file: "callback-menu.ts", collection: this.selectMenus, label: "Menu" },
    ];

    for (const { file, collection, label } of callbackFiles) {
      const filePath = path.join(basePath, file);

      if (!fs.existsSync(filePath)) {
        logger.warn(`[!] File "${file}" not found`);
        continue;
      }

      const imported = await import(`file://${filePath}`);
      const interaction = imported.default;

      if ("customId" in interaction && "execute" in interaction) {
        collection.set(interaction.customId, interaction);
        logger.info(`[+] ${label} callback handler loaded: ${interaction.customId}`);
      } else {
        logger.warn(
          `[!] Invalid ${label} in ${file}: missing "customId" or "execute"`,
        );
      }
    }

    logger.info(`[=>] Total buttons loaded: ${this.buttons.size}`);
    logger.info(`[=>] Total modals loaded: ${this.modals.size}`);
    logger.info(`[=>] Total menus loaded: ${this.selectMenus.size}`);
  }

  async start(token: string) {
    await this.loadCommands();
    await this.loadInteractions();
    await this.loadEvents();
    await this.login(token);
  }
}
