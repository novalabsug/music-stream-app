// set current year
const handleCurrentYear = () => {
    const currentYearEl = document.querySelector('.footer-side-nav p.center-align span.current-year');

    const currentYear = new Date().getFullYear();

    currentYearEl.innerHTML = currentYear;
}

handleCurrentYear();