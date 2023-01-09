import React, { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';
import TopicPostsListView from './TopicPostsListView';
import {useDrop} from 'react-dnd';

function TopicView(props) {
    const limit = 20;
    const [post_status, setPostStatus] = useState('draft');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);     

    const [, drop] = useDrop(() => ({
        accept: "cvd-topics-listitem",
        drop : (item, monitor) => {
            setCvdTopic(item.id, props.topic, props.nonce);
        }
    }));

    function changePostStatus() {
        var ns = 'draft';
        if(post_status === 'draft') {
            ns = 'publish';     
        }
        setPostStatus(ns);
    }

    function setCvdTopic(postid) {
        setLoading(true);
        let set_id = ''; // if topic is -1, we want to remove the topic from the post
        if(props.topic.id !== -1) {
            set_id = props.topic.id;
        }
        window.fetch(
            '/wp-json/wp/v2/posts/' + postid,
            {   
                method: 'POST',
                body: JSON.stringify({'cvd-topics': set_id}),
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': props.nonce
                }
            }) 
        .then((response) => {
            setLoading(false);
            return response.json();
        })
        .then(
            (post) => {
                setToast("Gespeichert");
                fetchPosts();
            },
            (error) => {
                setToast("Konnte nicht speichern.");
                console.log(error);
            }
        );    
    }

    const fetchPosts = useCallback(() => {
        setLoading(true);
        // we need a special handling for topic id = -1 - it represents "all topics without a cvd topic"
        let url = '/wp-json/wp/v2/posts?per_page=' + limit + '&page=' + currentPage + '&status=' + post_status; 
        if( props.topic.id !== -1 ) {
            url = url + '&cvd-topics=' + props.topic.id;
        } else {
            url = url + '&no-cvd-topics=true';
        }
        window.fetch(
            url,
            {
                headers: {
                    'X-WP-Nonce': props.nonce
                }
            }) 
        .then((response) => {
            setLoading(false);
            setTotalPages(parseInt(response.headers.get('X-Wp-Totalpages')));
            return response.json();
        })
        .then(
            (_posts) => {
                setPosts(_posts);          
            },
            (error) => {
                console.log(error);
            }
        );    
    }, [post_status, currentPage, props]);

    function id_attrib(prefix, id) {
        return prefix + id;
    }

    useEffect(() => {
       fetchPosts(); 
    }, [fetchPosts]); 

    useEffect(() => {
        const interval = setInterval(() => {
            fetchPosts();
        }, 60000);
        return () => {
            clearInterval(interval);
        }    
    }, [fetchPosts]);

    return (
        
        <Card ref={drop}>
            <Toast onClose={() => setToast(null)} show={toast} delay={3000} autohide>
            <Toast.Header>
                <strong className="me-auto">Nachricht</strong>
            
            </Toast.Header>
            <Toast.Body>{toast}</Toast.Body>
            </Toast>
            <Card.Header>
                <Navbar>
                    <Container fluid>
                    <Navbar.Brand>{props.topic.name}</Navbar.Brand>
                    <Nav variant="pills" defaultActiveKey={id_attrib('#draft-', props.topic.id)} classname="d-flex">
                        <Nav.Item>
                            <Nav.Link href={id_attrib('#draft-', props.topic.id)} onClick={changePostStatus} size="sm">Entwurf</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href={id_attrib('#published-', props.topic.id)} onClick={changePostStatus} size="sm">Publiziert</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    {loading &&<Spinner animation="border" role="status" size="sm">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>}
                                                      
                    </Container>
                </Navbar>
            </Card.Header>
            <Card.Body>
                <TopicPostsListView posts={posts} topic={props.topic.id} nonce={props.nonce}/> 
                <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={(currentPage === 1)}/>
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={(currentPage === 1)}/>
                    <Pagination.Item>{currentPage} / {totalPages}</Pagination.Item>
                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={(totalPages <= 1 || currentPage === totalPages)}/>
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={(totalPages <= 1 || currentPage === totalPages)}/>
                </Pagination>
            </Card.Body>            
    </Card>
    );
}

export default TopicView;
