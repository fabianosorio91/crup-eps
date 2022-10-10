//Funcion NavBar ...cons no
const mostrarNav = (header) => {
  let nav = `<nav class="navbar navbar-expand-lg "  style="background-color:  rgba(17, 128, 122, 0.747)" >
      <div class="container-fluid">
        <a style="color: white; margin-left: 3%;" class="navbar-brand" href="./home.html">CrudEps</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul  style="margin-left: 65%;" class="navbar-nav">
            <li class="nav-item">
              <a style="color: white" class="nav-link active" href="./home.html">Home</a>
            </li>
            <li class="nav-item">
              <a style="color: white" class="nav-link active" href="./afiliados.html">Afiliados</a>
            </li>
            <li class="nav-item">
              <a style="color: white" class="nav-link" href="./empleadores.html">Empleadores</a>
            </li>
            <li class="nav-item">
              <a style="color: white" class="nav-link" href="./independientes.html">Independientes</a>
            </li>
            <li class="nav-item">
              <a style="color: white; cursor:pointer" id="btnCerrarSesion" class="nav-link" onclick="cerrarSesion()">Salir</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>`;

  let h = document.getElementById(header);
  h.innerHTML = nav;
};
//Creacion array objeto fijo
const usuario = [{
  id: 1,
  nombre: 'Pablo',
  apellido: 'Escobar',
  usuario: "pEscobar",
  contraseña: 12345
}];
//subir usuario al local storage
const cargarInitialData = () => {
  localStorage.setItem('usuarios', JSON.stringify(usuario)); // 2 parametros 
}
//
const leerLocalStorage = () => {
  let data = []; //crea un objeto vacio data
  data = JSON.parse(localStorage.getItem('usuarios'));
  data ? data : data = []; //diferente de null, retorne data, sino traiga un array vacio....data ?
  return data;
}

let buscarPorUsuario = (key, inputArray) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].usuario === key) {
      return inputArray[i];
    }
  }
};

const iniciarSesion = () => {
  var usuario = document.getElementById('inicioSusuario').value;
  var contraseña = document.getElementById('passInicioUsuario').value;

  let info = leerLocalStorage();
  let user = buscarPorUsuario(usuario, info);

  if (usuario && contraseña) {
    if (user.usuario == usuario && user.contraseña == contraseña) {
      location.replace('./home.html');
    }
    /*
    else if (user.usuario ==! usuario && user.contraseña ==! contraseña) {      
        alert('Usuario y/o Contraseña incorrectos fabian');         
    } */
    
    else  {
      document.getElementById('inicioSusuario').value = '';
      document.getElementById('passInicioUsuario').value = '';
      alert('Usuario y/o Contraseña incorrectos');
    }
    
  } else {
    alert('No se pueden dejar campos vacios');
  }

 
};


//cerrar el modal
const cerrarModalRegistro = () => {
  document.getElementById('modalRegistrar').style.display = 'none';
  document.getElementById('modalIniciarSesion').style.display = 'block';
}
//abrir modal
const abrirModalRegistro = () => {
  document.getElementById('modalRegistrar').style.display = 'block';
  document.getElementById('modalIniciarSesion').style.display = 'none';
}
//registrar Usuario
const registrarUsuario = () => {
  document.getElementById('modalIniciarSesion').style.display = 'none';
  document.getElementById('modalRegistrar').style.display = 'block';


  var info = leerLocalStorage();
 
  for (const item of info) {
    var id = item.id
  };

  let nombreUsuario = document.getElementById('nombreUsuario').value;
  let apellidoUsuario = document.getElementById('apellidoUsuario').value;
  let usuario = document.getElementById('usuario').value;
  let pass = document.getElementById('passRegistroUsuario').value;

  if (nombreUsuario && apellidoUsuario && usuario && pass) {
    let newUsuario = {
      id: id + 1,
      nombre: nombreUsuario,
      apellido: apellidoUsuario,
      usuario: usuario,
      contraseña: pass
    };

    info.push(newUsuario);
    localStorage.clear();
    localStorage.setItem('usuarios', JSON.stringify(info));
    cerrarModalRegistro();
  } else {
    alert('No pueden haber campos vacios');
  }

};

const cerrarSesion = () => {
  location.replace('./index.html');
  localStorage.clear();
};