const header = document.getElementById('header');
const logo = document.getElementById('logo');
const navBtn = document.getElementById('nav-btn');
const navLink = document.querySelectorAll('nav a');


// Turns header/nav secondary CTA into primary CTA when scrolled
window.addEventListener('scroll', () => {
    if (!responsiveChanges()) {
        if (window.pageYOffset > 500) {
            navBtn.className='btn btn-primary';
        } else {
            navBtn.className= 'btn btn-secondary'; // add transition to all css
            }
    }
});


// RESPONSIVE LOGOS
function responsiveChanges() {
    let width = window.innerWidth;
    
    if (width < 800) {
        if (header.className == 'wrap') {
            logo.src='./img/logo-short-dark.svg';
        }
        navBtn.className='btn btn-secondary burger';
        navBtn.innerHTML='Menu';
        return true;
    } else {
        logo.src='./img/logo-dark.svg';
        navBtn.className='btn btn-secondary';
        navBtn.innerHTML='Join Waitlist';
        return false;
    }
} 

function navMenu () {
    if (responsiveChanges()) {
        logo.src='./img/logo-short-light.svg';
        if (header.className == 'wrap') {
            header.className='wrap menu';
            navBtn.innerHTML='close';
            logo.src='./img/logo-short-light.svg';
        } else {
            header.className='wrap';
            logo.src='./img/logo-short-dark.svg';
            navBtn.innerHTML='Menu';
        }
    }
}


// window.onresize = responsiveChanges;
window.addEventListener('load', responsiveChanges);
window.addEventListener('resize', responsiveChanges);
navBtn.addEventListener('click', navMenu);

// CLOSE MENU WHEN CLICKING AN ANCHOR LINK --fix duplicate functions

navLink[0].addEventListener('click', () => {
    navMenu();
});

navLink[1].addEventListener('click', () => { 
    navMenu();
});
