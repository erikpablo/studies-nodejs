import http from 'node:http'; 

/**
 * module interno http
 * type: module / EsModule => import/export
 * node:
 * req = ira receber toda a requisição que esta sendo feita no servidor
 * res = ira receber toda a resposta que o servidor vai dar
 * --watch = usado para reiniciar o servidor toda vez que houver uma alteração no código
 */

/**
 * HTTP
 *    Metodo http
 *    URL
 */
// GET, POST, PUT, PATCH, DELETE


// stateful - stateless

// JSON -javaScript object notation

// Cabeçalhos  (req, res) => metadados

/**
 * HTTP status codes
 * - 200 - OK 
 * - 201 - Created
 * - 301 - rota muda premanentemente 
 * - 302 - rota muda temporariamente
 * - 400 - Bad Request
 * - 401 - Unauthorized
 * - 403 - Forbidden
 * - 404 - Not Found
 * - 500 - Internal Server Error
 * - 503 - Service Unavailable
 */

const users = [];


// creat server
const server = http.createServer( async (req, res) => {
   const { method, url } = req
   
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


   if(method === "GET" && url === "/users") {
      return res
         .setHeader('Content-Type', 'application/json') // definindo o cabeçalho da resposta 
         .end(JSON.stringify(users)) // tranformando o array em JSON
   } 

   if(method === "POST" && url === "/users") {

      const { name, email } = req.body

      users.push({
         id: 1, 
         name,
         email,
      })

      return res.writeHead(201).end() // 201 - Created
   }

   return res.writeHead(404).end("Not Found") // 404 - Not Found
})

server.listen(3333)
