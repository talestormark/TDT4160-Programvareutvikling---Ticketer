import React, { useEffect, useState } from 'react';
import Menylinje from '../Menylinje';
import '../../stylesheets/Posts.css';
import '../../stylesheets/ProfilePage.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import Profileinfo from '../ProfilPage/Profileinfo';
import Rating from '../ProfilPage/Rating';
import UserPosts from '../ProfilPage/UserPosts';
import '../../stylesheets/ProfileInfo.css';
import Footer from '../homepage/Footer';
import Header from '../homepage/Header';
import { Button, CardGroup, Container, Form } from 'react-bootstrap';
import { store } from '../../redux/store';
import { getUserById } from '../../client/userHandler';
import { getPostsByAuthorId } from '../../client/postHandler';
import { Post } from '../../types';
import PostInfo from '../createpostpage/PostInfo';
import { UserInfo } from '../../types';
import { useHistory } from 'react-router-dom';
import { userInfo } from 'os';



function UserPage(props: UserInfo) {
  const userId = props.userId;
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const history = useHistory();
  
  async function getUserData(){
    try {
      console.log(userId);
      if (userId !== null) {
        const user = await getUserById(userId);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);

      }
    } catch (error: any) {
      console.error(error);
    }
  }
  const [posts, setPosts] = useState<Post[]>([]);

  let rendered = false;

  async function getUsersPosts() {
    if (userId) {
      try {
        setPosts(await getPostsByAuthorId(userId));
        history.push('/user/');
      } catch (error: any) {
        console.error(error);
      }
    }
  }
  

  useEffect(() => {
    if (!rendered) {
      getUsersPosts();
      getUserData();
      rendered = true;
    }
  }, []);
  
    return(
      <div>
        <Menylinje/>          
        <div style = {{marginLeft: "133px"}}>
          <Header/>
          <div className='row ms-5'>
            <div className='col-3 ms-5'>
              <span className='button__icon-10'><FontAwesomeIcon icon={faCircle}></FontAwesomeIcon></span>
            </div>
            <div className='col-4 mt-5'>
              <div className="p-3 rounded" style={{ backgroundColor: "rgb(100, 176, 145)" }}>
                <h5 className="text-white">{firstName} {lastName}</h5>
                <h5 className="text-white">{email}</h5>
              </div>
            </div>
          </div>

          <div className="mt-0 ml-5 mr-5 p-0">
          <Container>
            <h2 className="text-center">{firstName} sine Ticketer</h2>
            <CardGroup>
              {posts.map((post, idx) => (
                <PostInfo
                  key={idx}
                  createdAt={post.createdAt}
                  timeOfEvent={post.timeOfEvent}
                  city={post.city}
                  venue={post.venue}
                  forSale={post.forSale}
                  title={post.title}
                  description={post.description}
                  category={post.category}
                  price={post.price}
                  authorId={post.authorId} 
                  id={post.id}            />
              ))}
            </CardGroup>
          </Container>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
  
  export default UserPage;