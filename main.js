document.addEventListener("DOMContentLoaded", function() {
    // Function to load external HTML content
    async function loadComponent(id, file) {
        try {
            const response = await fetch(file);
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            const data = await response.text();
            document.getElementById(id).innerHTML = data;
            
            // Re-run scripts if necessary (e.g., active link highlighting after header loads)
            if(id === 'header-placeholder') {
                setActiveLink();
                initMobileMenu();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Load Header and Footer
    loadComponent('header-placeholder', 'header.html');
    loadComponent('footer-placeholder', 'footer.html');

    // Highlight active link based on current URL
    function setActiveLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    }

    // Mobile Menu Toggle logic
    function initMobileMenu() {
        const toggle = document.querySelector('.menu-toggle');
        const navUl = document.querySelector('nav ul');
        
        if(toggle && navUl) {
            toggle.addEventListener('click', () => {
                navUl.classList.toggle('show');
            });
        }
    }
});
