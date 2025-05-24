/**
 * Gerador dinâmico de rotas
 * para identificar os parâmetros dinâmicos na URL, como /users/:id
 * 
 * regex
 * /([a-zA-Z]+)/g dize que a string pode ter letras de A a Z, maiúsculas ou minúsculas
 * regex é uma expressão regular que é usada para encontrar padrões em strings
 * dizemos que apos os : podem vir letras de A a Z, maiúsculas ou minúsculas
 * g diz que é global, ou seja, pode ter mais de um parâmetro
 * 
 */

/**
 * replaAll(routeParametersRegex), ou sej, vou encontrar todos os parâmetros dinâmicos na URL
 * e vou substituir por uma string que é outra regex
 * ou seja, vou substituir :id por ([a-zA-Z0-9_]+)
 * ou seja, vou substituir :id por uma regex que diz que pode ter letras de A a Z, 
 * números de 0 a 9 e _
 */

export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9-_]+)')

    // RegExp é uma class usado para iniciar o regex 
    // toda regex tem o metodo test que vai retorna true ou false

    const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)

    return pathRegex
}
