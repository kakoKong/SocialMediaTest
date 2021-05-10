import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function Postcard({ post : {body, createdAt, id, username, likeCount, commentCount, likes, comments}}){
    function likePost(){
        console.log('Liked');
    }
    function commentOnPost(){
        console.log('Comment!');
    }

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
                <Button as='div' labelPosition='right'>
                    <Button color='purple' basic onClick={likePost}>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label basic color='purple' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic onClick={commentOnPost}>
                        <Icon name='comments' />
                        Comment
                    </Button>
                    <Label basic color='blue' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default Postcard;