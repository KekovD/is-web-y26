(function() {
    const calculateLoadTime = () => (performance.now() / 1000).toFixed(3);

    const displayLoadTime = () => {
        const loadTime = calculateLoadTime();
        const loadingTimeElement = document.getElementById('load-time-stat');

        if (loadingTimeElement) {
            loadingTimeElement.textContent = `Время загрузки страницы: ${loadTime} сек`;
        }
    };

    document.addEventListener('DOMContentLoaded', displayLoadTime);
})();
