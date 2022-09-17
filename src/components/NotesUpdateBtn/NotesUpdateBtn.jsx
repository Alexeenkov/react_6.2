import React from 'react';

/**
 * Верстка кнопки обновления списка заметок (карточек)
 */
const NotesUpdateBtn = ({ handlerUpdateCards }) => {
    return (
        <button type='button' onClick={handlerUpdateCards}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m1.7507 16.0022c1.601 4.096 5.586 6.998 10.249 6.998 6.075 0 11-4.925 11-11m-.75-4.002c-1.601-4.097-5.587-6.998-10.25-6.998-6.075 0-11 4.925-11 11m8 4h-8v8m22-24v8h-8" fill="none" stroke="green" strokeWidth="2" />
            </svg>
        </button>
    )
}

export default NotesUpdateBtn;