import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';

import Postcard from '../components/Postcard';

function Home() {
    const { 
        loading,
        data: { getPosts: posts },
    } = useQuery(FETCH_POSTS_QUERY);
    
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <Grid.Column>
                    <h1>Recent Post</h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
             {loading ? (
                 <h1>Loading Posts..</h1>
             ) : (
                 posts && posts.map(post => (
                    <Grid.Column key={post.id}>
                        <Postcard post={post} />
                    </Grid.Column>
                 ))
             )}
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes{
                username
            }
            commentCount
            comments{
                id
                username
                createdAt
                body
            }
        }
    }
`
export default Home;