//Jeito antigo
var request = new XMLHttpRequest()
request.open('GET', 'https://jsonplaceholder.typicode.com/todos/1', true)

request.onload = () => {
    if(this.status >= 200 && this.status < 400){
        //request foi feita com sucesso
        var data = JSON.parse(this.response)
        console.log(data)

    } else {
        //erro
    }

}

request.onerror = () => {

}

request.send()//Enviar a requisição