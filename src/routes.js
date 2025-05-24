import { Database } from './database.js';
import { randomUUID } from 'node:crypto'; // UUID - universal unique identifier

const database = new Database()

/**
 * Rotas
 * Criamos um array de objetos que representam as rotas
 * Cada objeto tem um método, um caminho e um manipulador
 */

export const routes = [

    {
        method: "GET",
        path: "/users",
        handler: (req, res) => {
            const users = database.select("users")

            return res.end(JSON.stringify(users)) // tranformando o array em JSON
        }
    }, 
    {
        method: "POST",
        path: "/users",
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
    }

]
