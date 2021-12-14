const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  if (list.length === 0) return 0
  return list.map(e => e.likes).reduce((a, b) => a + b)
}

module.exports = {
  dummy,
  totalLikes
}
