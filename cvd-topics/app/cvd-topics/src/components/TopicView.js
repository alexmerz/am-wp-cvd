import React from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import TopicPostsListView from './TopicPostsListView';

class TopicView extends React.Component {
  
    constructor(props) {
        super(props)
        this.state = { post_status : 'draft' };

        this.changePostStatus = this.changePostStatus.bind(this);
    }

  render() {
    const topic = this.props.topic;    
    
    return (
        <Card>
            <Card.Header>
            <Nav variant="tabs" defaultActiveKey={this.id_attrib('#draft-', topic.meta_topic_id)}>
                <Nav.Item>
                    <Nav.Link href={this.id_attrib('#draft-', topic.meta_topic_id)} onClick={this.changePostStatus}>Entwurf</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={this.id_attrib('#published-', topic.meta_topic_id)} onClick={this.changePostStatus}>Publiziert</Nav.Link>
                </Nav.Item>
            </Nav>
            </Card.Header>
            <Card.Body>
                <Card.Title>{topic.post_title}</Card.Title>
                <TopicPostsListView posts={topic.posts} status={this.state.post_status} /> 
            </Card.Body>            
      </Card>
    );
  }

  id_attrib(id, attrib) {
    return id + attrib;
  }

  changePostStatus(event) {
    var ns = 'draft';
    if(this.state.post_status === 'draft') {
        ns = 'published';     
    }
    this.setState({post_status: ns});
  } 
}

export default TopicView;
