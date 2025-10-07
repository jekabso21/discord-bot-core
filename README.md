# Discord Bot Core

A powerful, modular Discord bot framework built with TypeScript and Discord.js v14. This core provides a clean architecture with reusable components, callback system, and easy-to-use abstractions for building Discord bots.

## 🚀 Features

- **🎯 Modular Architecture** - Clean separation of concerns with reusable components
- **⚡ Callback System** - Easy-to-use callback system for handling interactions
- **🧩 Reusable Components** - Pre-built embed, button, menu, and modal components
- **🔧 TypeScript Support** - Full TypeScript support with type safety
- **📦 Command System** - Automatic command loading and registration
- **🎨 Public Messages** - Support for public embeds with interactive components
- **🔄 Event Handling** - Comprehensive event system for bot interactions
- **⚙️ Environment Configuration** - Flexible configuration via environment variables

## 📋 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Components](#components)
- [Callback System](#callback-system)
- [Commands](#commands)
- [Configuration](#configuration)
- [Examples](#examples)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## 🛠️ Installation

### Prerequisites

- Node.js 18+ 
- TypeScript 5+
- Discord Bot Token

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/discord-bot-core.git
   cd discord-bot-core
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your `.env` file:
   ```env
   TOKEN=your_discord_bot_token
   APPLICATION_ID=your_application_id
   GUILD_ID=your_guild_id_for_development
   PURGE_ON_START=true
   ```

4. **Build and Run**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run build
   npm start
   ```

## 🚀 Quick Start

### Basic Bot Setup

```typescript
// src/main.ts
import { ExtendedClient } from "./core";

const client = new ExtendedClient({
  intents: ["Guilds", "GuildMessages", "MessageContent"]
});

client.start(process.env.TOKEN!);
```

### Creating Your First Command

```typescript
// src/bot/commands/hello.ts
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command, ExtendedClient } from "../../core";
import { EmbedComponents } from "../../components/embeds";

class HelloCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Say hello to the bot");

  async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction) {
    const embed = EmbedComponents.createCustomEmbed({
      title: "👋 Hello!",
      description: `Hello ${interaction.user.username}!`,
      color: 0x00ff00,
      timestamp: true,
    });

    await interaction.reply({ embeds: [embed] });
  }
}

export default new HelloCommand();
```

## 🏗️ Architecture

### Project Structure

```
src/
├── core/                    # Core bot functionality
│   ├── client.ts           # Extended Discord client
│   ├── command.ts          # Command base class
│   ├── event.ts            # Event base class
│   └── interactions/       # Interaction base classes
├── components/             # Reusable components
│   ├── embeds.ts          # Embed components
│   ├── buttons.ts         # Button components
│   ├── menus.ts           # Menu components
│   ├── modals.ts          # Modal components
│   ├── public-messages.ts # Public message components
│   └── callbacks.ts       # Callback system
├── bot/
│   ├── commands/          # Slash commands
│   ├── events/            # Bot events
│   └── interactions/      # Interaction handlers
└── utils/                 # Utility functions
```

### Core Classes

- **`ExtendedClient`** - Enhanced Discord client with automatic loading
- **`Command`** - Base class for slash commands
- **`Event`** - Base class for bot events
- **`Button`**, **`Menu`**, **`Modal`** - Base classes for interactions

## 🧩 Components

### Embed Components

```typescript
import { EmbedComponents } from "./components/embeds";

// Custom embed
const embed = EmbedComponents.createCustomEmbed({
  title: "Custom Title",
  description: "Custom description",
  color: 0x3498db,
  author: { name: "Bot Name", iconURL: "https://..." },
  fields: [
    { name: "Field 1", value: "Value 1", inline: true },
    { name: "Field 2", value: "Value 2", inline: true }
  ],
  footer: { text: "Footer text" },
  timestamp: true
});

// Public embed (no ephemeral flag)
const publicEmbed = EmbedComponents.createPublicCustomEmbed({
  title: "Public Message",
  description: "Everyone can see this!",
  color: 0x00ff00
});
```

### Button Components

```typescript
import { ButtonComponents } from "./components/buttons";
import { ButtonStyle } from "discord.js";

// Custom button row
const buttons = ButtonComponents.createCustomButtonRow([
  {
    callbackId: "action-confirm",
    label: "Confirm",
    style: ButtonStyle.Success,
    emoji: "✅"
  },
  {
    callbackId: "action-cancel", 
    label: "Cancel",
    style: ButtonStyle.Danger,
    emoji: "❌"
  },
  {
    label: "Visit Website",
    style: ButtonStyle.Link,
    url: "https://discord.js.org"
  }
]);

// Single button
const singleButton = ButtonComponents.createSingleButton({
  callbackId: "single-action",
  label: "Click Me",
  style: ButtonStyle.Primary
});
```

### Menu Components

```typescript
import { MenuComponents } from "./components/menus";

const menu = MenuComponents.createCustomMenu({
  customId: "selection-menu",
  callbackId: "selection-menu",
  placeholder: "Choose an option",
  minValues: 1,
  maxValues: 2,
  options: [
    { label: "Option A", value: "a", description: "First option", emoji: "🔵" },
    { label: "Option B", value: "b", description: "Second option", emoji: "🟢" },
    { label: "Option C", value: "c", description: "Third option", emoji: "🔴" }
  ]
});
```

### Modal Components

```typescript
import { ModalComponents } from "./components/modals";
import { TextInputStyle } from "discord.js";

const modal = ModalComponents.createCustomModal({
  customId: "feedback-modal",
  callbackId: "feedback-modal", 
  title: "Send Feedback",
  inputs: [
    {
      customId: "feedback-title",
      label: "Feedback Title",
      style: TextInputStyle.Short,
      required: true,
      maxLength: 100
    },
    {
      customId: "feedback-description",
      label: "Feedback Description", 
      style: TextInputStyle.Paragraph,
      required: true,
      maxLength: 1000
    }
  ]
});
```

### Public Message Components

```typescript
import { PublicMessageComponents } from "./components/public-messages";

const publicMessage = PublicMessageComponents.createPublicMessage({
  embed: {
    title: "📢 Server Announcement",
    description: "Important information for all members!",
    color: 0x3498db,
    timestamp: true
  },
  buttons: [
    { callbackId: "acknowledge", label: "Acknowledge", style: ButtonStyle.Success }
  ],
  menu: {
    customId: "interest-menu",
    callbackId: "interest-menu",
    placeholder: "Select your interests",
    options: [
      { label: "Gaming", value: "gaming", emoji: "🎮" },
      { label: "Programming", value: "programming", emoji: "💻" }
    ]
  }
});
```

## ⚡ Callback System

The callback system allows you to handle interactions without creating separate files for each interaction.

### Registering Callbacks

```typescript
import { CallbackManager } from "./components/callbacks";

// Button callback
CallbackManager.registerButtonCallback("my-button", async (client, interaction) => {
  const embed = EmbedComponents.createCustomEmbed({
    title: "Button Clicked!",
    description: `${interaction.user.username} clicked the button!`,
    color: 0x00ff00
  });
  
  await interaction.reply({ embeds: [embed] });
});

// Menu callback
CallbackManager.registerMenuCallback("my-menu", async (client, interaction) => {
  const selectedValues = interaction.values;
  const embed = EmbedComponents.createCustomEmbed({
    title: "Selection Made!",
    description: `You selected: ${selectedValues.join(", ")}`,
    color: 0x0099ff
  });
  
  await interaction.reply({ embeds: [embed] });
});

// Modal callback
CallbackManager.registerModalCallback("my-modal", async (client, interaction) => {
  const title = interaction.fields.getTextInputValue("feedback-title");
  const description = interaction.fields.getTextInputValue("feedback-description");
  
  const embed = EmbedComponents.createCustomEmbed({
    title: "Feedback Received!",
    description: `**Title:** ${title}\n**Description:** ${description}`,
    color: 0x00ff00
  });
  
  await interaction.reply({ embeds: [embed] });
});
```

## 📝 Commands

### Creating Commands

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command, ExtendedClient } from "../../core";
import { EmbedComponents } from "../../components/embeds";
import { ButtonComponents } from "../../components/buttons";
import { CallbackManager } from "../../components/callbacks";

class MyCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("mycommand")
    .setDescription("My custom command");

  async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction) {
    // Register callbacks for this command
    this.registerCallbacks();

    const embed = EmbedComponents.createCustomEmbed({
      title: "My Command",
      description: "This is my custom command!",
      color: 0x9932cc
    });

    const buttons = ButtonComponents.createCustomButtonRow([
      {
        callbackId: "my-action",
        label: "Do Something",
        style: ButtonStyle.Primary
      }
    ]);

    await interaction.reply({
      embeds: [embed],
      components: [buttons]
    });
  }

  private registerCallbacks() {
    CallbackManager.registerButtonCallback("my-action", async (client, interaction) => {
      // Handle button click
      const embed = EmbedComponents.createCustomEmbed({
        title: "Action Performed!",
        description: "The action was successful!",
        color: 0x00ff00
      });
      
      await interaction.reply({ embeds: [embed] });
    });
  }
}

export default new MyCommand();
```

### Command Registration

Commands are automatically loaded from `src/bot/commands/`. The bot supports:

- **Guild Commands** (instant updates) - Set `GUILD_ID` in `.env`
- **Global Commands** (slow propagation) - Remove `GUILD_ID` from `.env`
- **Automatic Purging** - Set `PURGE_ON_START=true` to clear old commands

## ⚙️ Configuration

### Environment Variables

```env
# Required
TOKEN=your_discord_bot_token

# Optional
APPLICATION_ID=your_application_id
GUILD_ID=your_guild_id_for_development
PURGE_ON_START=true
```

### Bot Intents

```typescript
const client = new ExtendedClient({
  intents: [
    "Guilds",
    "GuildMessages", 
    "MessageContent",
    "GuildMembers"
  ]
});
```

## 🎯 Examples

### Poll Command

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction, ButtonStyle } from "discord.js";
import { Command, ExtendedClient } from "../../core";
import { PublicMessageComponents } from "../../components/public-messages";
import { CallbackManager } from "../../components/callbacks";

class PollCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Create a poll")
    .addStringOption(option =>
      option.setName("question")
        .setDescription("The poll question")
        .setRequired(true)
    );

  async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction) {
    this.registerCallbacks();
    
    const question = interaction.options.getString("question")!;
    
    const poll = PublicMessageComponents.createPublicMessage({
      embed: {
        title: `📊 Poll: ${question}`,
        description: "Vote using the buttons below!",
        color: 0x9932cc,
        timestamp: true
      },
      buttons: [
        { callbackId: "vote-yes", label: "Yes", style: ButtonStyle.Success, emoji: "✅" },
        { callbackId: "vote-no", label: "No", style: ButtonStyle.Danger, emoji: "❌" },
        { callbackId: "vote-maybe", label: "Maybe", style: ButtonStyle.Secondary, emoji: "🤔" }
      ]
    });

    await interaction.reply(poll);
  }

  private registerCallbacks() {
    ["yes", "no", "maybe"].forEach(vote => {
      CallbackManager.registerButtonCallback(`vote-${vote}`, async (client, interaction) => {
        const embed = PublicMessageComponents.createPublicMessage({
          embed: {
            title: "🗳️ Vote Recorded!",
            description: `${interaction.user.username} voted **${vote.toUpperCase()}**!`,
            color: 0x00ff00,
            timestamp: true
          }
        });
        
        await interaction.reply(embed);
      });
    });
  }
}

export default new PollCommand();
```

### Welcome System

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { Command, ExtendedClient } from "../../core";
import { PublicMessageComponents } from "../../components/public-messages";
import { CallbackManager } from "../../components/callbacks";

class WelcomeCommand extends Command {
  data = new SlashCommandBuilder()
    .setName("welcome")
    .setDescription("Send a welcome message");

  async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction) {
    this.registerCallbacks();

    const welcome = PublicMessageComponents.createPublicMessage({
      embed: {
        title: "🎉 Welcome to Our Server!",
        description: `Welcome ${interaction.user.username}! We're excited to have you here.`,
        color: 0x00ff00,
        thumbnail: interaction.user.displayAvatarURL(),
        fields: [
          { name: "👤 User", value: interaction.user.username, inline: true },
          { name: "🆔 ID", value: interaction.user.id, inline: true },
          { name: "📅 Joined", value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true }
        ],
        footer: { text: "Enjoy your stay!" },
        timestamp: true
      },
      buttons: [
        { callbackId: "welcome-rules", label: "Read Rules", style: ButtonStyle.Primary, emoji: "📋" },
        { callbackId: "welcome-roles", label: "Get Roles", style: ButtonStyle.Secondary, emoji: "🎭" }
      ],
      menu: {
        customId: "welcome-interests",
        callbackId: "welcome-interests",
        placeholder: "What are you interested in?",
        options: [
          { label: "Gaming", value: "gaming", description: "I love gaming", emoji: "🎮" },
          { label: "Programming", value: "programming", description: "I love coding", emoji: "💻" },
          { label: "Music", value: "music", description: "I love music", emoji: "🎵" }
        ]
      }
    });

    await interaction.reply(welcome);
  }

  private registerCallbacks() {
    // Button callbacks
    CallbackManager.registerButtonCallback("welcome-rules", async (client, interaction) => {
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "📋 Server Rules",
          description: "Please read and follow our server rules...",
          color: 0x0099ff
        }
      });
      await interaction.reply(embed);
    });

    // Menu callback
    CallbackManager.registerMenuCallback("welcome-interests", async (client, interaction) => {
      const selectedValues = interaction.values;
      const embed = PublicMessageComponents.createPublicMessage({
        embed: {
          title: "🎯 Interests Selected!",
          description: `${interaction.user.username} is interested in: **${selectedValues.join(", ")}**`,
          color: 0x9932cc
        }
      });
      await interaction.reply(embed);
    });
  }
}

export default new WelcomeCommand();
```

## 📚 API Reference

### EmbedComponents

- `createCustomEmbed(config: EmbedConfig)` - Create custom embed
- `createPublicCustomEmbed(config: EmbedConfig)` - Create public embed

### ButtonComponents

- `createCustomButtonRow(buttons: ButtonConfig[])` - Create button row
- `createSingleButton(config: ButtonConfig)` - Create single button

### MenuComponents

- `createCustomMenu(config: MenuConfig)` - Create select menu

### ModalComponents

- `createCustomModal(config: ModalConfig)` - Create modal

### PublicMessageComponents

- `createPublicMessage(config: PublicMessageConfig)` - Create public message

### CallbackManager

- `registerButtonCallback(id: string, callback: ButtonCallback)` - Register button callback
- `registerMenuCallback(id: string, callback: MenuCallback)` - Register menu callback
- `registerModalCallback(id: string, callback: ModalCallback)` - Register modal callback

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Add comments for complex logic
- Write tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Discord.js](https://discord.js.org/) - The Discord API library
- [TypeScript](https://www.typescriptlang.org/) - Type safety and developer experience
- [Node.js](https://nodejs.org/) - Runtime environment

## 📞 Support

- 📖 [Documentation](https://github.com/yourusername/discord-bot-core/wiki)
- 🐛 [Issue Tracker](https://github.com/yourusername/discord-bot-core/issues)
- 💬 [Discussions](https://github.com/yourusername/discord-bot-core/discussions)
- 📧 [Email Support](mailto:support@yourdomain.com)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/discord-bot-core&type=Date)](https://star-history.com/#yourusername/discord-bot-core&Date)

---

Made with ❤️ by the Discord Bot Core team
