
usersContainer = document.querySelectorAll('[id^="usersContainerForm"]');

const usersList = [];
usersContainer.forEach(form => {
  form.children[0].getAttribute("userId");
  console.log(userId);
});



// for(const child of formu){
//   userId = child.getAttribute("userId");
//   name = child.children[0].children[0].value;
//   last_name = child.children[1].children[0].value;
//   speciality = child.children[2].children[0].value;
//   email = child.children[3].children[0].value;
//   address = child.children[4].children[0].value;
//   phone = child.children[5].children[0].value;
//   const user = {
//     "userId": userId,
//     "name": name,
//     "last_name": last_name,
//     "speciality": speciality,
//     "email": email,
//     "address": address,
//     "phone": phone
//   }
//   usersList.push(user);
// }
// console.log(usersList);

const editFunction = (userId) => {
  console.log("Editando usuario: "+userId);
  console.log(document.getElementById("name"+userId).value);
  document.getElementById("name"+userId).removeAttribute("disabled");
  document.getElementById("last_name"+userId).removeAttribute("disabled");
  document.getElementById("speciality"+userId).removeAttribute("disabled");
  document.getElementById("email"+userId).removeAttribute("disabled");
  document.getElementById("address"+userId).removeAttribute("disabled");
  document.getElementById("phone"+userId).removeAttribute("disabled");
};

const saveFunction = (event, userId) => {
  event.preventDefault();

  

  var hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "userId");
  hiddenInput.setAttribute("value", userId);

  document.getElementById("usersContainerForm"+userId).appendChild(hiddenInput);
  
  document.getElementById("usersContainerForm"+userId).submit();
  
}