import works from "../../works";
import PortfolioItem from "../PortfolioItem/PortfolioItem";
import {Component} from "react/cjs/react.production.min";
import React from "react";
import {getArticles, getSelfUser} from "../../actions/api";

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: []
        };

    }

    render() {
        return(
            <div className='portfolio'>
                <div className='container card-deck'>
                {this.state.articles.map(work => (
                    <PortfolioItem key={work.title} work={work} />
                ))}
                </div>

            </div>
        )
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

}

export default Articles;