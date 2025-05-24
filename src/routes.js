import { Database } from './database.js';
import { randomUUID } from 'node:crypto'; // UUID - universal unique identifier
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database()

/**
 * Rotas
 * Criamos um array de objetos que representam as rotas
 * Cada objeto tem um método, um caminho e um manipulador
 */

export const routes = [

    {
        method: "GET",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const users = database.select("users")

            return res.end(JSON.stringify(users)) // tranformando o array em JSON
        }
    }, 
    {
        method: "POST",
        path: buildRoutePath("/users"),
        handler: (req, res) => {
            const { name, email } = req.body

            const users = ({
                id: randomUUID(), 
                name,
                email,
            })

            database.insert("users", users)

            return res.writeHead(201).end() // 201 - Created
        }
    },
    {
        method: "PUT",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body
            
            database.update("users", id, {
                name,
                email
            })

            return res.writeHead(204).end() // 204 - No Content
        }
    },
    {
        method: "DELETE",
        path: buildRoutePath("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params
            
            database.delete("users", id)

            return res.writeHead(204).end() // 204 - No Content
        }
    }

]
