import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import axios from "axios";
import { Alert, Col, Container, Row, Stack } from "react-bootstrap";
import "./SearchPage.css"

const SearchPage = () => {


    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const keyowrd = query.get("keyword");
    const category = query.get("category");

    const [posts,setPosts]=useState(null)
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState(null)


    useEffect(()=>{
        async function getPosts(){
            
            try {
                const {data} = await axios.get(`https://propergaanda.vercel.app/api/posts/getSearchPost?keyword=${keyowrd}&category=${category}`);
                console.log(data)
                setPosts(data);
                setLoading(false)
            } catch (error) {
                console.log(error.response.data.message)
                setError(error.response.data.message)
                setLoading(false)

            }
        }
        getPosts()


        },[])

  return (<>

    {loading && <Loading/>}
    {error && <Alert variant="danger" >{error}</Alert>}

       <div style={{width:"100%",padding:"10px" ,backgroundColor:"#f9f9f9" ,height:"10rem" , display:"flex" , alignItems:"center" }} > <h2 style={{marginLeft:"2rem" , color:"black" }} >search results for : {category}</h2></div> 

        <Container style={{ marginRight:"2rem",marginLeft:"2rem", borderRadius:"1%" }} >
            <Row style={{marginTop:"2rem"}} >
                <Col sm={12} md={10} className="text-center" >  
                        
                {posts && posts.map((post)=>{
                     return(
                            <>
                            <Row key={post._id} style={{padding:"1rem"}} >
                                <Col sm={12} md={4} className="d-flex align-items-center"> 
                                <div className="image-container" >
                                    <img src={post.poster.url} />
                                </div>
                                </Col>
                                <Col sm={12} md={8} className="text-start" >
                                   <a href={`/ArticlePage/${post.category}/${post.slug}`} > <h5 style={{fontWeight:"bold"}} >{post.title}</h5>  </a> 
                                    <p style={{color:"#696969"}} >{new Date(post.createdAt).toLocaleDateString(undefined,{year:"numeric",day:"numeric",month:"long"})} </p>
                                    <p>{post.description}</p>
                                    
                                </Col>
                            </Row>
                            <hr/>
                            </>
                            )
                            })}
                            
                       
                </Col>

                <Col sm={12} md={2} className="text-center"  >
                    <h1>Posts</h1>
                </Col>

                
                
            </Row>
        </Container>
    
  </>

  )
}

export default SearchPage