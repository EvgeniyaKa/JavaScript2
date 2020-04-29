function checkForm() {
  let regexpName = /^[a-zа-яё]+$/gi;
  let regexpEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/;
  let regexpPhone = /^\+\d{1,3}\s?\(\d{3}\)\s?\d{3}(-\d{2}){2}$/;
  let regexpMessage = /[a-zа-яё0-9]/;

  let name = document.getElementsByName('name')[0].value;
  let email = document.getElementsByName('email')[0].value;
  let phone = document.getElementsByName('phone')[0].value;
  let message = document.getElementsByName('message')[0].value;

  // Проверка имя
  if(regexpName.test(name) === true) {
      document.getElementById('name').className = 'rightForm';
  } else {
      document.getElementById('name').className = 'errorForm';
  }
  // Проверка телефона
  if(regexpPhone.test(phone) === true) {
      document.getElementById('phone').className = 'rightForm';
  } else {
      document.getElementById('phone').className = 'errorForm';
  }
  // Проверка email
  if(regexpEmail.test(email) === true) {
      document.getElementById('email').className = 'rightForm'; 
  } else {
      document.getElementById('email').className = 'errorForm';
  }
  // Проверка сообщения
  if(regexpMessage.test(message) === true) {
      document.getElementById('message').className = 'rightForm';
  } else {
      document.getElementById('message').className = 'errorForm';
  }
}
document.querySelector('.button').addEventListener("click", checkForm); 