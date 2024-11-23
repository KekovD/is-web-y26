document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    const links = document.querySelectorAll('.navigation__link, .dropdown__link');

    links.forEach(link => {
        const linkPath = link.getAttribute('href');

        if (currentPath.includes(linkPath)) {
            link.classList.add('active');
        }
    });
});
