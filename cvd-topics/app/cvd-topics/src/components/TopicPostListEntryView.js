import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import { useDrag } from "react-dnd";
import {DateTime} from 'luxon';

function TopicPostListEntryView(props) {
    const post = props.post;
    const edit = '/wp-admin/post.php?post=' + props.post.id + '&action=edit';
    
    const [, drag] = useDrag(() => ({
        type: "cvd-topics-listitem",
        item : {id: props.post.id, callback: props.onDrag},        
        end : (item, monitor) => {
            if(props.onDragEnd) {
                props.onDragEnd(item, monitor);
            }
        }
    }));

    const dt = DateTime.fromISO(post.date_gmt);
    let format = "dd.MM.yyyy, HH:mm";
    let prefix = "geänd.:";
    if(dt.hasSame(new Date(), 'day')) {
        format = "HH:mm";
        prefix = prefix + "heute, ";
    }
    const modified = prefix + " " + dt.toFormat(format) + " Uhr";

    return (
        <ListGroup.Item ref={drag}>
            <div className="cvd-topics-listitem-title" dangerouslySetInnerHTML={{__html: post.title.rendered}} />
            <div className="cvd-topics-listitem-modified">({modified})</div>
            <div className="cvd-topics-listitem-menu"><a href={post.link} target="_blank" rel="noreferrer">Ansicht</a>|<a href={edit} target="_blank" rel="noreferrer">Bearbeiten</a></div>
        </ListGroup.Item>
        );
}

export default TopicPostListEntryView;
