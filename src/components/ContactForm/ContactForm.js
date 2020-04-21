import React, { Component } from 'react';
import './ContactForm.css';
import {postArticle} from "../../actions/api";


class ContactForm extends Component {
    state = {
        title: '',
        titleError: null,
        content: '',
        contentError: null,
        imageUrl: '',
        imageUrlError: null
    };

    titleChangeHandler = event => {
        const title = event.target.value;
        this.setState({
            title,
            titleError: !title
        });
    };

    contentChangeHandler = event => {
        const content = event.target.value;
        this.setState({
            content,
            contentError: !content
        });
    };

    imageChangeHandler = event => {
        let imageUrl = event.target.value;
        this.setState({
            imageUrl,
            imageUrlError: !imageUrl
        });
    };


    submitHandler = event => {
        event.preventDefault();

        const { title, content } = this.state;

        if (title && content) {
            this.setState({
                title: '',
                titleError: false,
                content: '',
                contentError: false
            });
            this.props.onSubmit();
            this.onSubmit();
            return;
        }

        this.setState({
            titleError: !title,
            contentError: !content
        });
    };

    onSubmit() {
        postArticle(
            this.state.content,
            this.state.title,
            this.state.imageUrl
        ).then(r => r.json())
            .then(response => {
                if (response.success) {

                } else if (response.status === 401) {
                    console.log('Need authenticate');
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        const { title, titleError, content, contentError, imageUrl,
            imageUrlError } = this.state;

        return (
            <form className='contact-form' onSubmit={this.submitHandler}>
                <div className='contact-form__field'>
                    <input
                        value={imageUrl}
                        onChange={this.imageChangeHandler}
                        placeholder='Картинка'
                    />
                    {imageUrlError ? (
                        <div className='error'>Заполните поле</div>
                    ) : null}
                </div>

                <div className='contact-form__field'>
                    <input
                        value={title}
                        onChange={this.titleChangeHandler}
                        placeholder='Заголовок'
                    />
                    {titleError ? (
                        <div className='error'>Заполните поле</div>
                    ) : null}
                </div>
                <div className='contact-form__field'>
                    <textarea
                        rows='10'
                        value={content}
                        onChange={this.contentChangeHandler}
                        placeholder='Содержание'
                    ></textarea>
                    {contentError ? (
                        <div className='error'>Заполните поле</div>
                    ) : null}
                </div>
                <button className='button' type='submit'>
                    Отправить
                </button>
            </form>
        );
    }
}

export default ContactForm;