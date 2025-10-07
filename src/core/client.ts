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
    const basePath = path.join(__dirname, "..", "bot", "interactions");
    const folders = [
      { name: "buttons", collection: this.buttons, label: "Button" },
      { name: "modals", collection: this.modals, label: "Modal" },
      { name: "menus", collection: this.selectMenus, label: "Menu" },
    ];

    for (const { name, collection, label } of folders) {
      const folderPath = path.join(basePath, name);

      if (!fs.existsSync(folderPath)) {
        logger.warn(`[!] Folder "${name}" not found`);
        continue;
      }

      const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".ts"));

      for (const file of files) {
        const filePath = path.join(folderPath, file);
        const imported = await import(`file://${filePath}`);
        const interaction = imported.default;

        if ("customId" in interaction && "execute" in interaction) {
          // Handle callback interactions specially
          if (interaction.customId.startsWith("callback-")) {
            // For callback handlers, we need to register them with a pattern matcher
            collection.set(interaction.customId, interaction);
            logger.info(`[+] ${label} callback handler loaded: ${interaction.customId}`);
          } else {
            collection.set(interaction.customId, interaction);
            logger.info(`[+] ${label} loaded: ${interaction.customId}`);
          }
        } else {
          logger.warn(
            `[!] Invalid ${label} in ${file}: missing "customId" or "execute"`,
          );
        }
      }

      logger.info(`[=>] Total ${name} loaded: ${collection.size}`);
    }
  }

  async start(token: string) {
    await this.loadCommands();
    await this.loadInteractions();
    await this.loadEvents();
    await this.login(token);
  }
}
