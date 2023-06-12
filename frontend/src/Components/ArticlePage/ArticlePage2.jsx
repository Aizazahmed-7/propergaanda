import { useEffect,useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import './ArticlePage.css'
import axios from "axios"
import Loading from "../Loading/Loading"
import { useSelector,useDispatch } from 'react-redux';
import { LoadAdmin } from '../../actions/userActions';
import { useNavigate } from "react-router-dom"
import { clearError } from '../../reducers/userReducer';
import { Button } from "react-bootstrap"
import PopupWithButtons from "./PopupWithButtons"
import  api_link from '../../api_link'


const ArticlePage2 = ()=>{
    const [approve,setApprove] = useState(null);
    const [pin,setPin] = useState(null);
    const [popup,setPopup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userLogin = useSelector(state=>(state.userLogin))
    const {loading,error,user,message} =userLogin

    const [post,setPost]=useState(null);

    const [flag,setFlag]=useState(false);

    const {category,slug} = useParams();

    useEffect(()=>{

        const getPost = async()=>{
            const config ={
                headers:{
                   'Content-Type':'application/json'
                },
                withCredentials:true
           }
        const {data}= await axios.get(`${api_link}/api/posts/getPostBySlugforadmin/${slug}`,config)
        setApprove(data.approved);
        setPin(data.pinned);
        setPost(data)
        setFlag(true)

        }
        dispatch(LoadAdmin())
        getPost()

    },[dispatch])


    if(error){
            
        alert(error)
        dispatch(clearError())
    }

    if(loading){
        return <h1>Loading...</h1>
    }


    if(!user){    
        navigate('/login')
        return null
    }
    const handleApprove = async()=>{
        const config ={
            headers:{
               'Content-Type':'application/json'
            },
            withCredentials:true
       }
        const res = await axios.post(`${api_link}/api/posts/approvePost/${post._id}`,config);
        setApprove(res.data.approved);

    }

    const deletePost = async()=>{
        console.log("Reject")
        const config ={
            headers:{
               'Content-Type':'application/json'
            },
            withCredentials:true
       }
        const res = await axios.delete(`${api_link}/api/posts/rejectPost/${post._id}`,config);
        setPost(null);
    }
    const handleReject = async()=>{
        setPopup(true);
    }
    const handlePin = async()=>{
        const config ={
            headers:{
               'Content-Type':'application/json'
            },
            withCredentials:true
       }
        const res = await axios.post(`${api_link}/api/posts/togglePin/${post._id}`,config);
        console.log(res.data.pinned);
        setPin(()=>!pin)
    }

    const handleConfirm = async()=> {
        console.log('Confirmed');
        await deletePost();
        setPopup(false);
        navigate('/Admin');
    }
    
    function handleCancel() {
        console.log('Cancelled');
        setPopup(false);
    }
    const handleDelete = async()=>{
        setPopup(true);
        console.log("Delete");
    }

    return(
        <div>
            {!flag && (<Loading/>) }
            {!post && <Button onClick={()=>(navigate('/Admin'))}>Go back</Button>}
            { post && (
                <>
                {!approve && 
                (<> <Button onClick={handleApprove}>Approve</Button> 
                <Button onClick= {handleReject}>Reject</Button></>) 
                }

                {approve && (<>
                <Button onClick={handlePin}>{pin? (<>unpin</>): <>pin</> }</Button>
                <Button onClick={handleDelete }>delete</Button></>)
                }
                {popup && (<PopupWithButtons isOpen={popup} onConfirm={handleConfirm} onCancel={handleCancel} />)}

                <Button onClick={()=>(navigate('/Admin'))}>Go back</Button>
                <div className="post-page">
                    <div className='post'>
                        <section>
                            <h1>{post.title}</h1>
                            <p>{post.createdAt}</p>
                            <img className="post-img" src={post.poster.url}></img>
                        </section>
                        <section className='post-info'>
                            <h3><b>{post.description}</b></h3>
                            <hr></hr>
                            <h5><b>Written By {post.user.name}</b></h5>
                            <p style={{color:'#696969'}} >ProperGaanda</p>
                        </section>
                        <section className="post-content">
                            <div dangerouslySetInnerHTML={{__html:post.content}} ></div>
                        </section>
                    </div>
                   
                </div>    
                </>
            )}
            
        </div>
    )

}

export default ArticlePage2