document.addEventListener("DOMContentLoaded", () => {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
    const
        listaMaterias = document.querySelector('#listaMaterias'),
        listaEstudents = document.querySelector('#listaEstudents'),
        titleEstudent = document.querySelector('.cantidadEstudiantes'),
        selFiltro = document.querySelector('#selFiltro'),
        titleProgram = document.querySelector('.cantidadProgramas'),
        btnInfoEstudent = document.querySelector('#infoEstudiante'),
        btnInfoMateria = document.querySelector('#infoMateria'),
        btnInfoPrograma = document.querySelector('#infoPrograma'),
        contenTablaEstudiante = document.querySelector('#contentTableE'),
        contenTablaMateria = document.querySelector('#contentTableM'),
        contenTablaProgram = document.querySelector('#contentTableP'),
        contentGraficas = document.querySelector('#contentGraficas'),
        bodyTablaE = document.querySelector('#bodyTablaE'),
        bodyTablaP = document.querySelector('#bodyTablaP'),
        bodyTablaM = document.querySelector('#bodyTablaM'),
        configDatatable = {
            // options
            responsive: 'true',
            dom: '<"centerTopDataTable"lf>rt<"centerTopDataTable"ip>B',
            iDisplayLength: 10,
            aLengthMenu: [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, 'All'],
            ],
            buttons: [
                {
                    extend: 'excelHtml5',
                    text: 'EXCEL',
                    titleAttr: 'Exportar a Excel',
                    className: 'green darken-4',
                },
            ],
            language: {
                lengthMenu: 'Mostrar _MENU_ registros',
                zeroRecords: 'No se encontraron resultados',
                info: 'Registros en total - _TOTAL_',
                infoEmpty: '0 registros',
                infoFiltered: '(filtrado de un total de MAX registros)',
                sSearch: 'Buqueda rapida:',
                oPaginate: {
                    sFirst: 'Primero',
                    sLast: 'Último',
                    sNext: 'Siguiente',
                    sPrevious: 'Anterior',
                },
                sProcessing: 'Procesando...',
            },
            "drawCallback": function (settings) {
                // Sucede que cuando hay páginación en una tabla si le ponemos funciones a los elementos dentro de las filas de la tabla
                // esas funciones que le pongamos a un elemento solo quedarán para los elementos visibles.
                // esta función drawCallback, se ejecuta cada que se mueva algún botón propio del datatable

            }
        };




    btnInfoEstudent.addEventListener('click', () => {
        getAllDatosTablaE()
        contenTablaMateria.style.display = "none"; // oculta
        contenTablaProgram.style.display = "none"; // oculta
        contentGraficas.style.display = "none";

    })

    btnInfoPrograma.addEventListener('click', () => {
        getAllDatosTablaP()
        contenTablaMateria.style.display = "none"; // oculta
        contenTablaEstudiante.style.display = "none"; // oculta
        contentGraficas.style.display = "none";

    })


    btnInfoMateria.addEventListener('click', () => {
        contenTablaEstudiante.style.display = "none"; // oculta
        contenTablaProgram.style.display = "none"; // oculta
        contentGraficas.style.display = "block";

    })



    function getAllDatosTarjetas() {
        postData('/reporting/getAllDatosTarjetas')
            .then(res => {
                console.log(res);
                console.log(res.program);
                titleEstudent.innerHTML = res.estudent;
                titleProgram.innerHTML = res.program;
            });
    }

    //Funciones de la trabla estudiante

    function getAllDatosTablaE() {
        postData('/reporting/getDatosDashEstudent')
            .then(res => {
                updateTablaE(res);
            });
    }

    function updateTablaE(res) {
        let contenidoTabla = '<tr>';
        if (res.length) { // si trajo datos
            res.forEach((obj) => {
                contenidoTabla += `
              <td>${obj.REG_CEMPLID}</td>
              <td>${obj.REG_CNOMBRE}</td>
              <td>${obj.REG_CMATERIA}</td>
              <td>${obj.REG_CCICLO}</td>
              <td>${obj.REG_CNOTA_PR}</td>
              <td>${obj.REG_CNOTA_SEC}</td>
              <td>${obj.REG_CNOTA_TER}</td>
              <td>${obj.REG_CNOTA_DEF}</td>
              </tr>`;
            });

            // reset data table
            let tablaEstudiante = new DataTable('#tablaEstudiante'); // volver a colocar Datatable
            tablaEstudiante.destroy(); // quitar Datatable
            bodyTablaE.innerHTML = contenidoTabla;
            tablaEstudiante = new DataTable('#tablaEstudiante', configDatatable); // volver a colocar Datatable
            contenTablaEstudiante.style.display = "block"; // muestra


        } else {
            tablaEstudiante.destroy(); // quitar Datatable
            bodyTablaE.innerHTML = '';
            tablaEstudiante = new DataTable('#tablaEstudiante', configDatatable); // volver a colocar Datatable
            contenTablaEstudiante.style.display = "block"; // muestra

        }
    }
    //Funciones de la trabla Programa
    function getAllDatosTablaP() {
        postData('/reporting/getDatosDashProgram')
            .then(res => {
                updateTablaP(res);
                console.log(res);
            });
    }

    function updateTablaP(res) {
        let contenidoTabla = '<tr>';
        if (res.length) { // si trajo datos
            res.forEach((obj) => {
                contenidoTabla += `
              <td>${obj.programa}</td>
              <td>${obj.REG_CCICLO}</td>
              </tr>`;
            });

            // reset data table
            let tablaPrograma = new DataTable('#tablaPrograma'); // volver a colocar Datatable
            tablaPrograma.destroy(); // quitar Datatable
            bodyTablaP.innerHTML = contenidoTabla;
            tablaPrograma = new DataTable('#tablaPrograma', configDatatable); // volver a colocar Datatable
            contenTablaProgram.style.display = "block"; // muestra


        } else {
            tablaPrograma.destroy(); // quitar Datatable
            bodyTablaP.innerHTML = '';
            tablaPrograma = new DataTable('#tablaPrograma', configDatatable); // volver a colocar Datatable
            contenTablaProgram.style.display = "block"; // muestra

        }
    }

    postData('/reporting/selectFiltroPie')
        .then(res => {
            // console.log(res);
            let listadoFiltro = null;

            res.forEach((elem) => {
                if (elem.programa)
                    listadoFiltro += `<option value='${elem.programa}'>${elem.programa}</option>`;
            });

            selFiltro.innerHTML += listadoFiltro;
            M.FormSelect.init(document.querySelectorAll('.select'));
        });


    getAllDatosTarjetas()
    // Datos de ejemplo



})

function createObj(obj, obj2) {
    var keys = {}
    for (var key in obj) {
        val1 = obj[key]
        val2 = obj2[key]
        if (typeof val1 === 'undefined') {
            val1 = 0
        }
        if (typeof val2 === 'undefined') {
            val2 = 0
        }
        keys[key] = [val1, val2]
    }
    return keys
}




// Datos iniciales
var selectedProgram = 'todos';
var filteredData = []; // Cantidad de estudiantes por filtro sin aplicar el filtro por programa

// Función para actualizar la gráfican de pie cuando cambia el filtro

async function updateChart() {
    document.querySelector('.section2').style.display = "flex";
    selectedProgram = document.getElementById('selFiltro').value;
    let objt = await postData('/reporting/getDashPie',{nombre:selectedProgram})
    let total = ""
    let pasaron = ""
    let perdieron = null
    objt.pasaron.forEach((obj) => {
        total = obj.total 
    });
    objt.perdieron.forEach((obj) => {
        perdieron = obj.perdieron 
    });
    pasaron = total - perdieron
    chartPie.data.datasets[0].data = [perdieron, pasaron];
    chartPie.update();
    obtainDashBar();
    await obtainListMateria();
    obtainDashRadar();
    addEvent();
    
}

async function obtainListMateria() {
    let listado = `<li>
        <i class='bx bxs-badge-check iconP'></i>
        <div>
            <b>
                <p style="font-size: 20px;">Materias</p>
            </b>
        </div>
    </li>`
    selectedProgram = document.getElementById('selFiltro').value;
    let objt = await postData('/reporting/getLista',{nombre:selectedProgram})
    console.log(objt);
    objt.forEach((obj) => {
        listado += `<li class="highlight">
        <div class="firstElement">
          <i class='bx bxs-book-alt iconS'></i>
          <span class="materia">${obj.REG_CMATERIA}</span>
        </div>
        <div class="secondElement">
           <i class='bx bx-check greeen'></i>
          <span class="center">${obj.pasaron}</span>
          <i class='bx bx-x redd' ></i>
          <span class="center">${obj.perdieron}</span>
        </div>
      </li>`;
    });
    listaMaterias.innerHTML = listado;

}

async function obtainDashBar(){
    selectedProgram = document.getElementById('selFiltro').value;
    let objt = await postData('/reporting/getDashBar',{nombre:selectedProgram})
    let numero = []
    let cantidad = []
    objt.forEach((obj) => {
        numero.push(obj.MateriasPerdidas)
        cantidad.push(obj.CANTIDAD)
    });
    chartBar.data.labels = numero;
    chartBar.data.datasets[0].data = cantidad;
    chartBar.update();
}

async function obtainDashRadar(){
    selectedProgram = document.getElementById('selFiltro').value;
    let objt = await postData('/reporting/getDashRadar',{nombre:selectedProgram})
    let numero = []
    let cantidad = []
    objt.forEach((obj) => {
        numero.push(obj.REG_CMATERIA)
        cantidad.push(obj.CANTIDAD)
    });
    chartRadar.data.labels = numero;
    chartRadar.data.datasets[0].data = cantidad;
    chartRadar.update();
}

async function addEvent(){
    //Seleccionas todos los elementos con clase test
    const spans = document.getElementsByClassName("materia");
    let carrera = document.getElementById('selFiltro').value;
    //Recorres la lista de elementos seleccionados
    for (let i=0; i<spans.length; i++) {
        //Añades un evento a cada elemento
        spans[i].addEventListener("click", async function() {
            let nombre = this.innerHTML       
            listado = `<li>
            <div>
              <b>
                <p style="font-size: 20px;">Estudiantes de ${nombre}</p>
              </b>
            </div>
          </li>`
          let objt = await postData('/reporting/getListaEstudent',{nombre:nombre,carrera})
          
          objt.forEach((obj) => {
            let color = "green"
            if (obj.definitiva < 3) color = "red"
              listado += `<li class="highlight">
              <div class="firstElement">
                <i class='bx bxs-face' style="margin-right: 15px;font-size: 30px;"></i>
                <span class="center"style="margin-right: 15px;font-size: 15px;">${obj.REG_CEMPLID}</span>
                <span class="center" style="margin-right: 15px;font-size: 15px;">${obj.REG_CNOMBRE}</span>
                <span class="center"style="margin-right: 15px;font-size: 20px; color: ${color};">${obj.definitiva}</span>
              </div>
            </li>`;
            listaEstudents.innerHTML = listado;
          });
        });
}
}

/// GRAFICO DE PIE

var data = {
    labels: ['Pasando', 'Perdiendo'],
    datasets: [
        {
            label: 'Estudiantes',
            data: filteredData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
            ], // Color de fondo de las secciones del gráfico de pie
            borderColor: 'rgba(255, 99, 132, 1)', // Color del borde de las secciones del gráfico de pie
            borderWidth: 1 // Ancho del borde de las secciones del gráfico de pie
        }
    ]
};
var options = {
    responsive: true,
    plugins: {  // 'legend' now within object 'plugins {}'
        legend: {
            labels: {
                color: "white",  // not 'fontColor:' anymore
                font: {
                    size: 14 // 'size' now within object 'font {}'
                }
            }
        }
    },
};
var ctx = document.getElementById('myChart').getContext('2d');
var chartPie = new Chart(ctx, {
    type: 'pie',
    data: data,
    options: options
});


// GRAFICO DE BARRAS

var data = {
    labels: ['A', 'B', 'C', 'D', 'E'],
    datasets: [{
        label: 'Estudiantes',
        data: [],
        backgroundColor: "rgba(128, 222, 234, 0.5)",
        borderColor: "#d1faff",
        pointBorderColor: "#d1faff",
        pointBackgroundColor: "#00bcd4",
        pointHighlightFill: "#d1faff",
        pointHoverBackgroundColor: "#d1faff",
        borderWidth: 2,
        pointBorderWidth: 2,
        pointHoverBorderWidth: 4,
        pointRadius: 4
    }]
};
var options = {
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {  // 'legend' now within object 'plugins {}'
        legend: {
            labels: {
                color: "white",  // not 'fontColor:' anymore
                font: {
                    size: 20 // 'size' now within object 'font {}'
                }
            }
        }
    },
    hover: {
        mode: "label"
    },
    scales: {
        x: {
            grid: {
                display: false
            },
            display: true,
            gridLines: {
                display: false
            },
            ticks: {
                color: 'white' // Cambia el color de los nombres en el eje X
            }
        },
        y: {
            grid: {
                color: 'rgba(255,255,255,0.4)', // Cambia el color del eje X
                display: true
            },
            display: true,
            fontColor: "#fff",
            gridLines: {
                display: true,
                color: "rgba(255,255,255,0.3)"
            },
            ticks: {
                beginAtZero: false,
                color: "#fff"
            }
        }
    }
};
var ctx2 = document.getElementById('chart-bar1').getContext('2d');
var chartBar = new Chart(ctx2, {
    type: 'bar',
    data: data,
    options: options
});


// GRAFICO DE DOGNATS

var dataDognats = {
    labels: ['Etiqueta 1', 'Etiqueta 2', 'Etiqueta 3'],
    datasets: [{
        data: [30, 40, 50], // Valores de cada sección
        backgroundColor: ['#018c9e', '#e94b4b', '#ff9800'], // Colores de cada sección
        hoverBackgroundColor: ['#018c9e', '#e94b4b', '#ff9800'], // Colores al pasar el cursor por encima
        label: 'Nombre del gráfico' // Nombre del gráfico
    }]
};
var optionsDognats = {
    title: {
        display: true,
        text: 'Nombre en el centro del gráfico' // Nombre en el centro del gráfico
    },
    plugins: {
        legend: {
            display: true,
            position: "right",
        }
    }
};
var ctx = document.getElementById('chart-doghnats1').getContext('2d');
var chartDoghnast = new Chart(ctx, {
    type: 'doughnut',
    data: dataDognats,
    options: optionsDognats
});


/// GRAFICO DE LINEA


var dataLine = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [{
        label: 'Ventas',
        data: [500, 1000, 800, 1200, 1500, 900],
        fill: false,
        borderColor: '#00acc1',
        tension: 0.4
    }]
};
var optionsLine = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    }
};
var ctx = document.getElementById('chart-line1').getContext('2d');
var chartLine = new Chart(ctx, {
    type: 'line',
    data: dataLine,
    options: optionsLine
});


/// GRAFICO DE RADAR
var dataRadar = {
    labels: [],
    datasets: [
        {
            label: "estudiantes",
            data: [],
            fillColor: "rgba(255,255,255,0.2)",
            borderColor: "#fff",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#00bfa5",
            pointHighlightFill: "#fff",
            pointHoverBackgroundColor: "#fff",
            borderWidth: 2,
            pointBorderWidth: 2,
            pointHoverBorderWidth: 4
        }
    ]
};
var optionsRadar = {
    responsive: true,
    plugins: {  // 'legend' now within object 'plugins {}'
        legend: {
            display:false,
            labels: {
                display:false,
                color: "white",  // not 'fontColor:' anymore
                font: {
                    size: 20 // 'size' now within object 'font {}'
                }
            }
        }
    },
    hover: {
        mode: "label"
    },
    scales: {
        responsive: false,
        r: {
            responsive: true,
            ticks: {
                beginAtZero: true,
                display: false,
            },
            angleLines: {
                beginAtZero: true,
                color: "rgba(255,255,255,1)"
            },
            gridLines: {
                color: "rgba(255,255,255,1)",
            },
            grid: {
                color: "rgba(255,255,255,1)",
            },
            pointLabels: {
                responsive: true,
                beginAtZero: true,
                fontColor: "rgba(255,255,255,1)",
                color: "rgba(255,255,255,1)",
                fontSize: 5,
                font: {
                    responsive: true,
                    size: 8 // 'size' now within object 'font {}'
                }
            }
        }
    },
};

var ctx = document.getElementById('chart-radar1').getContext('2d');
var chartRadar = new Chart(ctx, {
    type: 'radar',
    data: dataRadar,
    options: optionsRadar
});