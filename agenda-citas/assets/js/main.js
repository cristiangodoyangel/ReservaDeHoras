// --- Configuración de horas disponibles ---
const horasManana = ["09:00", "10:00", "11:00", "12:00"];
const horasTarde = ["13:00", "14:00", "15:00", "16:00"];
let fechaSeleccionada = null;
let horaSeleccionada = null;

// Inicializar calendario FullCalendar

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        selectable: true,
        select: function(info) {
            fechaSeleccionada = info.startStr;
            mostrarHoras();
            validarFormulario();
        },
        dateClick: function(info) {
            fechaSeleccionada = info.dateStr;
            mostrarHoras();
            validarFormulario();
        }
    });
    calendar.render();
});

function mostrarHoras() {
    const contenedor = document.getElementById('horas-disponibles');
    contenedor.innerHTML = '';
    if (!fechaSeleccionada) return;
    // Mostrar horas mañana
    horasManana.forEach(hora => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary';
        btn.innerText = hora;
        btn.onclick = () => seleccionarHora(hora);
        if (horaSeleccionada === hora) btn.classList.add('active');
        contenedor.appendChild(btn);
    });
    // Separador
    const sep = document.createElement('div');
    sep.style.width = '100%'; sep.style.height = '8px';
    contenedor.appendChild(sep);
    // Mostrar horas tarde
    horasTarde.forEach(hora => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline-primary';
        btn.innerText = hora;
        btn.onclick = () => seleccionarHora(hora);
        if (horaSeleccionada === hora) btn.classList.add('active');
        contenedor.appendChild(btn);
    });
}

function seleccionarHora(hora) {
    horaSeleccionada = hora;
    mostrarHoras();
    validarFormulario();
}

// Validación y armado del mensaje
const campos = ['servicio', 'nombre', 'telefono', 'detalles'];
campos.forEach(id => {
    document.getElementById(id).addEventListener('input', validarFormulario);
});

document.getElementById('btn-agendar').addEventListener('click', function() {
    const servicio = document.getElementById('servicio').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const detalles = document.getElementById('detalles').value;
    const fecha = fechaSeleccionada;
    const hora = horaSeleccionada;
    const mensaje =
        `¡Hola! Me gustaría agendar una mantención:%0A` +
        `Nombre: ${nombre}%0A` +
        `Teléfono: ${telefono}%0A` +
        `Servicio: ${servicio}%0A` +
        `Detalles: ${detalles}%0A` +
        `Fecha: ${fecha}%0A` +
        `Hora: ${hora}`;
    const numero = '56957209793'; // Cambia este número por el tuyo
    const url = `https://wa.me/${numero}?text=${mensaje}`;
    window.open(url, '_blank');
});

function validarFormulario() {
    const servicio = document.getElementById('servicio').value;
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const detalles = document.getElementById('detalles').value;
    const btn = document.getElementById('btn-agendar');
    btn.disabled = !(servicio && nombre && telefono && detalles && fechaSeleccionada && horaSeleccionada);
}
