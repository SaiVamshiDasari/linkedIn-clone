import React, { useEffect, useState } from 'react';
import { Edit } from '@mui/icons-material';
import './styles/Feed.css';
import InputOptions from './InputOptions';
import PhotoIcon from '@mui/icons-material/Photo';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import Post from './Newpost';
import { db, storage } from './firebase/firebase';
import firebase from 'firebase/compat/app';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import FlipMove from 'react-flip-move';
import CloseIcon from '@mui/icons-material/Close';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import SendIcon from '@mui/icons-material/Send';
function Feed() {
  const user = useSelector(selectUser);
  const [input, setInput] = useState('');
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState(null);
  const [isPopUp,setIsPopUp] = useState(false);
  const [fileType,setFileType] = useState('');
  const [fileName, setFileName] = useState('');
   
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
    }
  };

  const openPopUp = (type) => {
    setFileType(type);
    setIsPopUp(true);
    console.log(fileType)
  };

  const handleImageUpload = () => openPopUp('image/*');
  const handleVideoUpload = () => openPopUp('video/*');

 

  useEffect(() => {
    db.collection("posts")
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setPosts(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })));
      });
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();
    if (!input && !file) {
      alert('Please enter a caption or choose a file before posting.');
      return; // Prevent the post from being submitted
    }

    let fileUrl = '';
    let fileType = '';

    if (file) {
      // Determine if the file is an image or a video
      fileType = file.type.split('/')[0]; // 'image' or 'video'
      
      // Upload file to Firebase Storage
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`posts/${file.name}`);
      await fileRef.put(file);
      fileUrl = await fileRef.getDownloadURL();
    }

    db.collection('posts').add({
      name: user?.displayName,
      description: 'This is a test',
      message: input,
      photoUrl: user?.photoUrl || "",
      fileUrl: fileUrl,
      fileType: fileType, // Save the file type to Firestore
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput(''); // Clear input field
    setFile(null); // Clear file input
    setFileType('');
    setFileName('');
  };

  return (
    <div className='post'>
      <div className="post_inputContainer">
        {isPopUp===false?(
            <div className="original">
                <div className="post_input">
          <Edit />
          <form>
            <input value={input} onChange={e => setInput(e.target.value)} type="text" />
            <button onClick={sendPost} className='sendpost' type='submit'>Post</button>
          </form>
        </div>
        <div className="post_inputOptions">
          <InputOptions onClick={handleImageUpload} Icon={PhotoIcon} title="Photo" color="#70B5F9" />
          <InputOptions onClick={handleVideoUpload} Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOptions Icon={EventIcon} title="Events" color="#C0CBCD" />
          <InputOptions Icon={ArticleIcon} title="Write Article" color="#7FC15E" />
        </div>
            </div>
        ):(
            <div className="popup">
              <div className="uploadtitle-btn">
                <h3>Upload your {fileType.slice(0,-2)}</h3>
                <button className="closebtn" onClick={()=>{
                    setIsPopUp(false);
                    setFileType('');
                    
                    }}><CloseIcon />  </button>
              </div>
                
                <div className="post_input">
                
                <form>
                  <SubtitlesIcon />
                  <input value={input}  onChange={e => setInput(e.target.value)} placeholder='Caption!!!' type="text" />
                
                
                </form>
                </div>
                <div className="choosefile">
                <input
                  type="file"
                  id="file-input"
                  className="file-input"
                  accept={fileType}
                  onChange={handleFileChange}
                />
                <div className="chooseFile">
                <button
                  className="file-input-trigger"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  Choose {fileType.slice(0,-2)}
                </button>
                <p>{fileName}</p>
                </div>
               
                <div className="uploadpost" onClick={()=>{
                  document.getElementById('upload').click()
                }}>
                <p>Upload</p>
                <button onClick={sendPost} id='upload' className='upload' type='submit'><SendIcon /> </button>
                
                </div>
                
                </div>
                
            </div>
        )}
        
      </div>
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl, fileUrl, fileType } }) => (
          <Post 
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
            fileUrl={fileUrl}
            fileType={fileType} // Pass file type to Post component
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
