import { Link } from "react-router-dom";
import "./articles.css"
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";





const TrendingArticles = ({posts}) => {
    const cloudName = 'delpjlxfu';
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/`;
  const settings = {
    className: "center",
    // centerMode: true,
    infinite: true,
    slidesToShow: 3,
    speed: 500,
    dots:true,
    centerPadding: "20%",
    prevArrow: <button type="button" className="slick-prev">Previous</button>,
    nextArrow: <button type="button" className="slick-next">Next</button>,
    responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            centerPadding: "10%"
          }
        }
    ]
  };

  return (
    <section className="trending-section" style={{backgroundColor:"black",color:"white"}}>
      <h2>Top Trending</h2>
      {
        posts && (
            <Slider {...settings}>
                {
                    posts.map((item,index)=>{
                        let imgsrc=`${url}w_${200},q_auto,f_auto/${item.poster.public_id}`
                        return(
                            <div className="trending-article">
                                <img src={imgsrc} style={{height:"70%"}} className="trending-img"></img>
                                <p>{item.title}</p>
                            </div>
                        )
                    })
                }
            </Slider>
        )
      }
      
    </section>
  );
};

export default TrendingArticles;

