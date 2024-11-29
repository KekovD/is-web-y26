document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    const dataContainer = document.getElementById("data-container");

    const fetchComments = async (url) => {
        try {
            preloader.style.display = "block";
            dataContainer.innerHTML = "";

            await new Promise(resolve => setTimeout(resolve, 3000));

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            renderData(data);
        } catch (error) {
            if (error instanceof TypeError) {
                showError("⚠ Проблема с сетью. Проверьте подключение к интернету.");
            } else if (error.message.includes("HTTP error")) {
                showError("⚠ Ошибка при получении данных. Попробуйте позже.");
            } else {
                showError("⚠ Что-то пошло не так. Попробуйте позже.");
            }
            console.error(error);
        } finally {
            preloader.style.display = "none";
        }
    };

    const renderData = (comments) => {
        comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");
            commentElement.innerHTML = `
            <h3>${comment.name}</h3>
            <p>${comment.body}</p>
            <small>Email: ${comment.email}</small>
        `;
            dataContainer.appendChild(commentElement);

            setTimeout(() => {
                commentElement.classList.add("show");
            }, 10);
        });
    };

    const showError = (message) => {
        dataContainer.innerHTML = `<div class="error">${message}</div>`;
    };

    const randomFilter = Math.random() > 0.5 ? "?id_gte=100" : "?id_lte=5";
    const apiUrl = `https://jsonplaceholder.typicode.com/comments${randomFilter}`;

    fetchComments(apiUrl);
});
