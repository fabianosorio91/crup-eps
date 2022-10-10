const leerLocalStorageIndependientes = () => {
    let data = [];
    data = JSON.parse(localStorage.getItem('independientes'));
    data ? data : data = [];
    return data;
};

let buscarPorID = (key, inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].id === key) {
        return inputArray[i];
      }
    }
  };

const crearIndependiente = () => {

    let form = document.getElementById('formIndependientes');

    var i = 0;

    let info = leerLocalStorageIndependientes();

    info.length != 0 ? i = info[info.length - 1].id + 1: i = 1;

    
    let tipoId = document.getElementById('tipoId').value;
    let numeroDoc = document.getElementById('numeroDoc').value;
    let nombre = document.getElementById('nombre').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;
    let correo = document.getElementById('correo').value;
    let barrio = document.getElementById('barrio').value;
    let sede = document.getElementById('sede').value;  

    let data = {
      id: i,
      tipoId,
      numeroDoc,
      nombre,
      ciudad,
      direccion,
      correo,
      barrio,
      sede
    };
       
    info.push(data);
    localStorage.clear();
    localStorage.setItem('independientes', JSON.stringify(info));
    form.reset();
    cerrarFormIndependientes();
    mostrarCitas();
    mostrarToast('Independiente eliminado Satisfactoriamente')
};

const abrirFormIndependientes = () => {
    document.getElementById('divTablaIndependientes').style.display = 'none';
    document.getElementById('divFormIndependientes').style.display = 'block';
}

const cerrarFormIndependientes = () => {
    document.getElementById('divTablaIndependientes').style.display = 'block';
    document.getElementById('divFormIndependientes').style.display = 'none';
}

const mostrarIndependientes = () => {

    document.getElementById('bodyTablaIndependientes').innerHTML = '';
    let info = leerLocalStorageIndependientes();


    for (const item of info) {
        document.getElementById('bodyTablaIndependientes').innerHTML += `<tr>
        <td>${item.id}</td>
        <td>${item.tipoId}</td>
        <td>${item.numeroDoc}</td>
        <td>${item.nombre}</td>
        <td>${item.ciudad}</td>
        <td>${item.direccion}</td>
        <td>${item.correo}</td>
        <td>${item.barrio}</td>
        <td>${item.sede}</td>
        <td>
        <button class="btn btn-small text-white"
            style="margin-right: 1px; background-color: #ff5a19;" onclick="eliminarIndependientes(${item.id})">Borrar</button>
        <button class="btn btn-small text-white"
            style="background-color: green;" onclick="buscarIndependientePorId(${item.id})">Editar</button>
        </td>
        </tr>
        `;
    }

};



const buscarIndependientePorId = (id) => {
    document.getElementById('divFormIndependientes').style.display = 'block';
    document.getElementById('divTablaIndependientes').style.display = 'none';
    
    let info = leerLocalStorageIndependientes();
    let independiente = buscarPorID(id, info);

    document.getElementById('inputIdIndependiente').value = independiente.id;
    document.getElementById('tipoId').value = independiente.tipoId;
    document.getElementById('numeroDoc').value = independiente.numeroDoc;
    document.getElementById('nombre').value = independiente.nombre;
    document.getElementById('ciudad').value = independiente.ciudad;
    document.getElementById('direccion').value = independiente.direccion;
    document.getElementById('correo').value = independiente.correo;
    document.getElementById('barrio').value = independiente.barrio;
    document.getElementById('sede').value = independiente.sede;

    document.getElementById('btnEditarIndependiente').style.display = 'block';
    document.getElementById('btnCrearIndependiente').style.display = 'none';
};

const editarIndependientes = () =>{
    
    let info = leerLocalStorageIndependientes();
    let i = document.getElementById('inputIdIndependiente').value;
    
    info[i-1].tipoId = document.getElementById('tipoId').value;
    info[i-1].numeroDoc = document.getElementById('numeroDoc').value;
    info[i-1].nombre = document.getElementById('nombre').value;
    info[i-1].ciudad = document.getElementById('ciudad').value;
    info[i-1].direccion = document.getElementById('direccion').value;
    info[i-1].correo = document.getElementById('correo').value;
    info[i-1].barrio = document.getElementById('barrio').value;
    info[i-1].sede = document.getElementById('sede').value;
    localStorage.setItem('independientes', JSON.stringify(info));
    cerrarFormIndependientes();
    mostrarCitas();
    mostrarToast('Indepndiente eliminado Satisfactoriamente')
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

const eliminarIndependientes = (i) => {

    let info = leerLocalStorageIndependientes();
    for (const item of info) {
        if (item.id == i) {
            info.splice(i-1 ,1);
            mostrarToast('Independiente eliminado Satisfactoriamente')
        }
    }
    localStorage.setItem('independientes', JSON.stringify(info));
    mostrarIndependientes();
};

