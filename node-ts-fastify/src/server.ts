import { buildApp } from "./app";

const app = buildApp();

async function start() {
  try {
    await app.listen({ port: 3000, host: "0.0.0.0" });
    console.log("🚀 Server running on port 3000");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();