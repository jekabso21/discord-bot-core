import type { ClientEvents } from "discord.js";

import type { ExtendedClient } from "./client";

export abstract class Event<K extends keyof ClientEvents> {
  abstract name: K;
  once?: boolean = false;
  abstract execute(
    client: ExtendedClient,
    ...args: ClientEvents[K]
  ): Promise<void> | void;
}
