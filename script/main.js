
document.addEventListener('DOMContentLoaded', function () {
    const container = document.createElement('div');
    // container.className = 'container mt-5';

    container.innerHTML = `
      <div class="container d-flex justify-content-center align-items-center min-vh-100 min-vw-100 bg-danger-subtle">
    <div id="contenedor" class="card p-4 shadow w-75 w-md-75 w-lg-50 bg-danger">
        <h1 class="card-title text-center">Calculadora de IMC</h1>
        <div class="form-group text-center fs-3">
            <label for="weight">Peso (kg):</label>
            <input type="number" id="weight" class="form-control text-center" step="0.1">
        </div>
        <div class="form-group text-center fs-3">
            <label for="height">Altura (cm):</label>
            <input type="number" id="height" class="form-control text-center" step="0.1">
        </div>
        <button class="btn btn-info btn-block mt-5 fs-2 bg-danger-subtle" onclick="calculateBMI()">Calcular IMC</button>
        <div id="result" class="mt-3 text-center">
            <label for="height"></label>
            <input type="number" class="form-control" step="0.1">
        </div>
    </div>
</div>

    `;

    document.body.appendChild(container);
})

function calculateBMI() {
    const weight = document.getElementById('weight').value;
    const height = document.getElementById('height').value;

    if (weight > 0 && height > 0) {     
        const heightInMeters = height / 100;
        const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
        document.getElementById('result').innerText = 'Tu IMC es: ' +bmi;
    } else {
        document.getElementById('result').innerText = 'Por favor, ingresa valores válidos.';
    }
}



//////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function() {

    const container = document.createElement('div')
    // container.className = 'container mt-5'

    container.innerHTML = `
    <div class="container d-flex justify-content-center align-items-center min-vh-100 min-vw-100 bg-warning">
    <div id="contenedor" class="card p-4 text-warning shadow w-75 w-md-75 w-lg-50 bg-dark">
        <h1 class="text-center mb-4">Convertidor de Moneda</h1>
        <div class="row justify-content-center">
            <div class="col-md-6 fs-3">
                <div class="mb-3 text-warning text-center">
                    <label for="cantidad" class="form-label">Monto</label>
                    <input type="number" class="form-control" id="cantidad" placeholder="Ingrese el monto">
                </div>
                <div class="mb-3 text-warning text-center">
                    <label for="conversion" class="form-label">Convertir</label>
                    <select class="form-select" id="conversion">
                        <option value="dollar-to-peso">De Dólar a Peso</option>
                        <option value="peso-to-dollar">De Peso a Dólar</option>
                    </select>
                </div>
                <button class="btn btn-warning text-dark w-100 fs-5" id="convertBtn">Convertir</button>
                <h2 class="mt-3 text-center text-warning" id="resultCambio"></h2>
            </div>
        </div>
    `;

    
    document.body.appendChild(container)


    function convert() {
        const cantidad = parseFloat(document.getElementById('cantidad').value)
        const conversion = document.getElementById('conversion').value
        const exchangeRateDollarToPeso = 4139.75
        const exchangeRatePesoToDollar = 1 / exchangeRateDollarToPeso
        let resultCambio 
        if (isNaN(cantidad) || cantidad <= 0) {
            resultCambio = 'Por favor, ingrese un monto válido'
        } else {
            if (conversion === 'dollar-to-peso') {
                resultCambio = cantidad+ ' dólares son ' + (cantidad * exchangeRateDollarToPeso).toFixed(2) +' pesos'
            } else if (conversion === 'peso-to-dollar') {
                resultCambio = cantidad+ ' pesos son ' +(cantidad * exchangeRatePesoToDollar).toFixed(2)+ ' dólares'
            }
        }
        document.getElementById('resultCambio').textContent = resultCambio
    }

    document.getElementById('convertBtn').addEventListener('click', convert);
});


///////////////////////////////////////////////////

let notas = [
    { id: 1, titulo: "tarea 1", texto: "Esta es la primera tarea", realizada: false },
    { id: 2, titulo: "tarea 2", texto: "Esta es la segunda tarea", realizada: true }
];

let idGlobal = 2;

function crearInterfaz() {
    const container3 = document.getElementById('container');
    container3.innerHTML = `
        <div class="container mt-5 bg-warning">
            <h1 class="mb-4 text-center">Aplicación de Notas</h1>
            <div class="row mb-3">
                <div class="col-md-12">
                    <input type="text" id="titulo" class="form-control mb-2 text-center fs-4 text-bg-light" placeholder="Título">
                    <textarea id="texto" class="form-control mb-2 text-center  fs-4 text-bg-ligth" placeholder="Texto de la nota"></textarea>
                    <button onclick="guardarNota()" class="btn btn-dark me-2">Guardar</button>
                    <button onclick="limpiarCampos()" class="btn btn-secondary">Limpiar</button>
                </div>
                <div class="col-md-12 mt-3">
                    <input type="text" id="filtro-texto" class="form-control mb-2 text-center text-bg-light" placeholder="Buscar notas" oninput="aplicarFiltros()">
                    <div class="form-check form-switch">
                        <input type="checkbox" id="filtro-realizadas" class="form-check-input bg-secondary" onchange="aplicarFiltros()">
                        <label class="form-check-label" for="filtro-realizadas">Mostrar solo las tareas realizadas</label>
                    </div>
                </div>
            </div>
            <div id="contenedor-notas" class="row"></div>
        </div>
    `;
}

function pintarNotas(notasFiltradas = notas) {
    const contenedor = document.getElementById("contenedor-notas");
    contenedor.innerHTML = "";

    if (notasFiltradas.length === 0) {
        contenedor.innerHTML = '<div class="col-12 text-center"><p class="alert alert-info">NO HAY NOTAS PARA MOSTRAR</p></div>';
        return;
    }

    notasFiltradas.forEach(nota => {
        const notaElement = document.createElement('div');
        notaElement.className = 'col-md-4 mb-3';
        notaElement.innerHTML = `
            <div class="card bg-dark">
                <div class="card-body">
                    <h5 class="card-title text-white">${nota.titulo}</h5>
                    <p class="card-text text-white">${nota.texto}</p>
                    <div class="form-check mb-2 text-white">
                        <input type="checkbox" class="form-check-input bg-secondary" ${nota.realizada ? 'checked' : ''} onchange="marcarRealizada(${nota.id})">
                        <label class="form-check-label">Realizada</label>
                    </div>
                    <button onclick="borrarNota(${nota.id})" class="btn btn-warning btn-sm">Borrar nota</button>
                </div>
            </div>
        `;
        contenedor.appendChild(notaElement);
    });
}

function agregarNota(titulo, texto) {
    idGlobal++;
    const nuevaNota = { id: idGlobal, titulo, texto, realizada: false };
    notas.push(nuevaNota);
}

function guardarNota() {
    const titulo = document.getElementById("titulo").value;
    const texto = document.getElementById("texto").value;
    
    if (titulo.trim() !== "" && texto.trim() !== "") {
        agregarNota(titulo, texto);
        aplicarFiltros();
        limpiarCampos();
    } else {
        alert("Por favor, completa todos los campos");
    }
}

function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    aplicarFiltros();
}

function limpiarCampos() {
    document.getElementById("titulo").value = "";
    document.getElementById("texto").value = "";
}

function marcarRealizada(id) {
    const nota = notas.find(nota => nota.id === id);
    if (nota) {
        nota.realizada = !nota.realizada;
        aplicarFiltros();
    }
}

function filtrarPorRealizada(array) {
    return array.filter(nota => nota.realizada);
}

function filtrarPorTexto(array, texto) {
    if (!texto) return array;
    return array.filter(nota => 
        nota.titulo.toLowerCase().includes(texto.toLowerCase()) || 
        nota.texto.toLowerCase().includes(texto.toLowerCase())
    );
}

function aplicarFiltros() {
    const textoFiltro = document.getElementById("filtro-texto").value;
    const soloRealizadas = document.getElementById("filtro-realizadas").checked;

    let notasFiltradas = [...notas];

    if (soloRealizadas) {
        notasFiltradas = filtrarPorRealizada(notasFiltradas);
    }

    notasFiltradas = filtrarPorTexto(notasFiltradas, textoFiltro);

    pintarNotas(notasFiltradas);
}

document.addEventListener("DOMContentLoaded", () => {
    crearInterfaz();
    aplicarFiltros();
});


