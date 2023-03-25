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
        const {data}= await axios.get(`https://propergaanda.vercel.app/api/posts/getPostBySlugforadmin/${slug}`)
        setApprove(data.approved);
        setPin(data.pinned);
        console.log(data.approved)
        setPost(data)
        setFlag(true)

        }
        getPost()
        dispatch(LoadAdmin())

    },[dispatch])

    // if(post){
    //     console.log(post.content)
    // }

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
        console.log("Approve");
        const res = await axios.post(`/api/posts/approvePost/${post._id}`);
        setApprove(res.data.approved);

    }

    const deletePost = async()=>{
        console.log("Reject")
        const res = await axios.delete(`/api/posts/rejectPost/${post._id}`);
        setPost(null);
    }
    const handleReject = async()=>{
        setPopup(true);
    }
    const handlePin = async()=>{
        const res = await axios.post(`/api/posts/togglePin/${post._id}`);
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