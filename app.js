const navBar = document.querySelector('.navbar');
const navToggler = navBar.querySelector('.nav-toggler');


navBar.addEventListener('click', e => {
  const { target } = e;
  if(target.classList.contains('nav-toggler') || target.classList.contains('nav-toggler__icon')){
    console.log('clicked')
    navToggler.classList.toggle('toggle');
    navBar.classList.toggle('scale-nav')
  }
})