import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';

function Postcard({ post : {body, createdAt, id, username, likeCount, commentCount, likes, comments}}){

    const { user } =useContext(AuthContext);

    return(
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`./posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra size="small">
                <LikeButton user={user} post={{ id, likes, likeCount}}/>
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic as={Link} to={`/posts/${id}`}>
                        <Icon name='comments' />
                        Comment
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {user && user.username === username && (
                    <Button color="red" floated='right' onClick={() => console.log('Delete Post')}>
                        <Icon name="trash" style={{margin: 0}}/>
                    </Button>
                )}
            </Card.Content>
        </Card>
    )
}

export default Postcard;