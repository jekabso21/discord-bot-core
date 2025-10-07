import type {
  StringSelectMenuInteraction,
  UserSelectMenuInteraction,
  RoleSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  MentionableSelectMenuInteraction,
} from "discord.js";
import type { ExtendedClient } from "../../../core/client";

export type AnySelectMenuInteraction =
  | StringSelectMenuInteraction
  | UserSelectMenuInteraction
  | RoleSelectMenuInteraction
  | ChannelSelectMenuInteraction
  | MentionableSelectMenuInteraction;

export abstract class SelectMenu {
  abstract customId: string;

  abstract execute(
    client: ExtendedClient,
    interaction: AnySelectMenuInteraction,
  ): Promise<void>;
}
