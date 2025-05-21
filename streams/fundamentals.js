/**
 * process /variavel global do node
 * stdin - todos os dados digitados no terminal / leitura
 * stdout - todos os dados que são exibidos no terminal / escrita
 * 
 * pipi - encaminhar dados de um processo para outro
 * Streams --> 
 */

// process.stdin
//     .pipe(process.stdout) //  estamos pegando a entrada e jogando na saida

/**
 * toda streams readable 
 * --metato obrigatorio
 * ---_read - ira retorna os dados da stream
 * 
 * push() - ira enviar os dados para quem estiver utilizando a stream
 * 
 * streams nao recebe dados primitivos 
 * usado o buffer - string
 */

import { Readable, Writable, Transform } from 'stream'

class OneToHundredStream extends Readable {
    index = 1
    
    _read() {
        const i = this.index++

        // setTimeout - simula uma operação assíncrona
        setTimeout(() => {

            if(i > 100) {
                this.push(null) // null - sinaliza que a stream acabou
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 1000)
    }
}


/**
 * streams de transformação
 * --metato obrigatorio
 * ---_transform - ira transformar os dados da stream
 * ----ira receber parametros
 * ----chunk - dados que estão sendo enviados
 * ----encoding - codificação do buffer
 * ----callback - ira chamar quando terminar de escrever
 * parametros do callback
 * ----null - ira parar a stream, mais podemos encaminhar o erro
 * ----o dado transformado
 * 
 * 
 * Obrigadorio ela precisa ler dados de algum lugar e escrever em outro lugar
 */


class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}



/**
 * Writable - stream de escrita
 * --metato obrigatorio
 * ---_write - ira receber os dados da stream
 * ----ira receber parametros
 * ----chunk - dados que estão sendo enviados
 * ----encoding - codificação do buffer
 * ----callback - ira chamar quando terminar de escrever
 * 
 * streams de escrita nao retorna nada
 * -procesa o dado e nem transforma em outra coisa 
 */

class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }
}



new OneToHundredStream()
    .pipe(new InverseNumberStream()) // encadeando as streams
    .pipe(new MultiplyByTenStream()) // encadeando as streams
