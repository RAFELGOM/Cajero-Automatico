const logIn = document.getElementById('logIn')

const datosUsuarios = [

    {

        user: 'Rafa',
        password: '123',
        saldo: 20

    },

    {

        user: 'Migue',
        password: '12384',
        saldo: 500

    },
    
    {

        user: 'Xime',
        password: '85123',
        saldo: 30

    }
]
let usuarioValidado = false; 
let seleccion = 0;

function validar(paramUser,paramPass) {
    
    for(let i = 0; i < datosUsuarios.length; i++ ){

        if(paramUser == datosUsuarios[i].user && paramPass == datosUsuarios[i].password){

            console.log('Bienvenid@')
            usuarioValidado = true;

        }else if(paramUser == datosUsuarios[i].user && paramPass != datosUsuarios[i].password){

            mostrarError('Password');
            console.log('Contraseña incorrecta');

        }else if(paramUser != datosUsuarios[i].user && paramPass == datosUsuarios[i].password){

            mostrarError('Usuario');
            console.log('Usuario incorrecto');
        }

    }

}

function mostrarError(tipo) {

    let tipoDeError = document.getElementById(`error${tipo}`)

    tipoDeError.classList.remove('hide')
    tipoDeError.classList.add('error')
    
}

function actualizarPantalla(anterior,siguiente){

    let elemento = document.getElementById(anterior)
    let elemento2 = document.getElementById(siguiente)

    elemento.classList.add('hide')
    elemento2.classList.remove('hide')

}

function consultarSaldo (){

    if(seleccion == 1){

        actualizarPantalla('menu','cs');

    }

}

function menu (){
    
    if(usuarioValidado){

        actualizarPantalla('logIn','menu');

        document.getElementById('consultarSaldo').addEventListener('click', function() {
        
            seleccion = 1;
            console.log(seleccion);
            consultarSaldo();
        });
        
        document.getElementById('retirarDinero').addEventListener('click', function() {
        
            seleccion = 2;
            console.log(seleccion);
        
        });
        
        document.getElementById('ingresarDinero').addEventListener('click', function() {
            
            seleccion = 3;
            console.log(seleccion);
        
        });


    }

}



logIn.addEventListener('submit', (evento)=>{

    evento.preventDefault()
    let usuarioInput = document.getElementById('usuario').value
    let passwordInput = document.getElementById('password').value
    validar(usuarioInput, passwordInput);
    menu();

})


