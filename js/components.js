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

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

document.addEventListener("DOMContentLoaded", initialiseComponents);