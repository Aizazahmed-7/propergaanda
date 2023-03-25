import React, { useRef, useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import './HeadLinesCarousel.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const cloudName = 'delpjlxfu';
const url = `https://res.cloudinary.com/${cloudName}/image/upload/`;

const HeadLinesCarousel = ({ posts }) => {
  const carouselRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(null);
  const [containerHeight, setContainerHeight] = useState(null);

  useEffect(() => {
    if (carouselRef.current) {
        const carouselElement = carouselRef.current;
        setContainerWidth(carouselElement.clientWidth);
        setContainerHeight(carouselElement.clientHeight);
    }
  }, []);

  function HeadLines() {
    return (
        <div ref={carouselRef} >
      <Carousel >
        {posts.map((article, index) => (
          <Carousel.Item key={index}>
            <Link to={`/ArticlePage/${article.category}/${article.slug}`} className="headline-link">
              {/* <LazyLoadImage
                style={{ width: containerWidth, height: containerHeight, objectFit: 'cover' }}
                className="d-block w-100 headline-img"
                src={`${url}w_${containerWidth},h_${containerHeight},q_auto,f_auto/${article.poster.public_id}`}
                alt={article.title}
                effect="opacity"
              /> */}
              <img
                style={{borderRadius:"0%"}}
                className="d-block w-100 headline-img"
                src={`${url}w_${containerWidth},h_${containerHeight},q_auto,f_auto/${article.poster.public_id}`}
                alt={article.title}
                effect="opacity"
              /> 
              <Carousel.Caption>
                <h3 className="headline-title">{article.title}</h3>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
      </div>
    );
  }

  return (
    <section className="head-lines">
      <HeadLines />
    </section>
  );
};

export default HeadLinesCarousel;
