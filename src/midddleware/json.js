export async function json(req, res) {
    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    /**
     * body esta vindo como texto
     * dessa forma precisamos tranformar em JSON
     * --JSON.parse()
     * 
     * o codico ta tentando executar ate mesmo quando o body não existe
     * podemos usar o try catch para evitar isso
     * 
     * criamos uma nova propriédade dentro do req sendo req.body
     * 
     */

    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
      req.body = null
    }

    res.setHeader('Content-Type', 'application/json') // definindo o cabeçalho da resposta 
}

/**
 * midddleware
 *  - interceptador
 *  - intercepta a requisição
 * 
 * --
 */