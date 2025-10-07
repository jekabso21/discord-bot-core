import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export interface MenuOptionConfig {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
}

export interface MenuConfig {
  customId: string;
  placeholder: string;
  minValues?: number;
  maxValues?: number;
  disabled?: boolean;
  options: MenuOptionConfig[];
  callbackId?: string;
}

export class MenuComponents {
  static createCustomMenu(config: MenuConfig) {
    const customId = config.callbackId ? `callback-menu:${config.callbackId}` : config.customId;
    
    return new ActionRowBuilder<StringSelectMenuBuilder>()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId(customId)
          .setPlaceholder(config.placeholder)
          .setMinValues(config.minValues || 1)
          .setMaxValues(config.maxValues || 1)
          .setDisabled(config.disabled || false)
          .addOptions(
            config.options.map(option => {
              const optionBuilder = new StringSelectMenuOptionBuilder()
                .setLabel(option.label)
                .setValue(option.value);

              if (option.description) optionBuilder.setDescription(option.description);
              if (option.emoji) optionBuilder.setEmoji(option.emoji);
              if (option.default) optionBuilder.setDefault(option.default);

              return optionBuilder;
            })
          ),
      );
  }
}