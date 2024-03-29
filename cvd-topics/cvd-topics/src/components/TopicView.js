import React, { useState, useEffect, useCallback } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Pagination from 'react-bootstrap/Pagination';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
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
            setCvdTopic(item.id, function() {
                item.callback(item);
            });
        }
    }));

    function setCvdTopic(postid, callback) {
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
                callback();

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

    function onDrag(item) {
        // immediately remove the item from the list
        fetchPosts();
        return;
    }

    function onDragEnd(item) {
        const new_posts = posts.filter((post) => post.id !== item.id);
        setPosts(new_posts);
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
                        {loading &&<Spinner animation="border" role="status" size="sm">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>}
                        <ButtonGroup>
                            <ToggleButton
                                size="sm"   
                                key="draft"
                                id={"status-draft" + props.topic.id}
                                type="radio"
                                value="draft"
                                variant="outline-secondary"
                                name={"post_status" + props.topic.id}
                                checked={post_status === "draft"}
                                onChange={(e) => setPostStatus(e.currentTarget.value)}>
                                Entwurf
                            </ToggleButton>
                            <ToggleButton
                                size="sm"
                                key="publish"
                                id={"status-publish" + props.topic.id}
                                type="radio"
                                value="publish"
                                variant="outline-secondary"
                                name={"post_status" + props.topic.id}
                                checked={post_status === "publish"}
                                onChange={(e) => setPostStatus(e.currentTarget.value)}>
                                Publiziert
                            </ToggleButton>
                        </ButtonGroup>                                                      
                    </Container>
                </Navbar>
            </Card.Header>
            <Card.Body>
                <TopicPostsListView posts={posts} topic={props.topic.id} nonce={props.nonce} onDrag={onDrag} onDragEnd={onDragEnd}/> 
                {(totalPages>0) && <Pagination>
                    <Pagination.First onClick={() => setCurrentPage(1)} disabled={(currentPage === 1)}/>
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={(currentPage === 1)}/>
                    <Pagination.Item>{currentPage} / {totalPages}</Pagination.Item>
                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={(totalPages <= 1 || currentPage === totalPages)}/>
                    <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={(totalPages <= 1 || currentPage === totalPages)}/>
                </Pagination>}
            </Card.Body>            
    </Card>
    );
}

export default TopicView;
