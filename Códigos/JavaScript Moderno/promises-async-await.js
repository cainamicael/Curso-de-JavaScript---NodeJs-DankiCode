//Promise
//Uma função que eu criei pode ser resolvida, me retornando  algo ou ela pode ser rejeitada
function testes(){
    return new Promise((resolve, reject)=>{
        const erro = false

        //passa pela validação

        if(erro){
            reject('A promisse foi rejeitada! Deu erro!');

        } else {
            resolve('A promise foi resolvida com sucesso');

        }

    })
}

testes()
.then(res => console.log(res)) //O then é se deu certo. A função retorna o resolve
.catch(rej => console.log(rej)) //O catch é se deu erro. A função retorna o reject

//Funções assíncronas
//Forma mais elegante de lidar com a promise

async function testes2() {
    //O await serve para dizer que o olá só será executado depois que a promise for resolvida
    await testes()
    .then((res)=> console.log(res))

    console.log('Olá')
}

testes2()