export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      
      // API dummy para que no truene
      if (url.pathname === "/api/upload") {
        return new Response(JSON.stringify({ok:true}), {
          headers: {"Content-Type":"application/json", "Access-Control-Allow-Origin": "*"}
        });
      }

      // Intentar servir archivos estáticos
      if (env.ASSETS) {
        let res = await env.ASSETS.fetch(request);
        // Si entra a / y no hay index.html, mándalo al validador
        if (res.status === 404) {
          const fallback = new Request(new URL("/validador.html", request.url), request);
          res = await env.ASSETS.fetch(fallback);
        }
        return res;
      }

      return new Response("ASSETS no configurado", {status: 500});
      
    } catch (e) {
      return new Response("ERROR WORKER: " + e.message + "\n" + e.stack, {
        status: 500,
        headers: {"Content-Type":"text/plain"}
      });
    }
  }
}
