// main.ts - V2Ray Deno server

import { startV2Ray } from "https://deno.land/x/v2ray_deno/mod.ts";

await startV2Ray({
  log: {
    loglevel: "info",
  },
  inbounds: [
    {
      port: 8080, // المنفذ المحلي اللي رح تتصل منه
      listen: "0.0.0.0",
      protocol: "socks",
      settings: {
        udp: true,
      },
    },
  ],
  outbounds: [
    {
      protocol: "vmess",
      settings: {
        vnext: [
          {
            address: "377dc0dd-sva740-tbrhck-1thqb.hk.p5pv.com", // Host
            port: 80,
            users: [
              {
                id: "4f4c6876-fcf6-11ef-94aa-f23c913c8d2b", // UUID
                alterId: 2,
                security: "auto",
              },
            ],
          },
        ],
      },
      streamSettings: {
        network: "ws",
        wsSettings: {
          path: "/",
          headers: {
            Host: "377dc0dd-sva740-tbrhck-1thqb.hk.p5pv.com",
          },
        },
        tlsSettings: {
          serverName: "broadcastlv.chat.bilibili.com", // SNI
        },
        security: "",
      },
    },
  ],
});
