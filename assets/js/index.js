document.addEventListener("DOMContentLoaded", function() {
    const sysTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";

    const localPreference = localStorage.getItem("theme");
    const darkModeToggle = document.querySelector("#dark-mode-toggle");
    const bodyElement = document.querySelector("body");
    const comicElement = document.getElementById('comic');

    const isDark = localPreference ? localPreference === "dark" : sysTheme === "dark";
    bodyElement.classList.toggle("dark", isDark);
    darkModeToggle.textContent = `Enable ${isDark ? "light" : "dark"} mode`;

    darkModeToggle.addEventListener("click", () => {
        const isDark = bodyElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        darkModeToggle.textContent = `Enable ${isDark ? "light" : "dark"} mode`;
    });

    const scrollToTopButton = document.getElementById("goToTop");

    window.addEventListener('scroll', () => {
        scrollToTopButton.classList.toggle('hidden', document.body.scrollTop < 20 && document.documentElement.scrollTop < 20)
    });

    function detectBaseFontSize(initialFontSize) {
        const testElement = document.createElement('div');
        testElement.style.fontSize = '1rem';
        testElement.style.position = 'absolute';
        testElement.style.visibility = 'hidden';
        testElement.style.left = '-9999px';
        testElement.innerHTML = 'M';

        document.body.appendChild(testElement);
        const computedSize = window.getComputedStyle(testElement).fontSize;
        document.body.removeChild(testElement);

        return parseFloat(initialFontSize || computedSize);
    }

    document.getElementById('decreaseFont').addEventListener('click', () => {
        const baseFontSize = getFontSizeOf(comicElement) || detectBaseFontSize();
        const newFontSize = (parseFloat(baseFontSize)-1);
        setFontSizeOf(comicElement, newFontSize);
        updateAllScaling(newFontSize);
    });

    document.getElementById('increaseFont').addEventListener('click', () => {
        const baseFontSize = getFontSizeOf(comicElement) || detectBaseFontSize();
        const newFontSize = (parseFloat(baseFontSize)+1);
        setFontSizeOf(comicElement, newFontSize);
        updateAllScaling(newFontSize);
    });

    document.getElementById('verticalLayout').addEventListener('change', (event) => {
        comicElement.style.flexDirection = event.target.checked ? 'column' : 'row';
    });

    function updateScaleInfo(initialFontSize) {
        const baseFontSize = detectBaseFontSize(initialFontSize);
        return baseFontSize / 16;
    }

    function getFontSizeOf(element) {
        return element.style.fontSize.replace("px", "");
    }

    function setFontSizeOf(element, fontSize) {
        element.style.fontSize = fontSize + 'px';
    }

    function updateAllScaling(initialFontSize) {
        const scaleFactor = updateScaleInfo(initialFontSize);
        if (scaleFactor > 1) {
            document.documentElement.style.setProperty('--font-scale-factor', scaleFactor);
            const baseFontSize = getFontSizeOf(comicElement) || detectBaseFontSize();
            setFontSizeOf(comicElement, baseFontSize);
        }
    }

    updateAllScaling();
});
