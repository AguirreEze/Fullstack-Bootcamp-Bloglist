const lodash = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  if (list.length === 0) return 0
  return list.map(e => e.likes).reduce((a, b) => a + b)
}

const favoriteBlog = (list) => {
  if (list.length === 0) return undefined
  const mostLikes = Math.max(...list.map(e => e.likes))
  const mostLiked = list.find(e => e.likes === mostLikes)

  return (
    {
      title: mostLiked.title,
      author: mostLiked.author,
      likes: mostLiked.likes
    }
  )
}

const mostBlogs = (list) => {
  if (list.length === 0) return undefined
  const blogsGrouped = lodash.groupBy(list, 'author')
  const blogs = lodash.mapValues(blogsGrouped, e => e.length)
  const mostBlogs = Object.keys(blogs).reduce((a, b) => blogs[a] > blogs[b] ? a : b)

  const answer = {
    author: mostBlogs,
    blogs: blogs[mostBlogs]
  }

  return answer
}

const mostLikes = (list) => {
  if (list.length === 0) return undefined
  const blogsGrouped = lodash.groupBy(list, 'author')
  // groups the blogs with their authors
  const blogs = lodash.mapValues(blogsGrouped, e => lodash.mapValues(e, 'likes'))
  // get the likes of all the blogs
  const bloggersLikes = lodash.mapValues(blogs, (e) => lodash.values(e).reduce((a, b) => a + b))
  // reduces the likes to a single value
  const mostBlogs = Object.keys(bloggersLikes).reduce((a, b) => bloggersLikes[a] > bloggersLikes[b] ? a : b)
  // gets the most liked author

  const answer = {
    author: mostBlogs,
    likes: bloggersLikes[mostBlogs]
  }

  return answer
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
