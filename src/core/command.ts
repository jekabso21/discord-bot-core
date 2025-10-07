import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import type { ExtendedClient } from "./client";

export abstract class Command {
  abstract data: SlashCommandBuilder;
  abstract execute(
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction,
  ): Promise<void>;
}
