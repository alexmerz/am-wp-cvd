import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import TopicPostListEntryView from './TopicPostListEntryView';

class TopicPostsListView extends React.Component {
    render() {
        const posts = [];
        this.props.posts.forEach(element => {
            if(element.post_status === this.props.status)
                posts.push(element);
        });
        const childs = posts.map((post) => <TopicPostListEntryView post={post} key={post.ID}/>);
        return (
            <ListGroup variant="flush">
                {childs}
            </ListGroup>
        );
    }
}

export default TopicPostsListView;
