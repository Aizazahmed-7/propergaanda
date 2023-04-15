import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';

import "./articles.css"


const LatestPosts=({posts})=>{

    const cloudName = 'delpjlxfu';
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/`;

    function ArticleCard(props){
        let shortTitle=props.title
        if(props.title.length>60){
            shortTitle= props.title.slice(0,55) + "..."
        }
        return(
                <div className="article-card">
                    <img effect="opacity" className="article-img" src={props.image} alt={props.title} ></img>
                    {/* <LazyLoadImage effect="opacity" className="article-img" src={props.image} alt={props.title} ></LazyLoadImage> */}
                    <h5 className="card-title">{shortTitle}</h5>
                    <p className='card-desc'>{props.description}</p>
                    <p className='card-author'>{props.author}</p>
                    <div className='card-category'>{props.category[0]}</div>
                </div>
        )
    }


    let width = window.innerWidth;
    if (width >= 1200) {
      width = 500;
    } else if (width >= 992) {
      width = 400;
    } else if (width >= 768) {
      width = 300;
    } else {
      width = 200;
    }
    

    return(
        <section className="latest-section">
            <h1 className="section-title">Latest Posts</h1>
            { posts && (
                <div className="latest">
                    <div className="article-bar">
                        {
                            posts.map((item,index)=>{
                                let shortDescription = item.description.slice(0,100)+' ....';
                            return(
                                <Link to={`/ArticlePage/${item.category}/${item.slug}`}> 
                                <ArticleCard key={index} image={`${url}w_${width},q_auto,f_auto/${item.poster.public_id}`} author={item.user.name} description={shortDescription} title={item.title} category={item.category} />
                                </Link>
                            )})
                        }
                    </div>
                    <div className="side-bar">
                        {
                            <div>
                                <h5>Check out the latest from PGBazaar</h5>
                                {posts.map((item,index)=>{
                                    let imgsrc=`${url}w_${200},q_auto,f_auto/${item.poster.public_id}`
                                    return(
                                        <a>
                                            <div className="side-bar-article">
                                                <h4 className="side-bar-title">{item.title}</h4>
                                                <img src={imgsrc} className="side-bar-img"></img>
                                            </div>
                                            <hr/>
                                        </a> 
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
            )}
        </section>
    )
}


export default LatestPosts