import fs from 'node:fs/promises'  // Importando o módulo fs do Node.js para manipulação de arquivos

/**
 * persist() - ira escrver os dados no arquivo fisico
 * -- dentro 
 * ---fs.writeFile - escreve os dados no arquivo
 * 
 * ira ser chamado sempre que houver uma alteração no banco de dados
 * --sempre que inserir 
 * 
 * importa meta url ira retorna o caminho do arquivo
 * 
 * class interna do node chamado url / costrutora
 * 
 * new URL(node do arquivo do final, import.meta.url/local)
 * 
 * agora queremos que os arquvios do banco sejam salvos
 * 
 * -- criamos um constrututor 
 * ---- criamos o readFile recebdo o databasePath para ser 
 * e usando o then pegamos os dados e salvamos dentro do database
 * ---usando o catch podemos pegar o dado e passar mesmo estando vazio 
 * 
 */

const databasePath = new URL('../db.json', import.meta.url) // Importando o caminho do arquivo db.json


export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data)
            })
            .catch(() => {
                this.#persist()
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }
    
    select(table) {
        const data = this.#database[table] ?? []
        
        return data
    }
    
    insert(table, data) {
        if(Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
        
        return data
    }

    /**
     * findIndex
     * - usado para encontrar o index do elemento que queremos
     * -pecoremos o array e retornamos o index
     * 
     * splice
     * - usado para remover o elemento do array
     * 
     */

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

}



    /**
     * Banco de dados 
     * -Usado para armazenar os dados do usuário
     * 
     * criamos o datatbase = {}
     * 
     * select() {}
     * - usado para selecionar os dados
     * 
     * insert() {}
     * -usado para a insersão de dados
     * 
     * LEMBRA QUE [NAME] TAMBEM ACESSAMOS DADOS DE OBJETO
     */
