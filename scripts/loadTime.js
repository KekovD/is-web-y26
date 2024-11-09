(function () {
    window.addEventListener('load', function () {
        const performanceEntries = performance.getEntriesByType("navigation");

        const navigationTiming = performanceEntries[0];

        const loadTime = navigationTiming.loadEventEnd - navigationTiming.startTime;

        const loadTimeInSeconds = (loadTime / 1000).toFixed(4);
        const loadTimeMessage = `Время загрузки страницы: ${loadTimeInSeconds} сек.`;

        document.getElementById('load-time-stat').textContent = loadTimeMessage;
    });
})();
