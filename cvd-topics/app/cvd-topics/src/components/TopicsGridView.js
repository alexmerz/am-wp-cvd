import React from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import TopicView from './TopicView';

class TopicsViewGrid extends React.Component {
    render() {        
        const topics = this.props.topics.map((topic) => <TopicView topic={topic} key={topic.meta_topic_id}/>);

        return (
            <CardGroup>
                {topics}
            </CardGroup>
        );
    }
}

export default TopicsViewGrid;
