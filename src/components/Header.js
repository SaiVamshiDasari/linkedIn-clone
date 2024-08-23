import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import "./styles/Header.css";
import Headeroptions from './Headeroptions';
import { Home, SupervisorAccount, BusinessCenter, Chat, Notifications } from '@mui/icons-material';
import { Menu, MenuItem, Avatar, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/userSlice';
import { auth } from './firebase/firebase';
import { selectUser } from '../features/userSlice';

function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNewPhotoUrl('');
  };

  const logoutfromApp = () => {
    dispatch(logout());
    auth.signOut();
    handleClose();
  };

  const handleProfilePictureClick = () => {
    setNewPhotoUrl(user?.photoUrl || ''); // Set current photo URL as default
    setOpenDialog(true);
    handleClose();
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handlePhotoUrlChange = (e) => {
    setNewPhotoUrl(e.target.value);
  };

  const handleUpdatePhotoUrl = async () => {
    if (newPhotoUrl) {
      try {
        await auth.currentUser.updateProfile({
          photoURL: newPhotoUrl
        });
        // Optionally, update your user state in Redux
        // dispatch(updateUser({ photoUrl: newPhotoUrl }));
        setOpenDialog(false);
        setNewPhotoUrl('');
      } catch (error) {
        console.error("Error updating profile photo URL: ", error);
      }
     
    }
  };

  const displayNameInitial = user?.displayName ? user.displayName[0] : '';

  return (
    <div className='header'>
      <div className='header_left'>
        <LinkedInIcon color="primary" className='linkedin-icon'/>
        <div className='search-con'>
          <SearchIcon />
          <input placeholder="search" type='text' />
        </div>
      </div>
      <div className='header_right'>
        <Headeroptions Icon={Home} title="Home" />
        <Headeroptions Icon={SupervisorAccount} title="My Network" />
        <Headeroptions Icon={BusinessCenter} title="Jobs" />
        <Headeroptions Icon={Chat} title="Messaging" />
        <Headeroptions Icon={Notifications} title="Notifications" />
        
        <IconButton  className='profilepic' onClick={handleClick}>
          <Avatar src={user?.photoUrl}>{displayNameInitial}</Avatar>
          <p>{user?.displayName}</p>
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleProfilePictureClick}>Update Profile Picture</MenuItem>
          <MenuItem onClick={logoutfromApp}>Logout</MenuItem>
        </Menu>

        {/* Dialog for updating profile picture */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogContent>
            <input 
              type='text' 
              placeholder='Photo URL (optional)' 
              value={newPhotoUrl}
              onChange={handlePhotoUrlChange}
              className='updateprofile'
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">Cancel</Button>
            <Button onClick={handleUpdatePhotoUrl} color="primary">Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Header;
