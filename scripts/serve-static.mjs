import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const basePath = "/MY-WEBSITE";
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const serverInstance = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname === basePath) pathname = basePath + "/";
    if (!pathname.startsWith(basePath + "/")) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const relative = pathname.slice(basePath.length);
    let filePath = path.resolve(root, "." + relative);
    if (filePath !== root && !filePath.startsWith(root + path.sep)) {
      response.writeHead(400);
      response.end("Bad path");
      return;
    }

    try {
      const info = await stat(filePath);
      if (info.isDirectory()) filePath = path.join(filePath, "index.html");
    } catch {
      if (!path.extname(filePath)) filePath = path.join(filePath, "index.html");
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": mime[path.extname(filePath).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

serverInstance.listen(port, "127.0.0.1", () => {
  process.stdout.write("Static portfolio test server listening on " + port + "\n");
});
