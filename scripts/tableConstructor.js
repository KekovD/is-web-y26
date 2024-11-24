document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('tableContainer');
    const saveButton = document.getElementById('saveParams');
    const loadButton = document.getElementById('loadParams');
    const saveTableButton = document.getElementById('saveTable');
    const loadTableButton = document.getElementById('loadTable');
    const templatesSelect = document.getElementById('templates');

    const tableTemplates = [
        {
            name: "Простая таблица",
            rows: 3,
            columns: 3,
            headers: ["Название", "Исполнитель", "Год"],
            data: [
                ["Трек 1", "Исполнитель 1", "2001"],
                ["Трек 2", "Исполнитель 2", "2002"],
                ["Трек 3", "Исполнитель 3", "2003"]
            ]
        },
        {
            name: "Финансовая таблица",
            rows: 4,
            columns: 3,
            headers: ["Наименование", "Количество", "Цена"],
            data: [
                ["Товар 1", "10", "1000"],
                ["Товар 2", "5", "500"],
                ["Товар 3", "20", "1500"],
                ["Товар 4", "8", "800"]
            ]
        },
        {
            name: "Сравнительная таблица",
            rows: 3,
            columns: 4,
            headers: ["Параметр", "Объект A", "Объект B", "Объект C"],
            data: [
                ["Цена", "1000", "1200", "1100"],
                ["Вес", "1.5 кг", "1.3 кг", "1.4 кг"],
                ["Гарантия", "1 год", "2 года", "1.5 года"]
            ]
        },
        {
            name: "Контактная таблица",
            rows: 3,
            columns: 3,
            headers: ["Имя", "Телефон", "Электронная почта"],
            data: [
                ["Иван Иванов", "+7 (123) 456-78-90", "ivan@example.com"],
                ["Петр Петров", "+7 (987) 654-32-10", "petr@example.com"],
                ["Анна Смирнова", "+7 (555) 111-22-33", "anna@example.com"]
            ]
        },
    ];

    function createTable(rows, columns, headers, data = []) {
        const table = document.createElement('table');
        table.className = 'custom-table';

        if (headers.length > 0) {
            const headerRow = document.createElement('tr');
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = header.trim();
                th.setAttribute('contenteditable', 'true');
                headerRow.appendChild(th);
            });
            table.appendChild(headerRow);
        }

        for (let i = 0; i < rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < columns; j++) {
                const cell = document.createElement('td');
                cell.textContent = (data[i] && data[i][j]) || `Ячейка ${i + 1}-${j + 1}`;
                cell.setAttribute('contenteditable', 'true');
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
    }

    templatesSelect.addEventListener('change', (event) => {
        const selectedTemplateName = event.target.value;
        const selectedTemplate = tableTemplates.find(t => t.name === selectedTemplateName);

        if (selectedTemplate) {
            document.getElementById('rows').value = selectedTemplate.rows;
            document.getElementById('columns').value = selectedTemplate.columns;
            document.getElementById('headers').value = selectedTemplate.headers.join(', ');
        }
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const rows = parseInt(document.getElementById('rows').value, 10);
        const columns = parseInt(document.getElementById('columns').value, 10);
        const headers = document.getElementById('headers').value.split(',').map(h => h.trim());
        const selectedTemplateName = templatesSelect.value;
        const selectedTemplate = tableTemplates.find(t => t.name === selectedTemplateName);
        const data = selectedTemplate ? selectedTemplate.data : [];

        createTable(rows, columns, headers, data);
    });

    saveTableButton.addEventListener('click', () => {
        const table = tableContainer.querySelector('table');
        if (!table) {
            alert('Таблица не найдена для сохранения.');
            return;
        }

        const headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent);
        const data = Array.from(table.querySelectorAll('tr'))
            .slice(1)
            .map(row => Array.from(row.querySelectorAll('td')).map(td => td.textContent));

        const tableData = { headers, data };
        localStorage.setItem('savedTable', JSON.stringify(tableData));
        alert('Таблица сохранена.');
    });

    loadTableButton.addEventListener('click', () => {
        const savedTable = localStorage.getItem('savedTable');
        if (!savedTable) {
            alert('Сохранённая таблица не найдена.');
            return;
        }

        const { headers, data } = JSON.parse(savedTable);
        const rows = data.length;
        const columns = headers.length;

        createTable(rows, columns, headers, data);
    });

    saveButton.addEventListener('click', () => {
        const rows = document.getElementById('rows').value;
        const columns = document.getElementById('columns').value;
        const headers = document.getElementById('headers').value;
        const selectedTemplate = templatesSelect.value;

        localStorage.setItem('tableParams', JSON.stringify({ rows, columns, headers, selectedTemplate }));
        alert('Параметры сохранены.');
    });

    loadButton.addEventListener('click', () => {
        const savedParams = localStorage.getItem('tableParams');
        if (savedParams) {
            const { rows, columns, headers, selectedTemplate } = JSON.parse(savedParams);

            document.getElementById('rows').value = rows;
            document.getElementById('columns').value = columns;
            document.getElementById('headers').value = headers;
            templatesSelect.value = selectedTemplate || "";
        } else {
            alert('Сохранённых параметров не найдено.');
        }
    });
});