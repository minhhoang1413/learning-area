import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

let component
const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'http://testurl.com',
    likes: 0,
    user: {
        username: null
    }
}
beforeEach(() => {
    component = render(
        <Blog blog={blog} />
    )
})
test('blog', () => {


    const blogShow = component.container.querySelector('.blog-show')
    const blogHidden = component.container.querySelector('.blog-hidden')
    expect(blogShow).toHaveTextContent(blog.title)
    expect(blogHidden).toHaveStyle('display:none')
    expect(blogHidden).toHaveTextContent(blog.url)
})
test('blog-toggle', () => {
    const toggleBtn = component.container.querySelector('.btn-toggle')
    fireEvent.click(toggleBtn)
    const blogHidden = component.container.querySelector('.blog-hidden')
    expect(blogHidden).not.toHaveStyle('display:none')
    expect(blogHidden).toHaveTextContent(blog.url)
    expect(blogHidden).toHaveTextContent("likes " + blog.likes)
})
test('like button', () => {
    const mockHandler = jest.fn()
    const component = render(
        <Blog blog={blog} updateBlog={mockHandler} />
    )
    const likeBtn = component.container.querySelector('.btn-like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
})