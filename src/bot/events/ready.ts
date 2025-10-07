import { REST, Routes } from "discord.js";

import { Event, ExtendedClient } from "../../core";

import { logger } from "../../utils/logger";

class ClientReadyEvent extends Event<"clientReady"> {
  name = "clientReady" as const;
  once = true;

  async execute(client: ExtendedClient): Promise<void> {
    try {
      await client.application?.fetch(); // ensure app is populated
      const appId = client.application!.id;

      logger.info("[*] Syncing application commands...");
      const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

      const body = client.commands.map((cmd) => cmd.data.toJSON());
      if (!body.length) {
        logger.warn("[!] No commands loaded to register");
        return;
      }

      const guildId = process.env.GUILD_ID;
      const purgeOnStart = String(process.env.PURGE_ON_START || "false").toLowerCase() === "true";

      if (guildId) {
        if (purgeOnStart) {
          await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: [] });
          logger.info(`[+] Cleared old guild commands for ${guildId}`);
        }

        await rest.put(Routes.applicationGuildCommands(appId, guildId), { body });
        logger.info(`[+] Registered ${body.length} guild commands to ${guildId}`);
      } else {
        if (purgeOnStart) {
          await rest.put(Routes.applicationCommands(appId), { body: [] });
          logger.info("[+] Cleared old global commands");
        }

        await rest.put(Routes.applicationCommands(appId), { body });
        logger.info(`[+] Registered ${body.length} commands globally`);
      }
    } catch (error: any) {
      logger.error("[!] Error registering commands:", error);
    }

    logger.info(`[+] Connected as ${client.user?.tag}`);
  }
}

export default new ClientReadyEvent();
