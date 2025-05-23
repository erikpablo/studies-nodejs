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

export class Database {
    #database = {}

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

        return data
    }
}