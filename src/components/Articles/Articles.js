import PortfolioItem from "../PortfolioItem/PortfolioItem";
import React, {Component, useState} from "react";
import {getArticles, getSelfUser, postArticle} from "../../actions/api";


class   Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            title: '',
            titleError: null,
            content: '',
            contentError: null,
            imageUrl: '',
            imageUrlError: null,
            closed: true
        };
    }

    componentDidMount() {
        getArticles().then(r => r.json())
            .then(r => {
                if (r.success) {
                    console.log(r);
                    this.setState({'articles' : r.data.articles});
                } else if (r.statusCode === 401) {
                    console.log('Need authenticate')
                }
            })
            .catch(e => console.log(e));
        console.log(this.state.articles);
    }

    openForm() {
        this.setState({
            closed: false
        });
    }

    closeForm() {
        this.setState({
            closed: true
        });
    }

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
            this.closeForm();
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
                    console.log(response);
                    this.setState({'articles' : [response.data.article, ...this.state.articles]});
                } else if (response.status === 401) {
                    console.log('Need authenticate');
                }
            })
            .catch(e => console.log(e));
    }

    render() {
        const { title, titleError, content, contentError, imageUrl,
            imageUrlError } = this.state;

        return(
            <div className='portfolio'>
                <div className='container card-deck'>
                {this.state.articles.map(work => (
                    <PortfolioItem key={work.title} work={work} />
                ))}

                    <div className="card portfolio-item">
                        {this.state.closed ? (
                            <button
                                className='btn'
                                onClick={() => this.openForm()}>
                                Добавить статью
                            </button>
                        ) : (
                            <div className='form-group'>
                                <form className='form' onSubmit={this.submitHandler}>
                                    <div className='card-title'>
                                        <input
                                            className='form-control'
                                            value={imageUrl}
                                            onChange={this.imageChangeHandler}
                                            placeholder='Картинка'
                                        />
                                    </div>

                                        <div className='card-title'>
                                            <input
                                                className='form-control'
                                                value={title}
                                                onChange={this.titleChangeHandler}
                                                placeholder='Заголовок'
                                                required
                                            />

                                        </div>
                                    <div className='card-body'>
                                        <textarea
                                            className='form-control'
                                            rows='8'
                                            value={content}
                                            onChange={this.contentChangeHandler}
                                            placeholder='Содержание'
                                            required/>
                                            <button className='btn btn-primary' type='submit'>
                                                Отправить
                                            </button>
                                    </div>

                                </form>
                            </div>
                        )}
                    </div>

                </div>

            </div>

        )
    }


}

export default Articles;