
const BACKEND_URL = "https://team-sync-backend-n78w.onrender.com";

export default async function handler(req, res) {
  try {
    const incomingUrl = new URL(req.url, `https://${req.headers.host}`);
    const apiPath = incomingUrl.searchParams.get("path");

    if (!apiPath) {
      return res.status(400).json({
        success: false,
        message: "API path is missing",
      });
    }

    const targetUrl = new URL(`/api/${apiPath}`, BACKEND_URL);

    incomingUrl.searchParams.delete("path");
    targetUrl.search = incomingUrl.searchParams.toString();

    const headers = new Headers();

    for (const [key, value] of Object.entries(req.headers)) {
      if (
        !["host", "origin", "referer", "connection", "content-length"].includes(
          key.toLowerCase()
        ) &&
        value
      ) {
        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
    }

    let body;

    if (!["GET", "HEAD"].includes(req.method)) {
      const chunks = [];

      for await (const chunk of req) {
        chunks.push(chunk);
      }

      body = Buffer.concat(chunks);
    }

    const response = await fetch(targetUrl, {
      method: req.method,
      headers,
      body,
      redirect: "manual",
    });

    const responseBody = await response.arrayBuffer();

    response.headers.forEach((value, key) => {
      if (!["transfer-encoding", "content-encoding", "set-cookie"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    const cookies = response.headers.getSetCookie?.();

    if (cookies?.length) {
      res.setHeader("Set-Cookie", cookies);
    }

    res.status(response.status).send(Buffer.from(responseBody));
  } catch (error) {
    console.error("Proxy Error:", error);

    res.status(500).json({
      success: false,
      message: "Proxy request failed",
    });
  }
}
