document.addEventListener("DOMContentLoaded", function() {
    const sysTheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";

    const localPreference = localStorage.getItem("theme");
    const darkModeToggle = document.querySelector("#dark-mode-toggle");
    const bodyElement = document.querySelector("body");

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
});
