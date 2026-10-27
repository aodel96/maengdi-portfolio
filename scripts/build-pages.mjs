import { spawn } from "node:child_process";
import { writeFile } from "node:fs/promises";

const child = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH:
        process.env.NEXT_PUBLIC_BASE_PATH ?? "/maengdi-portfolio",
      NEXT_PUBLIC_SITE_URL:
        process.env.NEXT_PUBLIC_SITE_URL ??
        "https://aodel96.github.io/maengdi-portfolio",
    },
  },
);

child.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});
child.on("exit", async (code) => {
  if (code !== 0) {
    process.exitCode = code ?? 1;
    return;
  }
  try {
    await writeFile("out/.nojekyll", "");
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
});
