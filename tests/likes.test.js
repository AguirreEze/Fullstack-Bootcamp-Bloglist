const listHelper = require('../utils/list_helper')

const blogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('of empty list is 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const listWithOnlyOneBlog = [blogList[0]]

    const result = listHelper.totalLikes(listWithOnlyOneBlog)
    expect(result).toBe(blogList[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const newBlog = {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
    const newList = [...blogList, newBlog]

    const result = listHelper.totalLikes(newList)
    const expected = listHelper.totalLikes(blogList) + newBlog.likes

    expect(result).toBe(expected)
  })
})

describe('Most liked ', () => {
  test('of an empty string is undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(undefined)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.favoriteBlog(blogList)
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(expected)
  })
})

describe('Most blogs posted ', () => {
  test('of a empty string should be undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual(undefined)
  })
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostBlogs(blogList)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expected)
  })
})

describe('Most liked blogger', () => {
  test('of a bigger list is calculated right', () => {
    const result = listHelper.mostLikes(blogList)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(expected)
  })
})
