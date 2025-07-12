// Style Switcher Toggle
const styleSwitcherToggle = () => {
    const styleSwitcher = document.querySelector(".js-style-switcher");
    const styleSwitcherToggler = document.querySelector(".js-style-switcher-toggler");

    if (styleSwitcherToggler && styleSwitcher) {
        styleSwitcherToggler.addEventListener("click", function(){
            styleSwitcher.classList.toggle("open");
            this.querySelector("i").classList.toggle("fa-times");
            this.querySelector("i").classList.toggle("fa-cog");
        });
    }
}
styleSwitcherToggle();

// Theme Color adjustment via hue slider
const themeColor = () => {
    const hueSlider = document.querySelector(".js-hue-slider");
    const html = document.documentElement; // Represents the <html> element

    const setHue = (value) => {
        html.style.setProperty("--hue", value);
        const hueDisplay = document.querySelector(".js-hue");
        if (hueDisplay) {
            hueDisplay.innerHTML = value;
        }
    }

    if (hueSlider) {
        hueSlider.addEventListener("input", function () {
            setHue(this.value);
            // Save user's preference to local storage
            localStorage.setItem("--hue", this.value)
        });

        // Load saved user preference on page load
        if (localStorage.getItem("--hue") !== null){
            setHue(localStorage.getItem("--hue"));
            hueSlider.value = localStorage.getItem("--hue"); // Set slider position
        }
        else{
            // Set default hue if no preference is saved
            const hue = getComputedStyle(html).getPropertyValue("--hue").trim();
            setHue(hue);
            hueSlider.value = hue;
        }
    }
}
themeColor();

// Light & Dark Mode toggle
const themeLightDark = () => {
    const darkModeCheckbox = document.querySelector(".js-dark-mode");

    const themeMode = () => {
        if (localStorage.getItem("theme-dark") === "false"){
            document.body.classList.remove("t-dark");
        }
        else{
            document.body.classList.add("t-dark");
        }
    }

    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener("click", function() {
            // Save user's preference to local storage
            localStorage.setItem("theme-dark", this.checked);
            themeMode();
        });

        // Load saved user preference on page load
        if(localStorage.getItem("theme-dark") !== null) {
            themeMode();
        }
        // Set checkbox state based on current theme
        if(document.body.classList.contains("t-dark")) {
            darkModeCheckbox.checked = true;
        }
    }
}
themeLightDark();
