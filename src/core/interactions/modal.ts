import type { ModalSubmitInteraction } from "discord.js";

import type { ExtendedClient } from "../client";

export abstract class Modal {
  abstract customId: string;

  abstract execute(
    client: ExtendedClient,
    interaction: ModalSubmitInteraction,
  ): Promise<void>;
}
