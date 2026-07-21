async function loadComponent(elementId, filePath) {
    const target = document.getElementById(elementId);

    if (!target) {
        return;
    }

    try {
        const response = await fetch(filePath);

        if (!response.ok) {
            throw new Error(`Could not load ${filePath}`);
        }

        target.innerHTML = await response.text();
    } catch (error) {
        console.error(error);
    }
}

async function initialiseComponents() {
    await Promise.all([
        loadComponent("site-header", "components/header.html"),
        loadComponent("site-footer", "components/footer.html")
    ]);

    initialiseMobileNavigation();

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

document.addEventListener("DOMContentLoaded", initialiseComponents);

function initialiseMobileNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (!navToggle || !siteNav) {
        return;
    }

    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");

        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
        });
    });
}