import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'

import EdiText from 'react-editext'

import './index.css';
import {deleteArticle, getArticle, getSelfUser, updateArticle} from "../../actions/api";
import styled from "styled-components";
import {StyledEdiText, StyledEdiTextArea} from "../../components/EdiText/EdiText";
import Comments from "../../components/Comments/Comments";

class ProjectPage extends React.Component {
    state = {
        project: null,
        title: '',
        content: '',
        error: false,
        mine: '',
        article: ''
    };

    componentDidMount() {
        getArticle(this.props.match.params.id)
            .then(response =>
                response.json())
            .then(response => {
                if (response.success) {
                    this.setState({
                        project : response.data.article,
                        title: response.data.article.title,
                        content: response.data.article.content,
                        mine: response.data.article.user_id
                    });
                } else if (response.status === 401) {
                    console.log('Need authenticate');
                } else {
                    this.setState( {
                        error: true
                    })
                }
            })
            .catch(e => console.log(e));

        getSelfUser().then(r => r.json()).then(response => {
            if (response.success) {
                this.setState({
                    article: response.data.user.id
                });
            } else if (response.status === 401) {
                console.log('Need authenticate');
            }
        })
            .catch(e => console.log(e));
    }

    RemoveArticle(id) {
        deleteArticle(id)
            .then(response => response.json())
            .then(response => {
                if (response.success) {
                    this.setState({
                        error: true
                    })
                } else if (response.status === 401) {
                    console.log('Need authenticate');
                }
            })
            .catch(e => console.log(e));
    }

    UpdateArticle(id, content, title, urlImage) {
        updateArticle(id, content, title, urlImage)
            .then(r => r.json())
            .then(response => {
                if (response.success) {
                    this.setState({
                        project : response.data.article,
                        title: response.data.article.title,
                        content: response.data.article.content,
                        mine: response.data.article.user_id
                    })
                } else if (response.status === 401) {
                    console.log('Need authenticate');
                }
            })
            .catch(e => console.log(e));
    }



    render() {
        const { title, content, project, error, mine, article } = this.state;

        console.log(error);
        if (error)
            return <Redirect to="/"/>; //<div className='container'>{error.message} Что-то пошло не так...</div>;


        if (!project) return <div className='container'>Loading...</div>;

        let btnCancel;
        btnCancel = <button className="btn btn-primary">Все статьи</button>;

        let btnDelete;
        if (mine === article ) {
            btnDelete = <button className='btn btn-primary' onClick={() => this.RemoveArticle(project.id)} >Удалить</button>;
        } else {
            btnDelete = <div className='container'></div>;
        }


        let handleSave = (val, name) => {
            switch (name) {
                case "title": {
                    this.UpdateArticle(project.id, content, val, project.image_url);
                    break;
                }
                case "content": {
                    this.UpdateArticle(project.id, val, title, project.image_url);
                    break;
                }
            }
        }


        return (
            <div className='project'>
                <div className='container'>
                    <img
                        className='project__screenshot'
                        src={project.image_url}
                        alt={title}
                        onError={(e) => {e.target.onerror = null; e.target.src="../logo192.png"}}
                    />
                    <h1 className='project__title'>
                        <StyledEdiText
                            validationMessage="Please type characters."
                            validation={val => val.length > 0}
                            showButtonsOnHover
                            type="text"
                            value={title}
                            name = "title"
                            onSave={(value) => handleSave(value, "title")}
                        />
                    </h1>

                    <div className='project__description'>
                        <StyledEdiTextArea
                            type='textarea'
                            showButtonsOnHover
                            inputProps={{
                                className: 'textarea',
                                placeholder: 'Type your content here',
                                style: {
                                    outline: 'none',
                                    minWidth: 'auto'
                                },
                                rows: 5
                            }}
                            value={content}
                            onSave={(value) => handleSave(value, "content")}
                        />
                    </div>

                    <div className='project__stack'>
                        {btnDelete}
                        <a href='/'>
                            {btnCancel}
                        </a>
                    </div>

                </div>
                <Comments id={project.id}></Comments>
            </div>
        );
    }
}

export default ProjectPage;