document.addEventListener('DOMContentLoaded', () => {
    var typed = new Typed('.text', {
        strings: ['Graphic Designer', 'Software Developer', 'Front-End Developer', 'Web 3 developer'],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
    });
});

// -------------------------------------------

window.addEventListener("load", () => {
    const preloader = document.querySelector(".js-preloader");
    preloader.classList.add("fade-out");

    setTimeout(() => {
        preloader.style.display = "none";
        /* animate on scroll */
        AOS.init();
    }, 600);


});

// header bg reveal

const headerBg = () => {
    const header = document.querySelector(".js-header");

    window.addEventListener("scroll", function () {
        if(this.scrollY > 0){
            header.classList.add("bg-reveal");
        }
        else{
            header.classList.remove("bg-reveal");
        }
    });
}
headerBg();

// nav 

const navigation = () => {
    const navToggler = document.querySelector(".js-nav-toggler");
    const nav = document.querySelector(".js-nav");
    const navItems = nav.querySelectorAll("li");

    const navToggle = () => {
        nav.classList.toggle("open");
        navToggle.classList.toggle("active");
    }

    navToggler.addEventListener("click", navToggle);

    navItems.forEach((Li) => {
        Li.querySelector("a").addEventListener("click", () => {
            if (window.innerWidth <= 767) {
                navToggle();
            }
        });
    });
}
navigation();


// show/hide faq answer

// Select all elements with the class .skill-icon (the icon containing <i class='bx bx-list-plus'></i>)
document.querySelectorAll('.skill-icon').forEach(skillIcon => {
    skillIcon.addEventListener('click', () => {
        // Find the nearest .skill-content sibling and toggle the "show" class
        const skillContent = skillIcon.parentElement.nextElementSibling;
        skillContent.classList.toggle('show');
    });
});