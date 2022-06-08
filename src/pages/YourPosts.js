import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EdiText from 'react-editext'


import { API_URL, API_DELETE_MSG, API_UPDATE } from 'utils/utils'
import posts from 'reducer/posts'
import PostMenu from 'components/PostMenu'
import Header from 'components/Header'
import BackButton from 'components/Backbutton'
import { StyledBackButton, PostHeader, ElementWrapper, CardContainer, MessageContainer, BottomCardContainer } from 'components/Styles'
import { Button  } from '@mui/material'


const YourPosts = () => {
    const accessToken = useSelector((store) => store.user.accessToken)
    const currentUser = useSelector((store) => store.user.userId)
    const postItems = useSelector((store) => store.posts.items)
    const [updatedMessage, setUpdatedMessage] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken
            }
        }

        fetch(API_URL("posts"), options)
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                dispatch(posts.actions.setItems(data.response));
                dispatch(posts.actions.setError(null));
                // setUpdatedMessage(updatedMessage)
            } else {
                dispatch(posts.actions.setError(data.response));
                dispatch(posts.actions.setItems([]));
            }
            
        })
    }
    // Deleting a message
    const handleDeleteMsg = (id) => {
        const options = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
    
        fetch(API_DELETE_MSG(id), options)
          .then((res) => res.json())
          .then(() => {
              console.log(id)
            fetchPosts()
          })
    }
    
    // Updating a message
    const handleUpdateMsg = (id) => {
        const options = {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                updatedMessage: updatedMessage,
            })
        }

        fetch(API_UPDATE(id), options)
            .then((res) => res.json())
            .then(() => fetchPosts())
            .finally(() => setUpdatedMessage(updatedMessage))
    }
    

    return (
        <>        
            <PostHeader>
                <p>JS-SUP</p>
                <ElementWrapper>
                    <Header />
                    <PostMenu/>
                </ElementWrapper>   
            </PostHeader>
            <StyledBackButton>
                <BackButton />
            </StyledBackButton>

            {postItems.map((item) => {
                 if (currentUser === item.creator.creatorId) {
                    return (
                        <CardContainer key={item._id}>
                            <MessageContainer>
                                <EdiText 
                                    type="text" value={item.message} 
                                    onSave={updatedMessage => setUpdatedMessage(updatedMessage)}/>
                                {console.log(updatedMessage)}
                            </MessageContainer>
                            <BottomCardContainer>
                                <Button onClick={()=> handleUpdateMsg(item._id)}variant="text"size='large'>SAVE EDIT</Button>
                                                                    
                                <Button onClick={()=> handleDeleteMsg(item._id)}variant="text"size='large'>DELETE</Button>
                            </BottomCardContainer>
                        </CardContainer>  
                 )}
            })}
                    
        </>


    )
}

export default YourPosts
