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
    }

    componentDidMount() {
        this.fetchPosts(this.state.post_status);
        // reload list ervery 60 seconds
        setInterval(() => {
            this.fetchPosts(this.state.post_status);
        }, 60000);        
    }

    render() {
        const posts = this.state.posts;    
    
        return (
            <Card>
                <Card.Header>
                <Nav variant="tabs" defaultActiveKey='#draft-all'>
                    <Nav.Item>
                        <Nav.Link href='#draft-all' onClick={this.changePostStatus}>Entwurf</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href='#published-all' onClick={this.changePostStatus}>Publiziert</Nav.Link>
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

    changePostStatus(event) {
        var ns = 'draft';
        if(this.state.post_status === 'draft') {
            ns = 'publish';     
        }
        this.fetchPosts(ns);    
    }

    fetchPosts(status) {
        window.fetch(
            '/wp-json/wp/v2/posts?status=' + status,
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
