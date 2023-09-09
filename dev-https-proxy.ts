import { createProxyServer } from "http-proxy";
import * as fs from "node:fs";

const TARGET_PORT = process.env.TARGET_PORT || "3000";

const PROXY_PORT = process.env.PROXY_PORT || "3001";

const KEY_PATH = ".cert/localhost.key";
const CERT_PATH = ".cert/localhost.crt";

if (!fs.existsSync(KEY_PATH) || !fs.existsSync(CERT_PATH)) {
  console.error(`${KEY_PATH} and/or ${CERT_PATH} not found.`);
  process.exit(1);
}

createProxyServer({
  target: {
    host: "localhost",
    port: parseInt(TARGET_PORT),
  },
  ssl: {
    key: fs.readFileSync(".cert/localhost.key"),
    cert: fs.readFileSync(".cert/localhost.crt"),
  },
  ws: true,
})
  .on("error", (e) => {
    console.error("Error while starting HTTPS proxy", e);
  })
  .listen(parseInt(PROXY_PORT));

console.log("Proxy server ready on", `https://localhost:${PROXY_PORT}`);
