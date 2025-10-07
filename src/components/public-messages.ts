import { ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } from "discord.js";
import { EmbedComponents, EmbedConfig } from "./embeds";
import { ButtonComponents, ButtonConfig } from "./buttons";
import { MenuComponents, MenuConfig } from "./menus";

export interface PublicMessageConfig {
  embed: EmbedConfig;
  buttons?: ButtonConfig[];
  menu?: MenuConfig;
}

export class PublicMessageComponents {
  static createPublicMessage(config: PublicMessageConfig) {
    const embed = EmbedComponents.createPublicCustomEmbed(config.embed);
    const components: (ActionRowBuilder<ButtonBuilder> | ActionRowBuilder<StringSelectMenuBuilder>)[] = [];

    if (config.buttons && config.buttons.length > 0) {
      components.push(ButtonComponents.createCustomButtonRow(config.buttons));
    }

    if (config.menu) {
      components.push(MenuComponents.createCustomMenu(config.menu));
    }

    return {
      embeds: [embed],
      components: components.length > 0 ? components : undefined,
    };
  }
}