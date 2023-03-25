import { useState,useEffect } from "react"
import './articles.css'

const CategoryArticles = (props)=>{

    console.log(props.articles)

    function ArticleCard(props){
        let shortTitle=props.title
        if(props.title.length>=75){
            shortTitle = props.title.slice(0,70) + "..."
        }
        return(
            <a href="#">
                <div className="article-card">
                    <img className="article-img" src={props.image}></img>
                    <h5 className="card-title">{shortTitle}</h5>
                    <p className='card-desc'>{props.description}</p>
                    <p className='card-author'>{props.user}</p>
                    <div className='card-category sports'>{props.category}</div>
                </div>
            </a>
        )
    }
    return(
        <section>
            <h1 className="section-title">{props.categoryName}</h1>
                <div className="category-article-bar">
                {
                    props.articles.map((item,index)=>{
                        let shortDescription = item.description.slice(0,100)+' ....';
                    return(
                        <ArticleCard key={index} image={item.poster.url} author={"aizaz"} description={shortDescription} title={item.title} />
                    )})
                }
            </div>
        </section>
    )
}

export default CategoryArticles