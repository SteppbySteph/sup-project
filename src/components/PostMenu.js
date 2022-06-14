import React, { useState } from 'react'
import { Button, Menu, MenuItem, Alert } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

import user from 'reducer/user'
import { API_DELETE } from 'utils/utils'

const PostMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openNav = Boolean(anchorEl);
    const currentUser = useSelector((store) => store.user.username);
    const accessToken = useSelector((store) => store.user.accessToken)
    const userId = useSelector((store) => store.user.userId)
    const [statusMessage, setStatusMessage] = useState(null)
    const dispatch = useDispatch();
  
    const openNavigation = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
 
    const logout = () => {
      dispatch(user.actions.setAccessToken(null))
    };
    
    const onDelete = () => {
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json',
        },
      }
      
      fetch(API_DELETE(userId), options)
      .then(res => res.json())
      .then(data => {
        setStatusMessage(data.response)
        console.log(setStatusMessage(data.response))
        dispatch(user.actions.setAccessToken(null))
      })
      
  }   
    
    return (
      <>
        {/* <LogoImage src={Logo} alt="logo navigation." /> */}
        <Button
          id="nav-button"
          size='large'
          aria-controls={openNav ? "nav-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openNav ? "true" : undefined}
          onClick={openNavigation}
          sx={{color:'#fff'}}
        >
          {currentUser} &#8964; 
        </Button>
        	
        {/* <HeaderContainer> */}
        <Menu
          id="nav-menu"
          anchorEl={anchorEl}
          open={openNav}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "nav-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={logout}>Logout</MenuItem>
          <MenuItem onClick={onDelete}>Delete</MenuItem>
        </Menu>
        {statusMessage !== null && (
          <Alert severity="info">{statusMessage}</Alert>
      )} 
      {/* </HeaderContainer> */}
     
      </>
    );
  };
  
  export default PostMenu;