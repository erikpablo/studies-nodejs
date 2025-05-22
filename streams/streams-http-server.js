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

const server = http.createServer((req, res) => {
    return req
        .pipe(new InverseNumberStream())
        .pipe(res)
})

server.listen(3334)
