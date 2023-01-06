import React, {useEffect, useState} from 'react';
import CardGroup from 'react-bootstrap/CardGroup';
import Spinner from 'react-bootstrap/Spinner';
import TopicView from './TopicView';

function TopicsGridView(props) {
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        window.fetch('/wp-json/wp/v2/cvd-topics',
            {
                headers: {
                    'X-WP-Nonce': props.nonce
                }
            })
            .then((response) => {
                setLoading(false);
                return response.json();
            })
            .then(
                (_topics) => {
                    let topics = [{ // pseudo topic = all without a cvd topic
                        id: -1,
                        name: "Alle",
                    }];
                    topics = topics.concat(_topics);
                    setTopics(topics);
                },
                (error) => {
                    console.log(error);
                }
            );
    }, [props.nonce]);

    const childs = topics.map((topic) => <TopicView topic={topic} key={topic.id} nonce={props.nonce}/>);
    return (
        <div>
            {loading && <Spinner animation="border" role="status" />}
            <CardGroup>
                {childs}
            </CardGroup>
        </div>
    );  
}

export default TopicsGridView;
