const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const menuOverlay = document.querySelector(".menu-overlay");
const mobileMenu = window.matchMedia("(max-width: 768px)");

function setMenuOpen(isOpen, restoreFocus = false) {
    document.body.classList.toggle("menu-aberto", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    siteNav.setAttribute("aria-hidden", String(isOpen ? false : mobileMenu.matches));
    menuOverlay.hidden = !isOpen;

    if (!isOpen && restoreFocus) {
        menuButton.focus();
    }
}

menuButton.addEventListener("click", () => {
    setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true");
});

menuOverlay.addEventListener("click", () => setMenuOpen(false, true));

siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
        setMenuOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false, true);
    }
});

mobileMenu.addEventListener("change", (event) => {
    setMenuOpen(false);
    siteNav.setAttribute("aria-hidden", String(event.matches));
});

siteNav.setAttribute("aria-hidden", String(mobileMenu.matches));
