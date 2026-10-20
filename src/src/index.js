export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/upload" && request.method === "POST") {
      try {
        const data = await request.json();
        const stmt = env.DB.prepare(
          `INSERT INTO validacion_suplentes (matricula,nombre,fecha_asistencia,unidad,tiene_contrato,contrato_que_ampara,procede_pago) VALUES (?,?,?,?,?,?,?)`
        );
        let con=0, sin=0;
        for(const r of data){
          const tiene = r.tiene_contrato?1:0;
          if(tiene) con++; else sin++;
          await stmt.bind(String(r.matricula||''), r.nombre||'', r.fecha_asistencia||'', r.unidad||'', tiene, r.contrato_que_ampara||'', r.procede_pago||'').run();
        }
        return new Response(JSON.stringify({ok:true, total:data.length, con_contrato:con, sin_contrato:sin}), {headers:{"Content-Type":"application/json"}});
      } catch(e){
        return new Response(JSON.stringify({error:e.message}), {status:500});
      }
    }
    return env.ASSETS.fetch(request);
  }
}
