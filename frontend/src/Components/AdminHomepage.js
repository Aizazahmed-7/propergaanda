import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoadAdmin } from '../actions/userActions';
import toast,{Toaster } from 'react-hot-toast';
import { clearError } from '../reducers/userReducer';
import {Container,Table} from 'react-bootstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';


const AdminHomepage = () => {

    const [UnApprovedPosts, setUnApproved] = useState(null);
    const [ApprovedPosts, setApproved] = useState(null);
    const [pinnedPosts,setPinned] = useState(null);
    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,user,message} =userLogin

      
  const navigate = useNavigate();
  const dispatch = useDispatch();

    useEffect(() => {
        const fun = async()=>{
            const res =  await axios.get('https://propergaanda.vercel.app/api/posts/UnApprovedPosts');
            console.log(res.data);
            setUnApproved(res.data);
            const res2 = await axios.get('https://propergaanda.vercel.app/api/posts/getAllApprovedPosts');
            console.log(res2.data);
            setApproved(res2.data);
            const res3 = await axios.get('https://propergaanda.vercel.app/api/posts/getPinnedPosts');
            console.log(res3.data);
            setPinned(res3.data);
        } 
        fun();
        dispatch(LoadAdmin())

    }, [dispatch])

    
        if(error){
            
            alert(error)
            dispatch(clearError())
        }
    
    if(loading){
        return <h1>Loading...</h1>
    }

    
    if(!user){    
        navigate('/Editor')
        return null
    }
    
  return (<>

 
    <Container>
    <h1>Waiting to be approved</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Post Name</th>
            <th>Created by</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {UnApprovedPosts &&(
            UnApprovedPosts.map((post,index)=>{
                return(
                    
                    <tr>
                    <td>{index+1}</td>
                     <Link to={`/ArticlePage2/${post.category}/${post.slug}`}>
                    <td>{post.title}</td>
                     </Link> 
                    <td>{post.user.name}</td>
                    <td>{post.createdAt}</td>
                    </tr>
                )
                }
                )
          )
          }
        </tbody>
      </Table>

      <h1>Pinned Posts</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Post Name</th>
            <th>Created by</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
            {pinnedPosts &&(
            pinnedPosts.map((post,index)=>{
                return(
                    
                    <tr>
                    <td>{index+1}</td>
                     <Link to={`/ArticlePage2/${post.category}/${post.slug}`}>
                    <td>{post.title}</td>
                     </Link> 
                    <td>{post.user.name}</td>
                    <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                    </tr>
                )
                }
                )
            )
            }
        </tbody>
      </Table>
      
     

          <h1>Existing Posts</h1>
      <Table striped bordered hover>
      <thead>
          <tr>
            <th>#</th>
            <th>Post Name</th>
            <th>Created by</th>
            <th>Date Created</th>
          </tr>
        </thead>


        <tbody>
            {ApprovedPosts &&(
            ApprovedPosts.map((post,index)=>{
                return(
                    
                    <tr>
                    <td>{index+1}</td>
                     <Link to={`/ArticlePage2/${post.category}/${post.slug}`}>
                    <td>{post.title}</td>
                     </Link> 
                    <td>{post.user.name}</td>
                    <td>{post.createdAt}</td>
                    </tr>
                )
                }
                )
            )
            }
        </tbody>
      </Table>
    </Container>


    </>)
}

export default AdminHomepage