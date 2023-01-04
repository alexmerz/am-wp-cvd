import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';

class TopicPostListEntryView extends React.Component {
    render() {
        const post = this.props.post;
        const edit = '/wp-admin/post.php?post=' + this.props.post.id + '&action=edit';
        return (
            <ListGroup.Item>
                <div class="cvd-topics-listitem-title" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
                <div class="cvd-topics-listitem-menu"><a href={post.link} target="_blank">Ansicht</a>|<a href={edit} target="_blank">Bearbeiten</a></div>
            </ListGroup.Item>
        );
    }
}

export default TopicPostListEntryView;
