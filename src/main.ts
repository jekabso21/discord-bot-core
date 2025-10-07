import "dotenv/config";

import { ExtendedClient } from "./core";

async function main() {
  const client = new ExtendedClient();
  await client.start(process.env.TOKEN!);
}

main();
