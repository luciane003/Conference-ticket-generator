const loadFile = document.getElementById('avatar');
const errorUploadAvatar = document.getElementById('errorPhone')
const errorUpload = document.getElementById('errorUpload');
const infoLargePhone = document.getElementById('infoLarge');
const nameInput = document.getElementById('name');
const githubInput = document.getElementById('github');
const emailInput = document.getElementById('email');
const preview = document.querySelector('.info-file-image');
const cloud = document.getElementById('upload-icon');
const text = document.getElementById('upload-instruction');
const buttonRemoveAvatar = document.getElementById('btnRemove');
const buttonChangeAvatar = document.getElementById('btnChange');
// const errorEmail = document.getElementById('errorEmail');
const form = document.getElementById('myForm')
const ticketContainer = document.getElementById('newTicket');
const btnGenerate = document.getElementById('btnGenerate');

let uploadeUrl = '';


//Funções utilitárias//
function toggleUploadUI(showPreview) {
  cloud.style.display = showPreview ? 'none' : 'block';
  text.style.display = showPreview ? 'none' : 'block';
  buttonRemoveAvatar.style.display = showPreview ? 'block' : 'none';
  buttonChangeAvatar.style.display = showPreview ? 'block' : 'none';
}

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

function showError(element, message) {
  element.textContent = message;
}

function clearError(element) {
  element.textContent = '';
}

//Upload de avatar//

loadFile.addEventListener('change', (event) => {
  const file = event.target.files[0]; //Pegar o arquivo que o usuario escolheu

  if (!file) return;

  if (file.size > 500 * 1024) {
    errorUploadAvatar.innerHTML = `<img src="./assets/images/icon-info.svg" alt="Erro" width= "16" height="16"> 
    File too large. PLease upload a photo under 500KB`;

    preview.innerHTML = '';// limpa preview
    toggleUploadUI(false);
    infoLargePhone.style.display = 'none';
    return;
  }

  clearError(errorUploadAvatar);

  uploadeUrl = URL.createObjectURL(file);//Criar uma URL para aparecer a imagem
  preview.innerHTML = `<img src="${uploadeUrl}" alt="User avatar preview">`; //altero meu html

  toggleUploadUI(true);
});

//Botões remover / trocar avatar
buttonRemoveAvatar.addEventListener('click', (event) => {
  event.preventDefault();
  loadFile.value = '';
  preview.innerHTML = '';
  toggleUploadUI(false);
  infoLargePhone.style.display = 'block';

});

buttonChangeAvatar.addEventListener('click', (event) => {
  event.preventDefault();
  loadFile.click();
});


//Validação email no blur
emailInput.addEventListener('blur', () => {
  if (!validateEmail(emailInput.value)) {
    showError(errorEmail, 'Please enter a valid email address');
    emailInput.style.border = '2px solid red';
  } else {
    clearError(errorEmail);
    emailInput.style.border = '';
  }
});


//Geração do ticket
btnGenerate.addEventListener('click', (event) => {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const githubValue = githubInput.value.trim();
  const avatarFiles = loadFile.files;


  let hasError = false;

  if (avatarFiles.length === 0) {
    hasError = true;
    showError(errorUpload, 'Required');
  } else {
    clearError(errorUpload);
  }

  if (!nameValue) {
    hasError = true;
    showError(document.getElementById('emptyErrorName'), 'Required');
  } else {
    clearError(document.getElementById('emptyErrorName'));
  }


  if (!emailValue) {
    hasError = true;
    showError(document.getElementById('emptyErrorEmail'), 'Required');
  } else if (!validateEmail(emailValue)) {
    hasError = true;
    showError(document.getElementById('emptyErrorEmail'), 'Invalid email');
  } else {
    clearError(document.getElementById('emptyErrorEmail'));
  }


  if (!githubValue) {
    hasError = true;
    showError(document.getElementById('emptyErrorGithub'), 'Required');
  } else {
    clearError(document.getElementById('emptyErrorGithub'));
  }

  if (hasError) return;

  //Esconde o formulário e mostra o ticket
  document.getElementById('heroContainer').style.display = 'none';
  ticketContainer.style.display = 'block';

  //Gera o ticket
  ticketContainer.innerHTML = `
  <section class="ticket">
    <div class="success-message"> 
      <h1 class="ticket-tittle">        
        Congrats, <span class="name-ticket">${nameValue}</span>! Your ticket is ready.
      </h1>
    </div>

    <div class="ticket-message">
      <p class="text-ticket">
        We've emailed your ticket to <span class="userName-ticket">${nameValue}</span> and will send updates in the run up to the event.
      </p>
    </div>  

    <div class="ticket-card">
      <img src="./assets/images/pattern-ticket.svg" alt="Ticket" class="card-image">

    <p class="ticket-number">#${Math.floor(Math.random() * 10000)}</p>

      <div class="card-info">
        <section class="one-section">
          <div class="logo-image">
            <img src="./assets/images/logo-mark.svg" alt="Logo mark" class="section-logo">     
            <h2 class="logo-name">Coding Conf</h2>
          </div>

          <div class="one-info">
            <p class="ticket-date">Jan 31, 2025 / Austin, TX</p>
          </div>      
        </section> 
        
        <section class="two-section">
          <div class="avatar-phone">
            <img src="${uploadeUrl}" alt="User avatar preview" class="user-avatar">
          </div>

          <div class="avatar-name">
            <div class="name-avatar">
              <p class="name">${nameValue}</p>
              </div>
            <div class="two-info"> 
              <img src="./assets/images/icon-github.svg" alt="Github icon"> 
              <p class="name-github">${githubValue}</p>  
            </div>  
        </section>
      </div>  
    </div>
  </section>`;

  // Inserindo valores do usuário de forma segura
  ticketContainer.querySelector('.name-ticket').textContent = nameValue;
  ticketContainer.querySelector('.userName-ticket').textContent = emailValue;
  ticketContainer.querySelector('.avatar-name .name').textContent = nameValue;
  ticketContainer.querySelector('.name-github').textContent = githubValue;
});