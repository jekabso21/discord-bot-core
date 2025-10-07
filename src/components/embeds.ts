import { EmbedBuilder, EmbedField } from "discord.js";

export interface EmbedConfig {
  title?: string;
  description?: string;
  color?: number;
  author?: {
    name: string;
    iconURL?: string;
  };
  thumbnail?: string;
  image?: string;
  footer?: {
    text: string;
    iconURL?: string;
  };
  fields?: EmbedField[];
  timestamp?: boolean;
}

export class EmbedComponents {
  static createCustomEmbed(config: EmbedConfig) {
    const embed = new EmbedBuilder();

    if (config.title) embed.setTitle(config.title);
    if (config.description) embed.setDescription(config.description);
    if (config.color) embed.setColor(config.color);
    if (config.author) embed.setAuthor(config.author);
    if (config.thumbnail) embed.setThumbnail(config.thumbnail);
    if (config.image) embed.setImage(config.image);
    if (config.footer) embed.setFooter(config.footer);
    if (config.fields && config.fields.length > 0) embed.addFields(config.fields);
    if (config.timestamp) embed.setTimestamp();

    return embed;
  }

  static createPublicCustomEmbed(config: EmbedConfig) {
    const embed = new EmbedBuilder();

    if (config.title) embed.setTitle(config.title);
    if (config.description) embed.setDescription(config.description);
    if (config.color) embed.setColor(config.color);
    if (config.author) embed.setAuthor(config.author);
    if (config.thumbnail) embed.setThumbnail(config.thumbnail);
    if (config.image) embed.setImage(config.image);
    if (config.footer) embed.setFooter(config.footer);
    if (config.fields && config.fields.length > 0) embed.addFields(config.fields);
    if (config.timestamp) embed.setTimestamp();

    return embed;
  }
}