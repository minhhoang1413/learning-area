describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3000/api/testing/reset')
        const user = {
            username: 'admin',
            password: 'admin',
            name: 'hoang'
        }
        cy.request('POST', 'http://localhost:3000/api/users', user)
        cy.visit('http://localhost:3000')
    })
    it('login form is show', function () {
        cy.get('form')
            .contains('username')
            .get('input[type="text"')
        cy.get('form')
            .contains('password')
            .get('input[type="password"]')
    })
    describe('login', function () {
        it('success  with correct credentials', function () {
            cy.get('#username').type('admin')
            cy.get('#password').type('admin')
            cy.get('#submit').click()

            cy.contains('admin logged in')
        })
        it('fails with wrong credentials', function () {
            cy.get('#username').type('admin')
            cy.get('#password').type('wrong')
            cy.get('#submit').click()
            cy.get('.error').should('contain', 'invalid username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe('when log in',function(){
        beforeEach(function(){
            cy.request('POST','http://localhost:3000/api/login',{
                username:'admin',password:'admin'
            }).then(response => {
                localStorage.setItem('loggedBloglistappUser',JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })
        it('a new note can be created',function(){
            cy.contains('create new blog').click()
            cy.get('#title').type('a new note created by cypress')
            cy.get('#author').type('cypress')
            cy.get('#url').type('cypressUrl')
            cy.get('#submit-blog').click()
            cy.contains('a new note created by cypress')
        })
        describe('and a blog exist', function(){
            beforeEach(function(){
                cy.createBlog({
                    title: 'first blog',
                    author: 'cypress',
                    url: 'cypressurl.com',
                    likes: 2
                })
                cy.createBlog({
                    title: 'second blog',
                    author: 'cypress',
                    url: 'cypressurl.com',
                    likes: 1
                })
                cy.createBlog({
                    title: 'third blog',
                    author: 'cypress',
                    url: 'cypressurl.com',
                    likes: 3
                })
            })
            it('user can like a blog', function(){
                cy.contains('second blog').contains('view').click()
                cy.contains('second blog').parent().find('.btn-like').click()
                cy.contains('second blog').parent().contains('likes 1')
            })
            it('user can delete a blog', function(){
                cy.contains('second blog').contains('view').click()
                cy.contains('second blog').parent().contains('remove').click()
                cy.get('html').should('not.contain','second blog')
            })
            
        })
    })
})