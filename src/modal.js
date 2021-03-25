document.addEventListener("click", (event) => {
    if (!event.target.matches('.modal-close')) return;
    event.preventDefault();

    const is_open = document.querySelector('.is-open');

    if (is_open) {
        is_open.classList.remove('is-open');
    }
})