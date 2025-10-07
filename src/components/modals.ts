import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";

export interface TextInputConfig {
  customId: string;
  label: string;
  style: TextInputStyle;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value?: string;
}

export interface ModalConfig {
  customId: string;
  title: string;
  inputs: TextInputConfig[];
  callbackId?: string; // For callback system
}

export class ModalComponents {
  static createCustomModal(config: ModalConfig) {
    const customId = config.callbackId ? `callback-modal:${config.callbackId}` : config.customId;
    
    const modal = new ModalBuilder()
      .setCustomId(customId)
      .setTitle(config.title);

    config.inputs.forEach(input => {
      const textInput = new TextInputBuilder()
        .setCustomId(input.customId)
        .setLabel(input.label)
        .setStyle(input.style);

      if (input.placeholder) textInput.setPlaceholder(input.placeholder);
      if (input.required !== undefined) textInput.setRequired(input.required);
      if (input.minLength) textInput.setMinLength(input.minLength);
      if (input.maxLength) textInput.setMaxLength(input.maxLength);
      if (input.value) textInput.setValue(input.value);

      modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(textInput),
      );
    });

    return modal;
  }
}