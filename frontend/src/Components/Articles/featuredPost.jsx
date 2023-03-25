import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';

import "./articles.css"

const FeaturedPost=(props)=>{
    return(
        <section className={`${props.colorScheme}`}>
            <h1>{props.title}</h1>
            {
                props && (
                    <Link to={`/ArticlePage/${props.article.category}/${props.article.slug}`}>
                    <a>
                        <div className='featured-post'>
                        <div className="feature-info">
                            <h3 className='feature-title'>{props.article.title}</h3>
                            <p className="feature-desc">{props.article.description}</p>
                        </div>
                        <LazyLoadImage effect="opacity" className='feature-img' src={props.article.poster.url} alt={props.article.title} ></LazyLoadImage>
                        </div>
                    </a>
                    </Link>
                )
            }
            
        </section>
    )
}

export default FeaturedPost