const form = document.querySelector('form');
const inputs = form.querySelectorAll('form input');

function isPasswordFieldsEqual() {
    const passwordField = document.getElementById('password');
    const confirmationPasswordField = document.getElementById('passwordconfirmation');

    if (passwordField.value === confirmationPasswordField.value) return true;
    return false;
}

function checkInput(e) {
    const currentInput = e.currentTarget;
    const inputValidity = currentInput.validity;

    const error = (msg) => currentInput.setCustomValidity(msg);

    if (inputValidity.valueMissing) error('The field is empty.');
    else if (inputValidity.typeMismatch) error(`You entered your data in the wrong format. This should be an ${currentInput.type}.`);
    else if (inputValidity.rangeOverflow) error(`This number is too big. Please choose a value betweent ${currentInput.min} and ${currentInput.min}.`);
    else if (inputValidity.rangeUnderflow) error(`This number is too small. Please choose a value betweent ${currentInput.min} and ${currentInput.min}.`);
    // if no error is found, add valid pseudo class
    else error('');

    if (currentInput.id === 'passwordconfirmation') {
        if (!(isPasswordFieldsEqual())) error('The passwords need to be the same');
    }
}

function isFieldEmpty() {
    const inputsArray = Array.from(inputs);
    const somethingEmpty = inputsArray.some((input) => input.value === '');
    if (somethingEmpty) return true;
    return false;
}

function checkForm(e) {
    // stop form from sending request
    e.preventDefault();
    if (isFieldEmpty()) return;
    const isValid = e.currentTarget.reportValidity();
    if (isValid) e.currentTarget.submit();
}

inputs.forEach((input) => input.addEventListener('input', checkInput));
form.addEventListener('submit', checkForm);