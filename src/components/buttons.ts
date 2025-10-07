import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export interface ButtonConfig {
  customId?: string;
  label: string;
  style: ButtonStyle;
  emoji?: string;
  disabled?: boolean;
  url?: string;
  callbackId?: string; // For callback system
}

export class ButtonComponents {
  static createCustomButtonRow(buttons: ButtonConfig[]) {
    return new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        buttons.map(btn => {
          const button = new ButtonBuilder()
            .setLabel(btn.label)
            .setStyle(btn.style);

          // Link buttons can only have URL, not customId
          if (btn.url) {
            button.setURL(btn.url);
          } else {
            // Use callback system if callbackId is provided
            const customId = btn.callbackId ? `callback-button:${btn.callbackId}` : btn.customId;
            button.setCustomId(customId);
          }

          if (btn.emoji) button.setEmoji(btn.emoji);
          if (btn.disabled !== undefined) button.setDisabled(btn.disabled);

          return button;
        })
      );
  }

  static createSingleButton(config: ButtonConfig) {
    const button = new ButtonBuilder()
      .setLabel(config.label)
      .setStyle(config.style);

    if (config.url) {
      button.setURL(config.url);
    } else {
      const customId = config.callbackId ? `callback-button:${config.callbackId}` : config.customId;
      button.setCustomId(customId);
    }

    if (config.emoji) button.setEmoji(config.emoji);
    if (config.disabled !== undefined) button.setDisabled(config.disabled);

    return new ActionRowBuilder<ButtonBuilder>().addComponents(button);
  }
}