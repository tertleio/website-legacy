// Turns header/nav secondary CTA into primary CTA when scrolled
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        document.getElementById('sign-up').style.cssText = 'background: #1477FF; color: white !important; transition: 0.5s;';
    } else {
        document.getElementById('sign-up').style = 'transition: 0.5s'; // add transition to all css
    }
});


// Smooth scroll
document.querySelector('.hello').addEventListener('click', () => {
    document.querySelector('.hello').scrollIntoView({ behavior: 'smooth' });
});
