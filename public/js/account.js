// submit signin form
const handleFormSubmission = () => {
    // signup form
    const signupForm = document.querySelector('form#signup-form');

    signupForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const firstname = signupForm.firstname.value;
        const lastname = signupForm.lastname.value;
        const email = signupForm.email.value;
        const phone = signupForm.phone.value;
        const password = signupForm.password.value;

        // error elements
        const firstnameError = signupForm.querySelector('.input-grp .input p.error.firstname-error');
        const lastnameError = signupForm.querySelector('.input-grp .input p.error.lastname-error');
        const emailError = signupForm.querySelector('.input-grp .input p.error.email-error');
        const phoneError = signupForm.querySelector('.input-grp .input p.error.phone-error');
        const passwordError = signupForm.querySelector('.input p.error.password-error');

        // set error elements to empty
        firstnameError.innerHTML = '';
        lastnameError.innerHTML = '';
        emailError.innerHTML = '';
        phoneError.innerHTML = '';
        passwordError.innerHTML = '';

        try {
            const res = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({
                    firstname,
                    lastname,
                    email,
                    phone,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            let User = '';
            let Errors = '';

            if (data.user) {
                User = data.user;
            } else {
                Errors = data.errors;
            }

            if (User !== '') {
                location.assign('/account')
            }

            // handle errors
            if (Errors !== '') {
                firstnameError.innerHTML = data.errors.firstname;
                lastnameError.innerHTML = data.errors.lastname;
                emailError.innerHTML = data.errors.email;
                phoneError.innerHTML = data.errors.phone;
                passwordError.innerHTML = data.errors.password;
            }

        } catch (error) {
            console.log(error);
        }
    })

    // signin form
    const signinForm = document.querySelector('form#signin-form');

    signinForm.addEventListener('submit', async(e) => {
        e.preventDefault();

        const email = signinForm.email.value;
        const password = signinForm.password.value;

        // error elements
        const emailError = signinForm.querySelector('.input p.error.email-error');
        const passwordError = signinForm.querySelector('.input p.error.password-error');

        // set error elements to empty
        emailError.innerHTML = '';
        passwordError.innerHTML = '';

        try {
            const res = await fetch('/signin', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            let User = '';
            let Errors = '';

            if (data.user) {
                User = data.user;
            } else {
                Errors = data.errors;
            }

            if (User !== '') {
                location.assign('/')
            }

            // handle errors
            if (Errors !== '') {
                console.log(data)
                emailError.innerHTML = data.errors.email;
                passwordError.innerHTML = data.errors.password;
            }

        } catch (error) {
            console.log(error);
        }
    })
}

const handleSwitchForm = () => {
    const signinForm = document.querySelector('form#signin-form');
    const signupForm = document.querySelector('form#signup-form');
    const signinFormBtn = document.querySelector('.forms-header a.signin-form-btn');
    const signupFormBtn = document.querySelector('.forms-header a.signup-form-btn');

    signupForm.classList.add('show');
    signupFormBtn.classList.add('active');

    signinFormBtn.addEventListener('click', () => {
        signinForm.classList.add('show');
        signinFormBtn.classList.add('active');
        signupForm.classList.remove('show');
        signupFormBtn.classList.remove('active');
    })

    signupFormBtn.addEventListener('click', () => {
        signupForm.classList.add('show');
        signupFormBtn.classList.add('active');
        signinForm.classList.remove('show');
        signinFormBtn.classList.remove('active');
    })
}

handleSwitchForm();

handleFormSubmission();
// submit signin form