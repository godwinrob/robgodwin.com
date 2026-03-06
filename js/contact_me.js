// Replace YOUR_FORM_ID with your Formspree form ID from https://formspree.io
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successDiv = document.getElementById('success');
    const submitBtn = document.getElementById('btnSubmit');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        submitBtn.disabled = true;
        successDiv.innerHTML = '';

        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
        };

        const firstName = data.name.split(' ')[0];

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                successDiv.innerHTML =
                    '<div class="alert alert-success">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                    '<strong>Your message has been sent.</strong>' +
                    '</div>';
                form.reset();
            } else {
                const json = await response.json();
                const msg = json.errors ? json.errors.map(e => e.message).join(', ') : 'Unknown error.';
                throw new Error(msg);
            }
        } catch (err) {
            successDiv.innerHTML =
                '<div class="alert alert-danger">' +
                '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
                '<strong>Sorry ' + firstName + ', it seems my mail server is not responding. Please try again later!</strong>' +
                '</div>';
        } finally {
            submitBtn.disabled = false;
        }
    });

    document.getElementById('name').addEventListener('focus', function () {
        successDiv.innerHTML = '';
    });
});
