import { Form } from '../classes/Form';

export const form = new Form({
    // element должен быть обязательно.
    // Он определяет конкретную форму на странице, с которой осуществляется работа в данный момент.
    //Может принимать DOM-элемент или селектор, который сам найдёт DOM-элемент
    element: document.querySelector('.form'), // '.form'
    // Функция, которая выполняет отправку запроса.
    // Должна быть обязательно.
    // Отправить форму нельзя, если хоть одно её поле не валидно или не было изменено,
    // т.е.ни одно значение поля не изменилось с дефолтного
    fetcher: async ({ firstName, lastName }) => {
        const response = await new Promise(() => {
            console.log('[Okay] ', firstName, lastName);
        });
        const data = await response.json();

        return data;
    },
    // Значения по умолчанию полей выбранной формы.
    // Это опциональная настройка
    defaultValues: {
        firstName: 'John',
        lastName: 'Doe'
    },
    // Валидация полей выбранной формы.
    // Это опциональная настройка
    validation: {
        // Индикатор когда именно валидация должна отработать.
        // Принимает такие значения как 'blur', 'change' и 'submit'.
        // blur - когда потерян фокус с поля
        // change - когда изменилось значение в поле
        // submit - в момент перед отправкой формы
        criteria: 'blur',
        // Список всех полей выбранной формы
        fields: {
            // Уникальное имя поля
            firstName: {
                // required - поле обязательно к заполнения (не может быть пустым, но может быть пустой строкой).
                // Значение свойства required - валидационное сообщение об ошибке, которое должно появиться под полем
                required: 'This field is required'
            },
            // Уникальное имя поля
            lastName: {
                // maxLength - максимальная длина введенного в поле значения
                maxLength: {
                    // Значение максимальной длины
                    value: 25,
                    // Валидационное сообщение об ошибке, которое должно появиться под полем
                    message: 'Maximum length is 25'
                }
            }
        }
    },
    // Функция, которая автоматически вызывается, когда функция fetcher вернула ошибку или статус код >= 400
    onError: errors => {
        console.log('[errors]', errors);
    },
    // Функция, которая автоматически вызывается, когда функция fetcher вернула успешный результат своей работы
    onSuccess: ({ firstName, lastName }) => {
        console.log('[firstName]', firstName);
        console.log('[lastName]', lastName);
    }
});

// Императивный API:
// Получить все текущие значения полей формы
form.getValues(); // { firstName: 'John', lastName: 'Doe' }
// Получить текущее значения поля firstName
form.getValues('firstName'); // 'John'

// Сбросить все значение формы к значением по умолчанию
form.reset(); // { firstName: '', lastName: '' }
// Сбросить значение поля firstName к значению по умолчанию
form.reset('firstName'); // { firstName: '', lastName: 'Doe' }

// Отправить форму
form.submit(); // Форма отправляется...

// isValid - флаг, который говорит, что форма валидна
// isDirty - флаг, который говорит, что хотя бы одно значение поля формы было изменено
const { isValid, isDirty } = form.getState(); // Получить текущий стейт формы
