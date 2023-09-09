document.addEventListener('click', event => {
    const type = event.target.getAttribute('data-type')

    if (type === 'edit') {
        const id = event.target.getAttribute('data-id')
        const title = event.target.getAttribute('data-title')
        const newTitle = prompt('Enter a new note title:', title)

        if (newTitle) {
            window.location.href = `/?action=update&id=${id}&title=${newTitle}`;
        }
    }

    if (type === 'remove') {
        const id = event.target.getAttribute('data-id')
        if (confirm('Are you sure you want to remove this note?')) {
            window.location.href = `/?action=delete&id=${id}`;
        }
    }
});
