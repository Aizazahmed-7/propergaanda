import { useEffect, useState } from "react"
import HeadLinesCarousel from "../HeadLinesCarousel/HeadLinesCarousel"
import TrendingArticles from "../Articles/trendingArticles"
import LatestPosts from "../Articles/latestPosts"
import FeaturedPost from "../Articles/featuredPost"
import CategoryArticles from "../Articles/categoryArticles"
import {Link} from "react-router-dom"
import axios from 'axios'
import Loading from "../Loading/Loading"
import api_link from "../../api_link"



const MainPosts = ()=>{

    const [carousel,setCarousel]=useState(null)
    const [featured,setFeatured]=useState(null)
    const [latest,setLatest]=useState(null)
    const [trending,setTrending]=useState(null)
    const [flag,setFlag]=useState(false)

    useEffect(()=>{
        async function getPosts(){
            const {data} = await axios.get(api_link+'/api/posts/getHomePagePosts');
            console.log(data)
            setLatest(data.Latestposts)
            setFeatured(data.featuredPosts)
            setCarousel(data.pinnedPosts)
            setTrending(data.MostViewedPosts)
            setFlag(true)
        }
        getPosts()
    },[])
    
    
    
    
    return(
        <div>
            {!flag && (<Loading/>) }
            {carousel && trending && latest && featured && (
                <div>
                    <HeadLinesCarousel posts={carousel}/>
                    <hr/>
                    <FeaturedPost colorScheme="dark" title="FEATURED" article={featured[1]}/>
                    <hr/>
                    <LatestPosts posts={latest}/>
                    <hr/>
                    <TrendingArticles posts={latest}/>
                    
                   
                    <hr/>
                    <CategoryArticles categoryName="SPORTS" articles={trending}></CategoryArticles>
                    <hr/>
                    <CategoryArticles categoryName="TECHNOLOGY" articles={latest}></CategoryArticles>
                    <hr/>
                    
                    <FeaturedPost colorScheme="light" title="FEATURED" article={featured[0]}/>
                    
                    <hr/>
                    {/* <CategoryArticles categoryName="HEALTH" articles={category3Articles}></CategoryArticles>
                    <hr/> */}
                </div>
            )}       

        </div>
    )


}

export default MainPosts