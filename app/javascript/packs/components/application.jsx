import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const Application = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('/api/v1/posts')
      .then(resp => resp.json())
      .then(posts => setPosts(posts))
  }, [])

  return (
    <Router>
      <div>
        <h1>Posts</h1>
        <Switch>
          <Route path='/' exact>
            <PostList posts={posts} />
          </Route>
          <Route path='/posts/:id' component={PostShow} />
        </Switch>
      </div>
    </Router>
  )
}

export default Application

const PostShow = ({ match }) => {
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState(null)

  useEffect(() => {
    fetch(`/api/v1/posts/${match.params.id}`)
      .then(resp => resp.json())
      .then(post => {
        setPost(post)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h1>{post.title}</h1>

      <Link to='/'>&lt;- Go Back</Link>

      {post.body.split('\n').map((paragraph, i) => {
        return <p key={i}>{paragraph}</p>
      })}
    </div>
  )
}

const PostList = ({ posts }) => {
  return (
    <ul>
      {posts.map(post => <PostItem key={post.id} post={post} />)}
    </ul>
  )
}

const PostItem = ({ post }) => {
  return (
    <li><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
  )
}
