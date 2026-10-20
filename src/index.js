export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === "/api/upload") {
      return new Response(JSON.stringify({ok:true, msg:"D1 aun no configurado, pero validador funciona local"}), {
        headers: {"Content-Type":"application/json"}
      });
    }
    // Servir el validador.html
    return env.ASSETS.fetch(request);
  }
}
