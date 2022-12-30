import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import TopicView from './TopicView';
import TopicPseudoAllView from './TopicPseudoAllView';

class TopicsGridView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {topics: []};
    }

    componentDidMount() {
        window.fetch('/wp-json/wp/v2/cvd-topics',
            {
                headers: {
                    'X-WP-Nonce': this.props.nonce
                }
            })
            .then(response => response.json())
            .then(
                (topics) => {
                    this.setState({topics: topics});
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    render() {        
        const topics = this.state.topics.map((topic) => <TopicView topic={topic} key={topic.id} nonce={this.props.nonce}/>);
        return (
            <CardGroup>
                <TopicPseudoAllView key="_all" nonce={this.props.nonce}/>
                {topics}
            </CardGroup>
        );
    }
}

export default TopicsGridView;
