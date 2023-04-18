import React from 'react'
import Blog from '../Blog'
import './HomePage.css'
import LogoBar from '../LogoBar/LogoBar'
import AdBar from '../AdBar/AdBar'
import NavigationBar from '../NavBar/NavBar'
import MainPosts from '../MainPosts/MainPosts'
import ArticlePage from '../ArticlePage/ArticlePage'
import Footer from '../Footer/Footer'
import AdsComponent from '../AdsComponets'

const HomePage = () => {

  const obj = {
      title: "Title",
      description: "Description"
  }

  return (
    <>
     <AdsComponent/> 
    <MainPosts/>
    <Footer/>
    </>
  )
}

export default HomePage