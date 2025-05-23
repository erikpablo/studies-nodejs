import http from 'node:http'; 
import { randomUUID } from 'node:crypto'; // UUID - universal unique identifier
import { json } from './midddleware/json.js';
import { Database } from './database.js';

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

const database = new Database


// creat server
const server = http.createServer( async (req, res) => {
   const { method, url } = req

   await json(req, res)

   if(method === "GET" && url === "/users") {
      const users = database.select("users")

      return res.end(JSON.stringify(users)) // tranformando o array em JSON
   } 

   if(method === "POST" && url === "/users") {

      const { name, email } = req.body

      const users = ({
         id: randomUUID(), 
         name,
         email,
      })

      database.insert("users", users)

      return res.writeHead(201).end() // 201 - Created
   }

   return res.writeHead(404).end("Not Found") // 404 - Not Found
})

server.listen(3333)
