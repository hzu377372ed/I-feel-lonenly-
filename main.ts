import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  
  const upstream = "public.approvedcard.xyz";
  const port = 443;
  const uuid = "fc151ca7-08e3-4f76-aae4-6a1b50d34282";
  const path = "/public";

  // تعديل مسار الاتصال
  url.hostname = upstream;
  url.port = port.toString();
  url.protocol = "wss:";

  const proxyUrl = `${url.protocol}//${url.hostname}:${url.port}${path}${url.search}`;
  
  const headers = new Headers(req.headers);
  headers.set("Host", upstream);

  return await fetch(proxyUrl, {
    method: req.method,
    headers,
    body: req.body,
  });
});
