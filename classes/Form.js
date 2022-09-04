import { isNull } from '../utils/isNull';
import { isKeyInObj } from '../utils/isKeyInObj';

export class Form {
    constructor({ element, defaultValues, validation, fetcher }) {
        if (!element && !isNull(element)) return;

        if (typeof element === 'string')
            this.element = document.querySelector(element);

        this.element = element;

        this.inputs = this.element.childNodes;

        [this.inputFirstName, this.inputLastName] = this.getInputs();

        this.state = { isValid: false, isDirty: false };

        this.validation = validation;

        const { criteria, fields } = this.validation;
        const { firstName, lastName } = fields;

        const { required } = firstName;

        const { maxLength } = lastName;

        const { value, message } = maxLength;

        if (defaultValues) {
            this.defaultValues = defaultValues;

            const { firstName, lastName, ...other } = this.defaultValues;

            this.setInputValue(this.inputFirstName, firstName);
            this.setInputValue(this.inputLastName, lastName);
        }

        this.inputFirstName.addEventListener(criteria, () => {
            if (
                isKeyInObj('required', firstName) &&
                !isNull(this.inputFirstName.value)
            ) {
                this.inputFirstName.required = true;
                this.inputFirstName.title = required;

                if (this.inputFirstName.value !== defaultValues.firstName) {
                    this.state.isDirty = true;

                    console.log(this.inputFirstName.value);
                }
            } else {
                this.state.isValid = false;
                throw Error("Doesn't valid ");
            }
        });

        this.inputLastName.addEventListener(criteria, () => {
            if (
                isKeyInObj('value', maxLength) &&
                !isNull(this.inputLastName.value)
            ) {
                this.inputLastName.max = value;

                if (this.inputLastName.value !== defaultValues.lastName) {
                    this.state.isDirty = true;
                }

                if (this.inputLastName.length >= value) {
                    this.onError(message);

                    this.reset('lastName');
                }
            } else {
                this.state.isValid = false;

                throw Error("Doesn't valid ");
            }
        });

        this.fetcher = fetcher;
    }
    getInputs() {
        const fields = [];

        for (const input of this.inputs) {
            if (input.name === 'firstName' || input.name === 'lastName') {
                fields.push(input);
            }
        }

        return fields;
    }

    setInputValue(element, value) {
        element.value = value;
    }

    getState() {
        return this.state;
    }

    submit() {
        this.element.addEventListener('submit', async e => {
            e.preventDefault();
            if (this.state.isDirty === false)
                throw console.error('It doesnt dirty');

            const resp = await this.fetcher({
                firstName: this.inputFirstName.value,
                lastName: this.inputLastName.value
            });
            if (
                resp.status === 400 &&
                resp.status === 404 &&
                resp.status === 403
            ) {
                this.onError('Error 4xx status');
                return;
            }

            this.onSuccess({
                firstName: this.inputFirstName.value,
                lastName: this.inputLastName.value
            });

            const data = await resp.json();
        });
    }

    reset(field) {
        if (field) {
            this.inputs.forEach(input => {
                if (field === input.name) {
                    input.value = '';
                }
            });
        } else {
            this.inputs.forEach(input => {
                if (input.type !== 'submit') input.value = '';
            });
        }
    }

    onError(errors) {
        console.log('[errors]', errors);
    }

    onSuccess({ firstName, lastName }) {
        console.log('[firstName]', firstName);
        console.log('[lastName]', lastName);
    }
}
