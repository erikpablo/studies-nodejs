import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
        _transform(chunk, encoding, callback) {
            const transformed = Number(chunk.toString()) * -1

            console.log(transformed)

            callback(null, Buffer.from(String(transformed)))
        }
    }

// Todo no node sao streams
// todas as requisições e respostas são streams

// req => stream de leitura
// res => stream de escrita

const server = http.createServer( async (req, res) => {
    /**
     * creiamos um const de buffer
     * --e usando o for await
     * --para ler os dados do req e aguardar ele por completo
     * * --e armazenar no buffer
     * 
     * await - aguarda a stream ser lida por completo
     */

    const buffers = []

    for await (const chunk of req) {
        buffers.push(chunk)
    }

    /**
     * Buffer.concat - concatena todos os buffers
     * - e transforma em uma string
     */

    const fullStreamContent = Buffer.concat(buffers).toString()

    console.log(fullStreamContent)

    return res.end(fullStreamContent)

})

server.listen(3334)
