const BACKEND_URL = "https://team-sync-backend-n78w.onrender.com";

export default async function handler(req, res) {
  try {
    const requestPath = req.url.replace(/^\/api/, "");
    const targetUrl = `${BACKEND_URL}/api${requestPath}`;

    const headers = new Headers();

    // Forward required headers, but don't forward browser Origin
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

    // Forward response headers
    response.headers.forEach((value, key) => {
      if (!["transfer-encoding", "content-encoding"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    // Preserve authentication cookies
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
