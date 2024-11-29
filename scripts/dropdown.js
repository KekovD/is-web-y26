document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = dropdown.querySelector('.dropdown__content');

    dropdown.addEventListener('mouseenter', () => {
        dropdownContent.classList.add('show');
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdownContent.classList.remove('show');
    });
});