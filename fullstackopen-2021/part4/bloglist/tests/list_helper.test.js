const listHelper = require('../utils/list_helper')

test('dummy return one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})
const blogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]
describe('total likes', () => {

    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const listOfOneBlog = blogs.slice(0, 1)
        expect(listHelper.totalLikes(listOfOneBlog)).toBe(listOfOneBlog[0].likes)
    })
    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogs)).toBe(36)
    })
})
describe('favorite blog', () => {
    test('of empty list is null', () => {
        expect(listHelper.favoriteBlog([])).toEqual(null)
    })
    test('when list has only one blog is that blog', () => {
        const listOfOneBlog = blogs.slice(0, 1)
        const expectResult = {
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        }
        expect(listHelper.favoriteBlog(listOfOneBlog)).toEqual(expectResult)
    })
    test('of a bigger list is returned right blog', () => {
        const expectResult = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        }
        expect(listHelper.favoriteBlog(blogs)).toEqual(expectResult)
    })
})
describe('most blog', () => {
    test('of empty list is null', () => {
        expect(listHelper.mostBlogs([])).toEqual(null)
    })
    test('when list has only one blog is that author', () => {
        const listOfOneBlog = blogs.slice(0, 1)
        const expectResult = {
            author: "Michael Chan",
            blogs: 1
        }
        expect(listHelper.mostBlogs(listOfOneBlog)).toEqual(expectResult)
    })
    test('of a bigger list is returned right author', () => {
        const expectResult = {
            author: "Robert C. Martin",
            blogs: 3
        }
        expect(listHelper.mostBlogs(blogs)).toEqual(expectResult)
    })
})
describe('most like', () => {
    test('of empty list is null', () => {
        expect(listHelper.mostLikes([])).toEqual(null)
    })
    test('when list has only one blog is that likes', () => {
        const listOfOneBlog = blogs.slice(0, 1)
        const expectResult = {
            author: "Michael Chan",
            likes: 7
        }
        expect(listHelper.mostLikes(listOfOneBlog)).toEqual(expectResult)
    })
    test('of a bigger list is returned right most like', () => {
        const expectResult = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }
        expect(listHelper.mostLikes(blogs)).toEqual(expectResult)
    })
})