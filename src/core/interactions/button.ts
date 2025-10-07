import type { ButtonInteraction } from "discord.js";

import type { ExtendedClient } from "../client";

export abstract class Button {
  abstract customId: string;

  abstract execute(
    client: ExtendedClient,
    interaction: ButtonInteraction,
  ): Promise<void>;
}
