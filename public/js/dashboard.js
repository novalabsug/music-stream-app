// fetch email
const email = document.querySelector('.user-profile-info p').innerHTML.trim();

// fetch info on Events
const handleEvents = async(email) => {
    try {
        const res = await fetch('/dashboard', {
            method: 'POST',
            body: JSON.stringify({
                email
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        // fetch section to insert data
        const secEl = document.querySelector('section#sec-2');
        let Events = ''
        console.log(data);

        if (data.events) {
            Events = data.events;
        }

        if (data.errors) {
            secEl.innerHTML = `
            <p class="center-align">You don't have any tickets yet. Let's get started now</p>
            <a href="/get-started/create" class="btn">Create new event</a>
            `;
        }

        // Insert data into section
        if (Events.length < 1) {
            secEl.className = "error";
            secEl.innerHTML = `
            <p class="center-align">You don't have any tickets yet. Let's get started now</p>
            <a href="/get-started/create" class="btn">Create new event</a>
            `;
        }

    } catch (err) {
        console.log(err);
    }
}

handleEvents(email);