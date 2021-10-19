const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((total, current) => total += current.likes, 0)

const favoriteBlog = (blogs) => {
    const maxObj = blogs.reduce((max, blog, index) => {
        if (max.value <= blog.likes) {
            max.value = blog.likes
            max.index = index
        }
        return max
    }, { value: 0, index: -1 })
    if(maxObj.index === -1) return null
    return blogs[maxObj.index]
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return null
    let authorCount =blogs.reduce((authorCount,blog) => {
        if (! authorCount[blog.author]) {
            authorCount[blog.author] = 1
        } else {
            authorCount[blog.author] += 1
        }
        return authorCount
    },{})
    authorCount = Object.entries(authorCount)
    const mostBlog = authorCount.reduce((mostBlog, current) => {
        if(mostBlog.blogs < current[1]){
            mostBlog.author = current[0]
            mostBlog.blogs = current[1]
        }
        return mostBlog
    },{author:'', blogs:-1})
    return mostBlog
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null
    let authorCount =blogs.reduce((authorCount,blog) => {
        if (! authorCount[blog.author]) {
            authorCount[blog.author] = blog.likes
        } else {
            authorCount[blog.author] += blog.likes
        }
        return authorCount
    },{})
    authorCount = Object.entries(authorCount)
    const mostLike = authorCount.reduce((mostLike, current) => {
        if(mostLike.likes < current[1]){
            mostLike.author = current[0]
            mostLike.likes = current[1]
        }
        return mostLike
    },{author:'', likes:-1})
    return mostLike
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }