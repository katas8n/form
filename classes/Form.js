export class Form {
    constructor({
        element,
        defaultValues = {},
        {
            criteria,
            {
                firstName: required,
                lastName: {
                    maxLength: {
                        value,
                        message
                    }
                }
            } = fields
        } = validation ,
        fetcher
    }) {
        if (!element) throw Error('FUCK YOU');

        this.element = element;
        this.inputs = this.element.children;

        const isThereDefaultVal = isObjEmpty(defaultValues);
        if (isThereDefaultVal) {
            this.defaultValues = defaultValues;
        }

        this.fetcher = fetcher(defaultValues);

        let { criteria, fields } = validation;
        const isThereCriteria = criteria;

        const { firstName, lastName } = fields;
        const { maxLength } = lastName;
        const { value, message } = maxLength;
        const { required } = firstName;

        if (!firstName || !value) {
            throw Error(message);
        }

        if (isThereCriteria) {
            criteria = validateCriteria();
        } else {
            console.error('Huck you ');
        }
    }

    getValues() {}
    reset() {}
    submit() {
        document
            .getElementsByClassName('form')[0]
            .addEventListener('submit', e => {
                e.preventDefault();

                const filtredFields = [];

                for (let i = 0; i < this.inputs.length; i++) {
                    if (this.inputs[i].type === 'submit') continue;

                    filtredFields.push(this.inputs[i]);
                }
                console.log('kirka');
            });
    }
    getState() {
        if (true) {
            let isDirty = this;
            return isDirty;
        }
    }
}
export function validateCriteria(criteria, criteriaFunction) {
    if (criteria === 'blur') {
        return criteria.addEventListener('blur', criteriaFunction);
    } else if (criteria === 'change') {
        return criteria.addEventListener('change', criteriaFunction);
    } else if (criteria === 'submit') {
        return criteria.addEventListener('submit', criteriaFunction);
    }
}
export function isObjEmpty(obj) {
    if (Object.keys(obj).length !== 0) {
        return true;
    }
}
