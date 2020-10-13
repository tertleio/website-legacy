// Turns header/nav secondary CTA into primary CTA when scrolled
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        document.getElementById('nav-btn').style.cssText = 'background: #1477FF; color: white !important; transition: 0.5s;';
    } else {
        document.getElementById('nav-btn').style = 'transition: 0.5s'; // add transition to all css
    }
});

const header = document.getElementById('header');
const logo = document.getElementById('logo');
const navBtn = document.getElementById('nav-btn');


// RESPONSIVE LOGO
function responsiveChanges() {
    let width = window.innerWidth;
    
    if (width < 800) {
        logo.src='./img/logo-short-dark.svg';
    
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
// window.onresize = responsiveChanges;
window.addEventListener('resize', responsiveChanges);
navBtn.addEventListener('click', navMenu);

// MOBILE NAV MENU < WRWRITE AS FUNCTION AND CALL IT ON ONE BELOW
/*
navBtn.addEventListener('click', () => {
    if (header.className == 'wrap' && responsiveChanges()) {
        header.className='wrap menu';
        navBtn.innerHTML='close';
        logo.src='./img/logo-short-light.svg';
    } else if (header.className == 'wrap menu' ) {
        header.className='wrap';
        logo.src='./img/logo-short-dark.svg';
        navBtn.innerHTML='Menu';
    }
});
*/
function navMenu () {
    if (header.className == 'wrap' && responsiveChanges()) {
        header.className='wrap menu';
        navBtn.innerHTML='close';
        logo.src='./img/logo-short-light.svg';
    } else {
        header.className='wrap';
        logo.src='./img/logo-short-dark.svg';
        navBtn.innerHTML='Menu';
    }
}

// CLOSE MENU WHEN CLICKING AN ANCHOR LINK
const navLink = document.getElementsByClassName('hello')[0];


navLink.addEventListener('click', () => {
    console.log('nav link clicked');
    responsiveChanges();
    navMenu();
});

console.log(navLink);