import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function DeleteButton({postId, callback}) {
    //TODO update cache
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        update(proxy){
            setConfirmOpen(false);
            // TODO remove post form cache
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            console.log(data);
            data.getPosts = data.getPosts.filter(p => p.id !== postId);
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data
                })
            if(callback) callback();
        },
        variables: {
            postId
        }
    })

    return (
    <>
    <Button color="red" floated='right' onClick={() => setConfirmOpen(true)}>
        <Icon name="trash" style={{margin: 0}}/>
    </Button>
    <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
    />
    </>
    )
}

const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }

`

export default DeleteButton;