export default class Utilities{
  toggleNav(e){
    const navBar = document.querySelector('.navbar');
    const navToggler = navBar.querySelector('.nav-toggler');
    const { target } = e;
    if(target.classList.contains('nav-toggler') || target.classList.contains('nav-toggler__icon')){
      // console.log('clicked')
      navToggler.classList.toggle('toggle');
      navBar.classList.toggle('scale-nav');
    }
  }

  showSpinner(){
    const spinner = document.querySelector('.loading');
  }

  throwError(msg1, msg2){
    const messageBox = document.querySelector('.msg-box');
    const html = `
      <h2 class="msg-head">${msg1}</h2>
      <p class="msg">${msg2 || ''}</p>
    `;
    messageBox.insertAdjacentHTML('beforeend', html);
    messageBox.classList.toggle('hidden');
  }

  
  
}