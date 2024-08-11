function toggleLinks(){
    
const menuElem = document.querySelector('.js-menu-button');
const navLinks = document.querySelector('.js-nav-links-md');

menuElem.addEventListener('click', ()=>{
    menuElem.classList.toggle('active');
    navLinks.classList.toggle('link-active')
});
}

toggleLinks();

