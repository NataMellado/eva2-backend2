usersContainer = document.getElementById("formContainer");
console.log(personas);

var usersList = [];

var isEditing = false;
var lastEdited = null;

for (const persona of personas) {
  personaAgregar = {
    userId: persona.id,
    name: persona.name,
    last_name: persona.last_name,
    speciality: persona.speciality,
    email: persona.email,
    address: persona.address,
    phone: persona.phone,
    picture: persona.picture,
  };
  usersList.push(personaAgregar);
}

/**
 * Obtiene un usuario con sus datos por defecto
 */
const getUser = (userId) => {
  for (const user of usersList) {
    if (user.userId == userId) {
      return user;
    }
  }
  return null;
};

/**
 * Detecta si hay cambios en los inputs de un usuario
 * Hace lo siguiente:
 * 1. Obtiene los datos por defecto
 * 2. Compara los datos por defecto del usuario
 * con los datos de los inputs de ese usuario
 */
const detectChanges = (userId) => {
  defaultData = getUser(userId);
  name = document.getElementById("name" + userId).value;
  last_name = document.getElementById("last_name" + userId).value;
  speciality = document.getElementById("speciality" + userId).value;
  email = document.getElementById("email" + userId).value;
  address = document.getElementById("address" + userId).value;
  phone = document.getElementById("phone" + userId).value;
  if (
    name !== defaultData.name ||
    last_name !== defaultData.last_name ||
    speciality !== defaultData.speciality ||
    email !== defaultData.email ||
    address !== defaultData.address ||
    phone !== defaultData.phone
  ) {
    console.log("Se detectaron cambios");
    return true;
  }
  console.log("No se detectaron cambios");
  return false;
};

/**
 * Habilita o deshabilita los inputs de un usuario
 * También si se le da un 2do parámetro:
 * ["disable", "enable"]
 * puede deshabilitar o habilitar los inputs de dicho usuario
 */
const toggleUserInputs = (userId, toggleTo = null) => {
  
  // Si se "deshabilita" y NO tiene el atributo disabled
  if (
    toggleTo == "disable" &&
    !document.getElementById("name" + userId).hasAttribute("disabled")
  ) {
    document.getElementById("name" + userId).disabled = true;
    document.getElementById("last_name" + userId).disabled = true;
    document.getElementById("speciality" + userId).disabled = true;
    document.getElementById("email" + userId).disabled = true;
    document.getElementById("address" + userId).disabled = true;
    document.getElementById("phone" + userId).disabled = true;
    return;
  // Si se "habilita" y SÍ tiene el atributo disabled
  } else if (
    toggleTo == "enable" &&
    document.getElementById("name" + userId).hasAttribute("disabled")
  ) {
    document.getElementById("name" + userId).removeAttribute("disabled");
    document.getElementById("last_name" + userId).removeAttribute("disabled");
    document.getElementById("speciality" + userId).removeAttribute("disabled");
    document.getElementById("email" + userId).removeAttribute("disabled");
    document.getElementById("address" + userId).removeAttribute("disabled");
    document.getElementById("phone" + userId).removeAttribute("disabled");
    return;
  }
  // Si en este punto el toggleTo es null, se retorna
  if (toggleTo != null) return;
  
  // Revisa si tiene un campo deshabilitado, y si lo tiene habilita todos los campos
  if (document.getElementById("name" + userId).hasAttribute("disabled")) {
    document.getElementById("name" + userId).removeAttribute("disabled");
    document.getElementById("last_name" + userId).removeAttribute("disabled");
    document.getElementById("speciality" + userId).removeAttribute("disabled");
    document.getElementById("email" + userId).removeAttribute("disabled");
    document.getElementById("address" + userId).removeAttribute("disabled");
    document.getElementById("phone" + userId).removeAttribute("disabled");
  // Si no tiene ningún campo deshabilitado, deshabilita todos los campos
  } else { 
    document.getElementById("name" + userId).disabled = true;
    document.getElementById("last_name" + userId).disabled = true;
    document.getElementById("speciality" + userId).disabled = true;
    document.getElementById("email" + userId).disabled = true;
    document.getElementById("address" + userId).disabled = truedisabled = true;
    document.getElementById("phone" + userId).disabled = true;
  }
};

/**
 * Toma el usuario por defecto, busca sus inputs y les
 * coloca la información que viene por defecto desde la base de datos
 * Luego DESHABILITA los inputs del usuario
 * y se setea isEditing a false
 */
const resetUserData = (userId) => {
  user = getUser(userId);
  document.getElementById("name" + userId).value = user.name;
  document.getElementById("last_name" + userId).value = user.last_name;
  document.getElementById("speciality" + userId).value = user.speciality;
  document.getElementById("email" + userId).value = user.email;
  document.getElementById("address" + userId).value = user.address;
  document.getElementById("phone" + userId).value = user.phone;
  toggleUserInputs(userId, "disable");
  isEditing = false;
  lastEdited = null;
};


/**
 * Función que se llama al hacer click en el botón de editar un usuario ->
 * 
 * Al hacer click en un usuario:
 * 
 * Primero verifica si se estaba editando un usuario diferente al clickeado.
 * 
 * Luego, si se estaba editando un usuario y no es el mismo,
 * se verifica si hay cambios en el usuario editado
 *
 * Si se encuentran cambios, se pregunta si se desean guardar los cambios
 ** Al guardar los cambios:
 *  Se llama la función {[saveUserForm()]} pasándole el usuario que se editó
 ** Al NO guardar los cambios:
 * Se restauran los datos por defecto del usuario editado (y se deshabilita input)
 * y se habilita el input del nuevo usuario clickeado
 */
const editFunction = (event, userId) => {
  if (lastEdited != null && lastEdited != userId && detectChanges(lastEdited)) {
    var deseaGuardarCambios = confirm(
      "¿Deseas guardar los cambios realizados?"
    );
    // Si se desean guardar los cambios, enviar formulario
    if (deseaGuardarCambios) {
      saveUserForm(event, lastEdited);
      return;
    // Si no, resetear datos del user editado y habilitar inputs del user clickeado
    } else {
      resetUserData(lastEdited);
      toggleUserInputs(userId, "enable");
      return;
    }
  // Si se hace click en el mismo usuario que se estaba editando, no hacer nada
  } else if (lastEdited == userId) {
    //TODO: Se pueden detectar cambios y hacer la misma pregunta
    return;
  }

  /* Si se clickea un usuario diferente, se resetea el usuario anterior */
  if (lastEdited != null && lastEdited != userId) {
    resetUserData(lastEdited);
  }

  // Se intercambian los inputs del usuario que se clickeó
  // (si estaba habilitado, se deshabilitan y viceversa)
  toggleUserInputs(userId);
  // Se establece isEditing a verdadero
  // Se establece lastEdited como la ID usuario que se está editando
  isEditing = true;
  lastEdited = userId;
  lastEditedUser = getUser(userId);
};

/**
 * Función que se llama al hacer click en el botón de guardar un usuario ->
 * Verifica si se estaba editando un usuario antes de guardar
 ** Si no se editó ningún usuario, se muestra un alert
 ** Si se clickea guardar a otro usuario que no se editó, se muestra un alert
 */
const saveFunction = (event, userId) => {
  if (lastEdited == null) {
    alert("No hay cambios que guardar!");
    return;
  }
  // Si el click en GUARDAR es a un usuario diferente al que se editó, alerta
  if (lastEdited != userId) {
    alert("No se puede guardar este usuario!");
    return;
  }

  sendForm(event, userId);
};

/**
 * Función que envía el formulario de un usuario
 */
const sendForm = (event, userId) => {
  event.preventDefault();

  // Crea el input hidden para enviar el userId en la request
  var hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "userId");
  hiddenInput.setAttribute("value", userId);

  // Se agrega el input hidden al formulario de dicho usuario
  document
    .getElementById("usersContainerForm" + userId)
    .appendChild(hiddenInput);

  // Se envía el formulario
  document.getElementById("usersContainerForm" + userId).submit();
};

/**
 * Función que deshabilita todos los inputs de todos los usuarios
 */
const disableUserInputs = (usersList) => {
  // Recorre la lista usuarios 
  usersList.forEach((persona) => {
    console.log("Deshabilitando inputs de user:" + persona.userId);
    // Para cada ID de usuario, deshabilita los inputs
    toggleUserInputs(persona.userId, "disable");
  });
};

/**
 * Función que guarda los datos de un usuario ESPECÍFICO
 * Sirve para guardar cuando se solicita la confirmación, y no
 * directamente desde el botón guardar
 */
const saveUserForm = (event, userId) => {
  // RECORDAR:
  // - Los inputs del usuario a guardar deben estar habilitados
  // es decir, sin la etiqueta "disabled" al momento de enviarse
  console.log(usersList);
  // Se deshabilitan todos los inputs de todos los usuarios
  // disableUserInputs(usersList);
  console.log("Habilitando inputs de user");
  // Se habilitan sólo los inputs del usuario a guardar
  toggleUserInputs(userId, "enable");
  console.log("Enviando form");
  // Se envía el formulario de dicho usuario
  sendForm(event, userId);
};

/**
 * Función que se llama al hacer click en el botón de eliminar un usuario ->
 */
const deleteFunction = (userId) => {
  // Crea el input hidden para enviar el userId en la request
  var hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "deleteUser");
  hiddenInput.setAttribute("value", userId);

  // Se agrega el input hidden al formulario de dicho usuario
  document
    .getElementById("usersContainerForm" + userId)
    .appendChild(hiddenInput);

  // Se envía el formulario
  document.getElementById("usersContainerForm" + userId).submit();
}