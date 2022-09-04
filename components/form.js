import { Form } from '../classes/Form';

export const form = new Form({
    element: document.querySelector('.form'), // '.form'
    fetcher: async ({ firstName, lastName }) => {
        const response = await fetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method: 'POST',
                body: { firstName, lastName }
            }
        );

        return response;
    },
    defaultValues: {
        firstName: 'John',
        lastName: 'Doe'
    },
    validation: {
        criteria: 'blur',
        fields: {
            firstName: {
                required: 'This field is required'
            },
            lastName: {
                maxLength: {
                    value: 25,
                    message: 'Maximum length is 25'
                }
            }
        }
    },
    onError: errors => {
        console.log('[errors]', errors);
    },
    onSuccess: ({ firstName, lastName }) => {
        console.log('[firstName]', firstName);
        console.log('[lastName]', lastName);
    }
});

// // Получить все текущие значения полей формы
// form.getValues(); // { firstName: 'John', lastName: 'Doe' }
// // Получить текущее значения поля firstName
// form.getValues('firstName'); // 'John'
// form.getValues('lastName'); //! +

// Сбросить все значение формы к значением по умолчанию
// form.reset(); // { firstName: '', lastName: '' }
// Сбросить значение поля firstName к значению по умолчанию
// form.reset('firstName'); // { firstName: '', lastName: 'Doe' }
// Отправить форму
form.submit(); // Форма отправляется...

// isValid - флаг, который говорит, что форма валидна
// isDirty - флаг, который говорит, что хотя бы одно значение поля формы было изменено
const { isValid, isDirty } = form.getState(); // Получить текущий стейт формы
