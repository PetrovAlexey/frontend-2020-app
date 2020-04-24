import React, {Component} from "react";
import {getComments, postComment} from "../../actions/api";

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            comment: '',
            commentError: null,
        };
    }

    componentDidMount() {
        getComments(this.props.id).then(r => r.json())
            .then(r => {
                if (r.success) {
                    console.log(r);
                    this.setState({'comments' : r.data.comments});
                } else if (r.statusCode === 401) {
                    console.log('Need authenticate')
                }
            })
            .catch(e => console.log(e));
    }

    contentChangeHandler = event => {
        const comment = event.target.value;
        this.setState({
            comment,
            commentError: !comment
        });
    };

    submitHandler = event => {
        event.preventDefault();
        const { comment } = this.state;

        if (comment) {
            this.setState({
                comment: '',
                commentError: false
            });
            this.onSubmit();
            return;
        }
    };

    onSubmit() {
        postComment(
            this.props.id,
            this.state.comment,
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

        return(
            <div>
                <div className="list-group">

                    {this.state.comments.map(comment => (
                        <div className="list-group-item" key={comment.id}>
                            <h4 className="list-group-item-heading">{comment.user.username}</h4>
                            <p className="list-group-item-text">{comment.content}</p>
                        </div>
                    ))}

                </div>

                <form className='contact-form' onSubmit={this.submitHandler}>
                    <div className='contact-form__field'>
                        <textarea
                            rows='10'
                            value={content}
                            onChange={this.contentChangeHandler}
                            placeholder='Комментарий'
                        ></textarea>
                        {contentError ? (
                            <div className='error'>Заполните поле</div>
                        ) : null}
                    </div>
                    <button className='button' type='submit'>
                        Отправить
                    </button>
                </form>
            </div>
        )
    }


}

export default Comments;