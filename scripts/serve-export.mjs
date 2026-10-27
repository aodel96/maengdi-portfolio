// Local validation server for the exact static files uploaded to GitHub Pages.
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";

const root = resolve("out");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH ?? "/maengdi-portfolio";
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".json": "application/json",
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url, "http://local.test").pathname,
    );
    if (pathname !== prefix && !pathname.startsWith(`${prefix}/`))
      throw new Error("Outside base path");
    let filename = resolve(root, `.${pathname.slice(prefix.length) || "/"}`);
    if (filename !== root && !filename.startsWith(`${root}${sep}`))
      throw new Error("Invalid path");
    if ((await stat(filename)).isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(308, { location: `${pathname}/` });
        response.end();
        return;
      }
      filename = resolve(filename, "index.html");
    }
    const body = await readFile(filename);
    response.writeHead(200, {
      "content-type": types[extname(filename)] ?? "application/octet-stream",
      "cache-control": "no-store",
    });
    response.end(body);
  } catch {
    const body = await readFile(resolve(root, "404.html")).catch(
      () => "Not found",
    );
    response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    response.end(body);
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Static export validation server ready on port ${port}`),
);
