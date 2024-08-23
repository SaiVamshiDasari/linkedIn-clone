import React, { forwardRef } from 'react';
import { Avatar } from '@mui/material';
import './styles/Post.css';
import InputOptions from './InputOptions';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';

const Post = forwardRef(({ name, description, message, photoUrl, fileUrl, fileType }, ref) => {
  //const [isAlertShown, setIsAlertShown] = useState(false);

  
  return (
    <div ref={ref} className='Post'>
      <div className="Post_header">
        <Avatar src={photoUrl} />
        <div className="Post_info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>
      <div className="Post_body">
        {message && <p>{message}</p>}
        {fileUrl && fileType === 'image' && <img className='postImg' src={fileUrl} alt="Post" />}
        {fileUrl && fileType === 'video' && <video src={fileUrl} controls />}
      </div>
      <div className="Post_buttons">
        <InputOptions Icon={ThumbUpAltIcon} title="Like" color="grey" />
        <InputOptions Icon={CommentIcon} title="Comment" color="grey" />
        <InputOptions Icon={ShareIcon} title="Share" color="grey" />
        <InputOptions Icon={SendIcon} title="Send" color="grey" />
      </div>
    </div>
  );
});

export default Post;
