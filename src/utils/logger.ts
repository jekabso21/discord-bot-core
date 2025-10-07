import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      singleLine: true,
      levelFirst: true,
      translateTime: "HH:MM:ss.l",
      ignore: "pid,hostname",
    },
  },
});

if (process.stdout.setDefaultEncoding) {
  process.stdout.setDefaultEncoding("utf-8");
}
