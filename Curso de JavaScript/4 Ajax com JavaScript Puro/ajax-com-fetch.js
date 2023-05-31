//GET
fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(json => console.log(json))

//POST
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
        title: 'DankiCode',
        body: 'Meu conteúdo',
        userId: 10 
    }),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
})
.then(response => response.json())
.then(json => console.log(json))