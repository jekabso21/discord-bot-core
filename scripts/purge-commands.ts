import 'dotenv/config';
import { REST, Routes } from 'discord.js';

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);

async function clearCommands() {
  const appId = process.env.APPLICATION_ID!;
  const guildId = process.env.GUILD_ID;

  if (!appId) {
    console.error('❌ APPLICATION_ID not found in environment variables');
    console.log('Add APPLICATION_ID to your .env file from Discord Dev Portal → Application → General Information');
    process.exit(1);
  }

  try {
    if (guildId) {
      // Clear guild commands
      await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: [] });
      console.log(`✅ Cleared all guild commands for guild ${guildId}`);
    } else {
      // Clear global commands
      await rest.put(Routes.applicationCommands(appId), { body: [] });
      console.log(`✅ Cleared all global commands`);
    }
  } catch (error) {
    console.error('❌ Error clearing commands:', error);
  }
}

clearCommands().catch(console.error);
