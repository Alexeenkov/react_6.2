import React from 'react';
import NotesCard from '../NotesCard/NotesCard';
import NotesForm from '../NotesForm/NotesForm';
import NotesUpdateBtn from '../NotesUpdateBtn/NotesUpdateBtn';

/**
 * Компонент заметок. Взаимодействует с сервером для записи, удаления и обновления карточек с заметками.
 * Возвращает верстку блока с заголовком, кнопкой обновления, списком карточек и формой для добавления новой.
 */
class Notes extends React.Component {
    constructor(props) {
        super(props);
        // Прибиваем контекст выполнения функций к данному компоненту
        this.handlerInputsForm = this.handlerInputsForm.bind(this);
        this.handlerSubmitForm = this.handlerSubmitForm.bind(this);
        this.handlerDeleteCard = this.handlerDeleteCard.bind(this);
        this.handlerUpdateCards = this.handlerUpdateCards.bind(this);

        // Состояние, в котором храним введенное в компоненте NotesForm значение и карточки,
        // которые отрисовываются компонентом NotesCard
        this.state = {
            'textarea': '',
            'cards': [],
        };
    }

    /**
     * Когда компонент загружен на странице, отправляем запрос на получение массива карточек
     */
    componentDidMount() {
        this.loadCards();
    }

    /**
     * Отправляет запрос на получение массива карточек и записывает его в состояние компонента
     */
    loadCards() {
        fetch('http://localhost:7777/notes', {
            method: 'GET',
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    'cards': [...data],
                }
            });
        });
    }

    /**
     * Записывает введенное значение пользователем в состояние компонента 
     * @param {event} - событие изменения значения поля ввода в форме
     */
    handlerInputsForm({ target }) {
        const name = target.name;
        const value = target.value;
        this.setState(prevState => { return { ...prevState, [name]: value } });
    }

    /**
     * Отправляет введенный в поле формы текст для записи в БД, после чего отправляет запрос
     * на получение обновленного массива карточек и записывает его в состояние
     * @param {event} e - событие отправки формы
     */
    handlerSubmitForm(e) {
        e.preventDefault();
        // Формируем передаваемый на сервер объект
        const newNote = {
            id: 0,
            content: this.state.textarea,
        }
        // Отправляем его на сервер в формате JSON
        const request = fetch('http://localhost:7777/notes', {
            method: 'POST',
            body: JSON.stringify(newNote),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        // После успешной записи в БД запрашиваем обновленный массив и записываем в состояние
        request.then((response) => {
            if (response.ok) {
                this.loadCards();
                // Очищаем поле ввода
                this.setState(prevState => {
                    return {
                        ...prevState,
                        'textarea': '',
                    }
                })
            }
        })
    }

    /**
     * Отправляет запрос на удаление конкретной карточки из массива, на которой произошел клик по кнопке удаления
     * @param {event} e - событие кнопки удаления, на которой произошел клик
     * @param {string} id - id карточки, которую необходимо удалить
     */
    handlerDeleteCard(e, id) {
        e.preventDefault();
        const request = fetch(`http://localhost:7777/notes/${id}`, {
            method: 'DELETE',
        });
        request.then((response) => {
            if (response.ok) {
                this.loadCards();
            }
        })
    }

    /**
     * Обновляет массив карточек при клике на кнопку обновления
     * @param {event} e - Событие клика по кнопке обновления списка карточек
     */
    handlerUpdateCards(e) {
        e.preventDefault();
        this.loadCards();
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='title-container'>
                    <h1 className='title'>Заметки</h1>
                    <NotesUpdateBtn handlerUpdateCards={this.handlerUpdateCards} />
                </div>
                <ul className='cards'>
                    {!this.state.cards.length && <li>Заметки отсутствуют. Введите в форму ниже свою первую заметку</li>}
                    {this.state.cards.map(card => <NotesCard key={card.id} content={card.content} id={card.id} handlerDeleteCard={this.handlerDeleteCard}/>)}
                </ul>
                <div className='form-container'>
                    <span className='title'>Новая заметка</span>
                    <NotesForm handlerInputsForm={this.handlerInputsForm} handlerSubmitForm={this.handlerSubmitForm} value={this.state.textarea} />
                </div>
            </div>
        )
    }
}

export default Notes;