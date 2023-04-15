import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import './ArticlePage.css'
import axios from "axios"
import Loading from "../Loading/Loading"
import NavigationBar from "../NavBar/NavBar"
import { Col, Container, Row } from "react-bootstrap"
import api_link from "../../api_link"

const ArticlePage = ()=>{
    const [post,setPost]=useState(null)
    const [relatedPosts,setRelatedPosts]=useState(null)
    const [topStories,setTopStories]=useState(null)
    const [flag,setFlag]=useState(false)

    const {category,slug} = useParams()

    useEffect(()=>{

        const getPost = async()=>{
        const {data}= await axios.get(api_link + `/api/posts/getPostBySlug/${slug}`)
        console.log(data)
        setPost(data.post)
        setTopStories(data.relatedPosts)
        setFlag(true)

        }
        getPost()

    },[])


    function TopStories(props){
        return(
            <a href="#">
                <div className="top-story">
                    <img src={props.img} className='top-story-img'></img>
                    <h6 style={{marginTop:"1rem"}} >{props.title}</h6>
                </div>
            </a>
        )
    }




    function ArticleCard(props){
        if(props.title.length>105){
            props.title = props.title.slice(0,100) + "..."
        }
        return(
            <a href="#">
                <div class="related-article-card">
                    <img className="related-article-img" src={props.image}></img>
                    <h5 className="related-card-title">{props.title}</h5>
                    <p className='related-card-author'>{props.author}</p>
                    <div className='related-card-category'>Category</div>
                </div>
            </a>
        )
    }

    return(
        <div>
            {!flag && (<Loading/>) }
            { post && (
                <div className="post-page">
                    <div className='post'>
                        <section className="post-headline">
                            <h2>{post.title}</h2>
                            <p>{new Date(post.createdAt).toLocaleDateString(undefined,{year:"numeric",day:"numeric",month:"long"})}</p>
                            <img className="post-img" src={post.poster.url}></img>
                        </section>
                        <section className='post-info'>
                            <h6><b>{post.description}</b></h6>
                            <hr></hr>
                            <h5><b>Written By {post.user.name}</b></h5>
                            <p style={{color:'#696969'}} >ProperGaanda</p>
                        </section>
                        <section className="post-content">
                            <div dangerouslySetInnerHTML={{__html:post.content}} ></div>
                        </section>
                    </div>
                        <Container >
                    <div className='top-stories'>
                        <h3>Top Stories</h3>

                        {
                            topStories.map((item,index)=>{
                                return(
                                    <TopStories img={item.poster.url} title={item.title}/>
                                    
                                )
                            })
                        }
                    </div>
                        </Container>
                </div>    
            )}
            {/* {
                post && (
                    <div className='related-posts'>
                        <h3>Related Posts</h3>
                        {
                            relatedPosts.map((item,index)=>{
                                let shortDescription = item.description.slice(0,100)+' ....';
                            return(
                                <ArticleCard key={index} image={item.urlToImage} author={item.author} description={shortDescription} title={item.title} />
                            )})
                        }
                </div>
                )
            }         */}
        </div>
    )

}

export default ArticlePage