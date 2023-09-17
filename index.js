const logIn = document.getElementById('logIn');

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
let usuarix;

function validar(paramUser, paramPass) {

    for (i = 0; i < datosUsuarios.length; i++) {

        if (paramUser == datosUsuarios[i].user && paramPass == datosUsuarios[i].password) {

            console.log('Bienvenid@')
            usuarioValidado = true;
            usuarix = i;

        } else if (paramUser == datosUsuarios[i].user && paramPass != datosUsuarios[i].password) {

            mostrarError('Password');
            console.log('Contraseña incorrecta');

        } else if (paramUser != datosUsuarios[i].user && paramPass == datosUsuarios[i].password) {

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

function actualizarPantalla(anterior, siguiente) {

    let elemento = document.getElementById(anterior)
    let elemento2 = document.getElementById(siguiente)

    elemento.classList.add('hide')
    elemento2.classList.remove('hide')

}

function Regresar(anterior, siguiente) {

    const botonesRegresar = document.querySelectorAll('.Regresar');

    botonesRegresar.forEach((boton) => {
       
        boton.addEventListener('click', function () {

            actualizarPantalla(anterior, siguiente);

        });

    });

}

function consultarSaldo() {

    actualizarPantalla('menu', 'Saldo');

    const miSaldo = document.getElementById('miSaldo');
    miSaldo.textContent = '$' + datosUsuarios[usuarix].saldo;

    Regresar('Saldo','menu');

}

function Retirar(){

    consultarSaldo();

    let elemento = document.getElementById('Retirar');
    elemento.classList.remove('hide');

    let elemento2 = document.getElementById('errorResta');
    elemento2.classList.add('hide');

    let elemento3 = document.getElementById('errorDatos');
    elemento3.classList.add('hide');

    const retirarBoton = document.getElementById('retirarBoton');
 
    retirarBoton.removeEventListener('click', retirarHandler);
    retirarBoton.addEventListener('click', retirarHandler);

    Regresar('Retirar','menu');

} 

 function retirarHandler(){

    let montoRetirar = parseFloat(document.getElementById('montoRetirar').value);

    if((datosUsuarios[usuarix].saldo - montoRetirar) >= 10 && montoRetirar > 0){

        console.log(montoRetirar);
        datosUsuarios[usuarix].saldo = datosUsuarios[usuarix].saldo - montoRetirar;
        miSaldo.textContent = '$' + datosUsuarios[usuarix].saldo;

    }else if((datosUsuarios[usuarix].saldo - montoRetirar) < 10) {

        mostrarError('Resta');

    }else{

        mostrarError('Datos');

    }

}

function Ingresar(){

    consultarSaldo();

    let elemento = document.getElementById('Ingresar');
    elemento.classList.remove('hide');

    let elemento2 = document.getElementById('errorSuma');
    elemento2.classList.add('hide');

    let elemento3 = document.getElementById('errorDatos');
    elemento3.classList.add('hide');

    const ingresarBoton = document.getElementById('ingresarBoton');

    ingresarBoton.removeEventListener('click', ingresarHandler);
    ingresarBoton.addEventListener('click', ingresarHandler);

    Regresar('Ingresar','menu');

}

function ingresarHandler(){

    let montoSumar = parseFloat(document.getElementById('montoSumar').value);

    if((datosUsuarios[usuarix].saldo + montoSumar) <= 990 && montoSumar > 0 ){

        console.log(montoSumar);
        datosUsuarios[usuarix].saldo = datosUsuarios[usuarix].saldo + montoSumar;
        miSaldo.textContent = '$' + datosUsuarios[usuarix].saldo;

    }else if((datosUsuarios[usuarix].saldo + montoSumar) > 990) {

        mostrarError('Suma');

    }else{

        mostrarError('Datos');

    }

}

function menu() {

    if (usuarioValidado) {

        actualizarPantalla('logIn', 'menu');
        document.body.classList.add("cambioDeFondo");

        document.getElementById('consultarSaldo').addEventListener('click', function () {

            seleccion = 1;
            console.log(seleccion);
            consultarSaldo();

        });

        document.getElementById('retirarDinero').addEventListener('click', function () {

            seleccion = 2;
            console.log(seleccion);
            Retirar();

        });

        document.getElementById('ingresarDinero').addEventListener('click', function () {

            seleccion = 3;
            console.log(seleccion);
            Ingresar();

        });


    }

}



logIn.addEventListener('submit', (evento) => {

    evento.preventDefault()
    let usuarioInput = document.getElementById('usuario').value
    let passwordInput = document.getElementById('password').value
    validar(usuarioInput, passwordInput);
    menu();

})


