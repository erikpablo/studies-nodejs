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
const server = http.createServer((req, res) => {
   const { method, url } = req
   console.log(method, url)

   if(method === "GET" && url === "/users") {
      return res
         .setHeader('Content-Type', 'application/json') // definindo o cabeçalho da resposta 
         .end(JSON.stringify(users)) // tranformando o array em JSON
   } 

   if(method === "POST" && url === "/users") {
      users.push({
         id: 1, 
         name: "Erik",
         email: "eriknunes@hmail.com"
      })

      return res.writeHead(201).end() // 201 - Created
   }

   return res.writeHead(404).end("Not Found") // 404 - Not Found
})

server.listen(3333)
