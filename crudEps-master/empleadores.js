const leerLocalStorageEmpleadores = () => {
    let data = [];
    data = JSON.parse(localStorage.getItem('empleadores'));
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

const crearEmpleadores = () => {

    let form = document.getElementById('formEmpleadores');

    var i = 0;

    let info = leerLocalStorageEmpleadores();

    info.length != 0 ? i = info[info.length - 1].id + 1: i = 1;

    
    let tipoId = document.getElementById('tipoId').value;
    let numeroDoc = document.getElementById('numeroDoc').value;
    let empresa = document.getElementById('empresa').value;
    let ciudad = document.getElementById('ciudad').value;
    let direccion = document.getElementById('direccion').value;
    let correo = document.getElementById('correo').value;
    let codPostal = document.getElementById('codPostal').value;
    let regimen = document.getElementById('regimen').value;
  

    let data = {
      id: i,
      tipoId,
      numeroDoc,
      empresa,
      ciudad,
      direccion,
      correo,
      codPostal,
      regimen,
    };
       
    info.push(data);
    localStorage.clear();
    localStorage.setItem('empleadores', JSON.stringify(info));
    console.log(info);
    form.reset();
    cerrarFormEmpleadores();
    mostrarEmpleadores();
    mostrarToast('Empleador creado satisfactoriamente');
};


const abrirFormEmpleadores = () => {
    document.getElementById('divTablaEmpleadores').style.display = 'none';
    document.getElementById('divFormEmpleadores').style.display = 'block';
}

const cerrarFormEmpleadores = () => {
    document.getElementById('divTablaEmpleadores').style.display = 'block';
    document.getElementById('divFormEmpleadores').style.display = 'none';
}

const mostrarEmpleadores = () => {

    document.getElementById('bodyTablaEmpleadores').innerHTML = '';
    let info = leerLocalStorageEmpleadores();

    for (const item of info) {
        
        document.getElementById('bodyTablaEmpleadores').innerHTML += `<tr>
        <td>${item.id}</td>
        <td>${item.tipoId}</td>
        <td>${item.numeroDoc}</td>
        <td>${item.empresa}</td>
        <td>${item.ciudad}</td>
        <td>${item.direccion}</td>
        <td>${item.correo}</td>
        <td>${item.codPostal}</td>
        <td>${item.regimen}</td>
        <td>
        <button class="btn btn-small text-white"
            style="margin-right: 1px; background-color: #ff5a19;" onclick="eliminarEmpleadores(${item.id})">Borrar</button>
        <button class="btn btn-small text-white"
            style="background-color: green;"  onclick="buscarEmpleadorPorId(${item.id})">Editar</button>
        </td>
        </tr>
        `;
    }
};


const buscarEmpleadorPorId = (id) => {
    document.getElementById('divFormEmpleadores').style.display = 'block';
    document.getElementById('divTablaEmpleadores').style.display = 'none';

    let info = leerLocalStorageEmpleadores();
    let Empleador = buscarPorID(id, info);

    document.getElementById('inputIdEmpleador').value = Empleador.id;
    document.getElementById('tipoId').value = Empleador.tipoId;
    document.getElementById('empresa').value = Empleador.empresa;
    document.getElementById('ciudad').value = Empleador.ciudad;
    document.getElementById('direccion').value = Empleador.direccion;
    document.getElementById('correo').value = Empleador.correo;
    document.getElementById('codPostal').value = Empleador.codPostal;
    document.getElementById('regimen').value = Empleador.regimen;

    document.getElementById('btnEditarEmpleador').style.display = 'block';
    document.getElementById('btnCrearEmpleador').style.display = 'none';
};

const editarEmpleador = () =>{
    
    let info = leerLocalStorageEmpleadores();
    let i = document.getElementById('inputIdEmpleador').value;
    
    info[i-1].tipoId = document.getElementById('tipoId').value;
    info[i-1].empresa = document.getElementById('empresa').value;
    info[i-1].ciudad = document.getElementById('ciudad').value;
    info[i-1].direccion = document.getElementById('direccion').value;
    info[i-1].correo = document.getElementById('correo').value;
    info[i-1].codPostal = document.getElementById('codPostal').value;
    info[i-1].regimen = document.getElementById('regimen').value;
    localStorage.setItem('empleadores', JSON.stringify(info));
    cerrarFormEmpleadores();
    mostrarEmpleadores();
    mostrarToast('Empleador editado satisfactoriamente');
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

const eliminarEmpleadores = (i) => {

    let info = leerLocalStorageEmpleadores();
    for (const item of info) {
        if (item.id === i) {
            info.splice(i-1,1);
            mostrarToast('Empleador eliminado satisfactoriamente');
        }
    }
    localStorage.setItem('empleadores', JSON.stringify(info));
    mostrarEmpleadores();
};



