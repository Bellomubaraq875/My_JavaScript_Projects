document.addEventListener('DOMContentLoaded', () => {
    // Preloader functionality
    window.addEventListener("load", () => {
        const preloader = document.querySelector(".js-preloader");
        if (preloader) {
            preloader.classList.add("fade-out");

            setTimeout(() => {
                preloader.style.display = "none";
            }, 600);
        }
    });
    
    // Initialize AOS
    AOS.init();

    // Typed.js initialization for dynamic text
    var typed = new Typed('.text', {
        strings: ['Graphic Designer', 'Software Developer', 'Front-End Developer', 'Web 3 developer'],
        typeSpeed: 100,
        backSpeed: 50,
        loop: true
    });

    // Header background reveal on scroll
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

    // Navigation toggle and smooth scrolling
    const navigation = () => {
        const navToggler = document.querySelector(".js-nav-toggler");
        const nav = document.querySelector(".js-nav");
        const navItems = nav.querySelectorAll("li");
        const header = document.querySelector(".js-header");

        const navToggle = () => {
            nav.classList.toggle("open");
            if (navToggler) {
                navToggler.classList.toggle("active"); 
            }
        }

        if (navToggler) {
            navToggler.addEventListener("click", navToggle);
        }

        navItems.forEach((li) => {
            li.querySelector("a").addEventListener("click", () => {
                if (window.innerWidth <= 767) {
                    navToggle(); // Close nav on link click in mobile view
                }
                const targetId = li.querySelector("a").getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    navigation();

    // Apply skill progress bar widths using CSS variables for animation
    document.querySelectorAll('.progress-line span').forEach(span => {
        const width = span.style.width;
        span.style.setProperty('--skill-width', width);
    });

    // Carousel functionality for Technical Skills section
    const carouselTrack = document.querySelector(".js-carousel-track");
    const carouselItems = document.querySelectorAll(".carousel-item");
    const prevButton = document.querySelector(".js-carousel-prev");
    const nextButton = document.querySelector(".js-carousel-next");
    const dotsContainer = document.querySelector(".js-carousel-dots");
    const carouselTrackContainer = document.querySelector(".js-carousel-track-container");

    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // Determines how many items are visible in the carousel based on screen width
    const getItemsPerView = () => {
        if (window.innerWidth <= 767) {
            return 1;
        } else if (window.innerWidth <= 991) {
            return 2;
        } else {
            return 3;
        }
    };

    // Updates the carousel position and active state of items/dots
    const updateCarousel = () => {
        if (!carouselTrack || carouselItems.length === 0 || !carouselTrackContainer) return;

        const itemsPerView = getItemsPerView();
        const itemWidth = carouselItems[0].offsetWidth;

        let offset = 0;
        if (itemsPerView === 1) {
            offset = -currentIndex * itemWidth;
        } else if (itemsPerView === 2) {
            offset = -currentIndex * itemWidth;
        } else { // itemsPerView === 3 (desktop view)
            // Calculate offset to center the current item
            const currentItemCenter = carouselItems[currentIndex].offsetLeft + (itemWidth / 2);
            const containerCenter = carouselTrackContainer.offsetWidth / 2;
            offset = containerCenter - currentItemCenter;

            // Boundary checks to prevent scrolling too far
            const trackScrollWidth = carouselTrack.scrollWidth;
            const containerVisibleWidth = carouselTrackContainer.offsetWidth;

            const maxOffset = 0;
            const minOffset = -(trackScrollWidth - containerVisibleWidth);

            if (offset > maxOffset) {
                offset = maxOffset;
            } else if (offset < minOffset) {
                offset = minOffset;
            }
        }

        carouselTrack.style.transform = `translateX(${offset}px)`;

        // Reset active class and scale/opacity for all items
        carouselItems.forEach((item) => {
            item.classList.remove('active');
            item.style.transform = 'scale(0.8)';
            item.style.opacity = '0.5';
        });

        // Set active class and full scale/opacity for the current item
        if (carouselItems[currentIndex]) {
            carouselItems[currentIndex].classList.add('active');
            carouselItems[currentIndex].style.transform = 'scale(1)';
            carouselItems[currentIndex].style.opacity = '1';
        }

        updateDots();
    };

    // Updates the carousel navigation dots
    const updateDots = () => {
        if (!dotsContainer) return;

        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalItems; i++) {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (i === currentIndex) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    };

    // Event listeners for carousel navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1; // Circular loop
            updateCarousel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0; // Circular loop
            updateCarousel();
        });
    }

    // Initial carousel setup and resize listener
    if (carouselTrack && carouselItems.length > 0 && carouselTrackContainer) {
        updateCarousel();
        window.addEventListener('resize', () => {
            currentIndex = 0; // Reset index on resize to prevent layout issues
            updateCarousel();
        });
    }

    // Toggle skill content visibility (if you had expandable skill descriptions)
    document.querySelectorAll('.skill-icon').forEach(skillIcon => {
        skillIcon.addEventListener('click', () => {
            const skillContent = skillIcon.closest('.skill-info').nextElementSibling;
            if (skillContent) {
                skillContent.classList.toggle('show');
            }
        });
    });
});
