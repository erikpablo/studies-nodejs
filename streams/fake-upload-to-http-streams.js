import { Readable } from 'node:stream'


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
 * fetch - ira fazer uma requisição para o servidor
 * -passa a url do servidor
 * -metado POST
 * --ira receber no body os dados da stream
 */

fetch("http://localhost:3000", {
    method: "POST",
    body: new OneToHundredStream(),
    duplex: "half"
})