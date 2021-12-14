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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
