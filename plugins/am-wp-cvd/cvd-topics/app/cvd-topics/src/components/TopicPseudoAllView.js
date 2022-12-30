import React from 'react';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import TopicPostsListView from './TopicPostsListView';

class TopicPseudoAllView extends React.Component {
  
    constructor(props) {
        super(props)
        this.state = { post_status : 'draft', posts: [] };

        this.changePostStatus = this.changePostStatus.bind(this);
        this.fetchPosts = this.fetchPosts.bind(this);   
        
        // reload list ervery 60 seconds
        setInterval(() => {
            this.fetchPosts(this.state.post_status);
        }, 60000);
    }

    componentDidMount() {
        this.fetchPosts(this.state.post_status);
    }

    render() {
        const posts = this.state.posts;    
    
        return (
            <Card>
                <Card.Header>
                <Nav variant="tabs" defaultActiveKey={this.id_attrib('#draft-', topic.id)}>
                    <Nav.Item>
                        <Nav.Link href={this.id_attrib('#draft-', topic.id)} onClick={this.changePostStatus}>Entwurf</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={this.id_attrib('#published-', topic.id)} onClick={this.changePostStatus}>Publiziert</Nav.Link>
                    </Nav.Item>
                </Nav>
                </Card.Header>
                <Card.Body>
                    <Card.Title>Alle</Card.Title>
                    <TopicPostsListView posts={posts} /> 
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
            ns = 'publish';     
        }
        this.fetchPosts(ns);    
    }

    fetchPosts(status) {
        window.fetch(
            'http://localhost/wp-json/wp/v2/posts?status=' + status,
            {
                headers: {
                    'X-WP-Nonce': this.props.nonce
                }
            }) 
        .then(response => response.json())
        .then(
            (posts) => {
                this.setState({posts: posts, post_status: status});          
            },
            (error) => {
                console.log(error);
            }
        );    
    } 
}

export default TopicPseudoAllView;
