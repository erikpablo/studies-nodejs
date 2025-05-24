import http from 'node:http'; 
import { json } from './midddleware/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

/**
 * 3 forma do front enviar informações para o back
 * -- query params
 * -- route params
 * -- request body
 */

/**
 * Query params:
 * -São parâmetros que são enviados na URL após o símbolo de interrogação (?)
 * ---ex: http://localhost:3333/users?usersId=1&name=lucas
 * ---sao parametros nomeados 
 * ---com o & é possivel passar mais de um parametro
 * 
 * Route params:
 * -São parâmetros que são enviados na URL como parte do caminho
 */

// creat server
const server = http.createServer( async (req, res) => {
   const { method, url } = req
   
   await json(req, res)
   
   /**
    * Usando o find para encontrar a rota que foi chamada
    * 
    * Dessa forma o route sera um objeto que tem o método, o caminho e o manipulador
    * podendo ser acessado pelo .method, .path e .handler
   */
  
  const route = routes.find(route => {
      return route.method === method && route.path.test(url)
   })
   
   if(route) {
      const routeParams = req.url.match(route.path) // match vai retornar um array com os valores que foram encontrados

      // console.log(extractQueryParams(routeParams.groups.query)) // extrai os parametros de consulta da URL

      const { query, ...params } = routeParams.groups // extrai os parametros de consulta da URL e os outros parametros


      req.params = params
      req.query = query ? extractQueryParams(query) : {}

      return route.handler(req, res)
   }
   
   return res.writeHead(404).end("Not Found") // 404 - Not Found
})

server.listen(3333)



// ANOTACOES DE AULAS PASSADAS 

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
