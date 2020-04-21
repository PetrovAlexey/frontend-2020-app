import React from 'react';
import works from '../../works';

import './index.css';
import {getArticle, getArticles, getSelfUser} from "../../actions/api";

class ProjectPage extends React.Component {
    state = {
        project: null,
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
                        'project' : response.data.article,
                        error: !response.success,
                        mine: response.data.article.user_id
                    });
                } else if (response.status === 401) {
                    console.log('Need authenticate');
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

    render() {
        const { project, error, mine, article } = this.state;

        console.log(mine);
        if (error)
            return <div className='container'>{error.message} Что-то пошло не так...</div>;


        if (!project) return <div className='container'>Loading...</div>;

        let button;
        if (mine === article ) {
            button = <button>Изменить</button>;
        } else {
            button = <div className='container'></div>;
        }


        return (
            <div className='project'>
                <div className='container'>
                    <img
                        className='project__screenshot'
                        src={project.image_url}
                        alt={project.title}
                    />
                    <h1 className='project__title'>{project.title}</h1>

                    <p className='project__description'>
                        {project.content}
                    </p>

                    <div className='project__stack'>
                        {button}
                        {/*project.stack.join(', ')*/}
                    </div>

                    <div>
                        <a href='#' className='project__link'>
                            Ссылка на проект
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProjectPage;