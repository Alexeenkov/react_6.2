import React from 'react';

/**
 * Верстка формы для создания новой заметки
 */
const NotesForm = ({ handlerInputsForm, handlerSubmitForm, value }) => {
    return (
        <form action="#0" className='form' onSubmit={handlerSubmitForm}>
            <textarea name="textarea" id="textarea" onChange={handlerInputsForm} value={value} placeholder='Введите текст заметки'></textarea>
            <button type='submit'>
                <svg enableBackground="new 0 0 1792 1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="m132.9 187.7 1526.2 708.2-1526.2 708.2 373.5-708.2z"/>
                </svg>
            </button>
        </form>
    )
}

export default NotesForm;