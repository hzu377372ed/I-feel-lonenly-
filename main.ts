addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(req: Request) {
  const upgrade = req.headers.get("upgrade") || "";
  if (upgrade.toLowerCase() !== "websocket") {
    return new Response("Only WebSocket connections are supported", { status: 400 });
  }

  const { socket, response } = Deno.upgradeWebSocket(req);

  const target = new WebSocket("ws://377dc0dd-sva740-tbrhck-1thqb.hk.p5pv.com:80/", [
    "vmess"
  ]);

  socket.onmessage = msg => target.send(msg.data);
  target.onmessage = msg => socket.send(msg.data);

  socket.onclose = () => target.close();
  target.onclose = () => socket.close();

  socket.onerror = () => target.close();
  target.onerror = () => socket.close();

  return response;
}
