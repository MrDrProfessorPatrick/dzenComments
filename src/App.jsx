import React from 'react'

import { Routes, Route } from 'react-router-dom'
import { PostProvider } from './hooks/PostContext'
import PostList from './components/PostList'
import Post from './components/Post'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/posts/:id" element = {
          <PostProvider> 
            <Post/> 
          </PostProvider> } />
      </Routes>
    </div>
  )
}

export default App
