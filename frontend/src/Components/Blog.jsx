import React from 'react'

const Blog = (props) => {
  return (
    <>
        <h1>{props.obj.title} </h1>
        
        <img
            src={"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&auto=format&fit=crop&w=1400&q=60"}
            alt=""
        />

        <p>{props.obj.description}</p>
        <hr></hr>
    </>
  )
}

export default Blog