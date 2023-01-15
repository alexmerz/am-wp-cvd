import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import TopicPostListEntryView from './TopicPostListEntryView';

function TopicPostsListView(props) {
    if( !Array.isArray(props.posts) ||  props.posts.length === 0 ) {
        return (<div> Keine Artikel </div>);
    }

    const childs = props.posts.map((post) => <TopicPostListEntryView post={post} key={post.id} onDrag={props.onDrag} onDragEnd={props.onDragEnd}/>);
    return (
        <ListGroup variant="flush">
            {childs}
        </ListGroup>
    );
}

export default TopicPostsListView;
