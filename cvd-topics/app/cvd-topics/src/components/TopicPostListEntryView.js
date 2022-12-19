import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

class TopicPostListEntryView extends React.Component {
    render() {
        const post = this.props.post;
        return (
            <ListGroup.Item>
                {post.post_title}
            </ListGroup.Item>
        );
    }
}

export default TopicPostListEntryView;
