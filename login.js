const loginForm = document.querySelector("#loginForm");

const emailInputs = document.querySelectorAll(".emailInput");
const passwordInputs = document.querySelectorAll(".passwordInput");

const toggleBtn = document.querySelector("#togglePassword");
const loginPassword = document.querySelector("#login-form .passwordInput");


/* ---------- VALIDACIONES ---------- */

const validarEmail = email =>
 /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validarPassword = password =>
 /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(password);


function validarCampo(input,type){

 const error= input
    .closest(".section__form__item")
    .nextElementSibling;

 let valido=false;
 let mensaje="";

 if(type==="email"){
   valido=validarEmail(input.value);
   mensaje="Email inválido";
 }

 if(type==="password"){
   valido=validarPassword(input.value);
   mensaje="Debe tener 8 caracteres, una mayúscula y un número";
 }

 input.classList.toggle("input-error", !valido);
 input.classList.toggle("input-success", valido);

 error.textContent= valido ? "" : mensaje;

 return valido;
}


/* valida todos los emails */
emailInputs.forEach(input=>{
 input.addEventListener("input",()=>{
   validarCampo(input,"email");
 });
});

/* valida todos los passwords */
passwordInputs.forEach(input=>{
 input.addEventListener("input",()=>{
   validarCampo(input,"password");
 });
});


/* ---------- OJO PASSWORD ---------- */

toggleBtn?.addEventListener("click",()=>{

 if(loginPassword.type==="password"){
   loginPassword.type="text";
   toggleBtn.textContent="🙈";
 }else{
   loginPassword.type="password";
   toggleBtn.textContent="👁";
 }

});


/* ---------- FETCH USERS ---------- */

async function fetchUsers(){

 try{
   const response=await fetch("users.json");
   return await response.json();
 }
 catch(error){
   console.error(error);
   return [];
 }

}


/* ---------- LOGIN ---------- */

loginForm?.addEventListener("submit", async e=>{

 e.preventDefault();

 const email=loginForm.querySelector(".emailInput");
 const password=loginForm.querySelector(".passwordInput");

 const emailOk=validarCampo(email,"email");
 const passOk=validarCampo(password,"password");

 if(!emailOk || !passOk) return;

 const users=await fetchUsers();

 const user=users.find(u =>
   u.email===email.value &&
   u.contrasena===password.value
 );

 if(user){
   window.location.href="userPage.html";
 }else{
   alert("Correo o contraseña incorrectos");
 }

});


/* ---------- CAMBIO DE FORMULARIOS ---------- */

function switchForm(targetId){

 ["login-form","register-form","password-form"]
 .forEach(id=>
   document
   .getElementById(id)
   .classList.toggle("hide", id!==targetId)
 );

}

[
 [".f-pass","password-form"],
 [".f-reg","register-form"],
 [".f-log","login-form"]

].forEach(([link,target])=>{

 document.querySelectorAll(link)
 .forEach(a=>
   a.addEventListener("click",e=>{
      e.preventDefault();
      switchForm(target);
   })
 );

});


/* ---------- MENSAJES FORM ---------- */

function handleFormSubmit(formId,msg){

 const form=document
 .getElementById(formId)
 ?.querySelector("form");

 form?.addEventListener("submit",e=>{
   e.preventDefault();

   if(form.checkValidity()){
      alert(msg);
      form.reset();
      switchForm("login-form");
   }
 });

}

handleFormSubmit(
 "register-form",
 "¡Usuario registrado con éxito!"
);

handleFormSubmit(
 "password-form",
 "Revisa tu correo para recuperar contraseña."
);



function saveUser(newUser){
    let users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(newUser);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    )
}

document
.getElementById("registerForm")
.addEventListener("submit",function(e){

e.preventDefault();

const nuevoUsuario={
 nombre: document.getElementById("name").value,
 telefono: document.getElementById("phone").value,
 email: document.querySelector("#register-form .emailInput").value,
 contrasena: document.querySelector("#register-form .passwordInput").value
};

guardarUsuario(nuevoUsuario);

alert("Usuario registrado");
this.reset();

});