// Fails when an SDK route has a different path or HTTP verb than the upstream routers.
// Needs the upstream clone: git clone https://github.com/evolution-foundation/evolution-api refs/evolution-api
// Run: bun scripts/check-routes.ts
import { readdirSync, readFileSync } from "node:fs";
import { Routes } from "../src/api/routes";

const upstream = "refs/evolution-api/src/api";
// Router file -> mount path (see routes/index.router.ts and integrations/event/*)
const mounts: Record<string, string> = {
  "routes/chat.router.ts": "chat",
  "routes/group.router.ts": "group",
  "routes/sendMessage.router.ts": "message",
  "routes/instance.router.ts": "instance",
  "routes/label.router.ts": "label",
  "routes/proxy.router.ts": "proxy",
  "routes/settings.router.ts": "settings",
  "routes/template.router.ts": "template",
  "routes/business.router.ts": "business",
  "routes/call.router.ts": "call",
  "integrations/event/webhook/webhook.router.ts": "webhook",
};

const verbs = new Set<string>();
for (const [file, mount] of Object.entries(mounts)) {
  const source = readFileSync(`${upstream}/${file}`, "utf8");
  for (const [, verb, name] of source.matchAll(/\.(get|post|put|delete|patch)\(\s*this\.routerPath\('([^']+)'/g)) {
    verbs.add(`${verb.toUpperCase()} ${mount}/${name}`);
  }
}
verbs.add("POST instance/create"); // registered without routerPath()

const used = new Set<string>();
const modules = readdirSync("src/modules", { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith("index.ts"));
for (const file of modules) {
  const source = readFileSync(`src/modules/${file}`, "utf8");
  for (const [, verb, group, name] of source.matchAll(/this\.api\.(get|post|put|delete|patch)\(\s*Routes\.(\w+)\.(\w+)/g)) {
    const path = (Routes as Record<string, Record<string, string>>)[group]?.[name];
    used.add(`${verb.toUpperCase()} ${path ?? `Routes.${group}.${name}`}`);
  }
}

const missing = [...used].filter((r) => !verbs.has(r));
for (const route of missing) console.error(`SDK route not found upstream: ${route}`);
if (missing.length) process.exit(1);
console.log(`${used.size} SDK routes match upstream`);
