// set current year.
const handleCurrentYear = () => {
    const newDate = new Date();
    const currentYear = newDate.getFullYear();
    const currentYearEl = document.querySelector('.current-year');

    currentYearEl.innerHTML = `${currentYear}`;
}

// Display dropdown menu
const handleDropdownMenu = () => {
    const menu = document.querySelector('.user-dropdown');
    const menuBtnClose = document.querySelector('.user-dropdown i#dropdown-close');
    const menuBtnOpen = document.querySelector('.m-side-nav .side-nav-icons a.user-icon');

    if (menuBtnClose) {
        if (menuBtnOpen) {
            menuBtnClose.addEventListener('click', () => {
                menu.classList.remove('show');
            });

            menuBtnOpen.addEventListener('click', () => {
                menu.classList.add('show');
            });
        }
    }
}

handleDropdownMenu();
handleCurrentYear();