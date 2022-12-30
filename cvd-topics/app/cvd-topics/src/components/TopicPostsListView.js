import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import TopicPostListEntryView from './TopicPostListEntryView';

class TopicPostsListView extends React.Component {
    render() {
        if( !Array.isArray(this.props.posts) ||  this.props.posts.length === 0 ) {
            return (<div> Keine Artikel </div>);
        }
        const childs = this.props.posts.map((post) => <TopicPostListEntryView post={post} key={post.id}/>);
        return (
            <ListGroup variant="flush">
                {childs}
            </ListGroup>
        );
    }
}

export default TopicPostsListView;
