const leerLocalStorageAfiliados = () => {
    let data = [];
    data = JSON.parse(localStorage.getItem('citas'));
    data ? data : data = [];
    return data;
};
//funcion flecha para buscar
let buscarPorID = (key, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].id === key) {
        return inputArray[i];
      }
    }
  };
//crear cita
const crearCita = () => {
    let form = document.getElementById('formAfiliados');
    var i = 0;
    let info = leerLocalStorageAfiliados();
    info.length != 0 ? i = info[info.length - 1].id + 1: i = 1;
    
    let tipoId = document.getElementById('tipoId').value;
    let numeroDoc = document.getElementById('numeroDoc').value;
    let paciente = document.getElementById('paciente').value;
    let fechaHora = document.getElementById('fechaHora').value;
    let especialidad = document.getElementById('especialidad').value;  

    let data = {
      id: i,
      tipoId: tipoId,
      numeroDoc: numeroDoc,
      paciente: paciente,
      fechaHora: fechaHora,
      especialidad: especialidad,
    };
       
    info.push(data);
    localStorage.clear();
    localStorage.setItem('citas', JSON.stringify(info));
    form.reset();
    cerrarFormAfiliados();
    mostrarCitas();
    mostrarToast('Cita creada satisfactoriamente');
};

const abrirFormAfiliados = () => {
    document.getElementById('divTablaAfiliados').style.display = 'none';
    document.getElementById('divFormAfiliados').style.display = 'block';
}

const cerrarFormAfiliados = () => {
    document.getElementById('divTablaAfiliados').style.display = 'block';
    document.getElementById('divFormAfiliados').style.display = 'none';
}

const mostrarCitas = () => {
    document.getElementById('bodyTablaAfiliados').innerHTML = '';
    let info = leerLocalStorageAfiliados();


    for (const item of info) {
        document.getElementById('bodyTablaAfiliados').innerHTML += `<tr>
        <td>${item.id}</td>
        <td>${item.tipoId}</td>
        <td>${item.numeroDoc}</td>
        <td>${item.paciente}</td>
        <td>${item.fechaHora}</td>
        <td>${item.especialidad}</td>
        <td>
        <button class="btn btn-small text-white"
            style="margin-right: 1px; background-color: #ff5a19;" onclick="eliminarCitas(${item.id})">Borrar</button>
        <button class="btn btn-small text-white"
            style="background-color: green;" onclick="buscarCitaPorId(${item.id})">Editar</button>
        </td>
        </tr>
        `;
    }

};



const buscarCitaPorId = (id) => {
    document.getElementById('divFormAfiliados').style.display = 'block';
    document.getElementById('divTablaAfiliados').style.display = 'none';
 

    let info = leerLocalStorageAfiliados();
    let cita = buscarPorID(id, info);

    document.getElementById('inputIdAfiliado').value = cita.id;
    document.getElementById('tipoId').value = cita.tipoId;
    document.getElementById('numeroDoc').value = cita.numeroDoc;
    document.getElementById('paciente').value = cita.paciente;
    document.getElementById('fechaHora').value = cita.fechaHora;
    document.getElementById('especialidad').value = cita.especialidad;

    document.getElementById('btnEditarCita').style.display = 'block';
    document.getElementById('btnCrearCita').style.display = 'none';
};

const editarCitas = () =>{    
    let info = leerLocalStorageAfiliados();
    let i = document.getElementById('inputIdAfiliado').value;
    
    info[i-1].tipoId = document.getElementById('tipoId').value;
    info[i-1].numeroDoc = document.getElementById('numeroDoc').value;
    info[i-1].paciente = document.getElementById('paciente').value;
    info[i-1].fechaHora = document.getElementById('fechaHora').value;
    info[i-1].especialidad = document.getElementById('especialidad').value;
    localStorage.setItem('citas', JSON.stringify(info));
    cerrarFormAfiliados();
    mostrarCitas();
    mostrarToast('Cita editada Satisfactoriamente');
};

const mostrarToast = (msg) =>{
    let fecha = new Date();
    let fechaCompleta = fecha.getHours() > 12 ? `0${fecha.getHours() - 12}:${fecha.getMinutes()}:0${fecha.getSeconds()} p. m. ` : `  ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()} a. m.`;

    let body = document.getElementById('body-toast');
    let fechaT = document.getElementById('fecha-toast');
    let toastLiveExample = document.getElementById('liveToast');
    
        fechaT.innerHTML = fechaCompleta;
        body.innerHTML = msg;
        var toast = new bootstrap.Toast(toastLiveExample)
        toast.show()
};

const eliminarCitas = (i) => {

    let info = leerLocalStorageAfiliados();
    for (const item of info) {
        if (item.id == i) {
            info.splice(i-1 ,1);
            mostrarToast('Cita eliminada Satisfactoriamente')
        }
    }
    localStorage.setItem('citas', JSON.stringify(info));
    mostrarCitas();

};



