// count down
const countDownEl = document.querySelector('p.error span.count-down');
let count = 10;

setTimeout(() => {
    setInterval(() => {
        countDownEl.innerHTML = `${count}`;
        count -= 1;

        if (count < 1) {
            location.assign('/');
        }
    }, 1000);
}, 3000);