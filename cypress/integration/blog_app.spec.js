




describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  // ex5.17
  it('Login form is shown', function () {
    cy.get('.loginform')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  // ex4.18
  describe('logging in', function () {
    // creating a user with POST
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Kek Kek',
        username: 'kek',
        password: 'kek'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')

    })

    // ex4.18

    it('unsuccessful log in with wrong password', function () {
      cy.get('input:first').type('kek')
      cy.get('input:last').type('wrongpassword')
      cy.get('button').click()

      cy.get('.error').should('contain', 'Wrong credentials')
      cy.get('html').should('not.contain', 'Hello, ')
    })

    it('successful log in', function () {
      cy.get('input:first').type('kek')
      cy.get('input:last').type('kek')
      cy.get('button').click()
      cy.contains('Hello, kek')
    })



  })  //end logging in

  // ex5.19
  describe('When logged in ex5.19', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Kek Kek',
        username: 'kek',
        password: 'kek'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.visit('http://localhost:3000')

      cy.get('input:first').type('kek')
      cy.get('input:last').type('kek')
      cy.get('button').click()
      cy.contains('Hello, kek')
    })

    it('A blog can be created', function () {
      cy.contains('Add new Blog').click()
      cy.get('input').type('adding this with cypress')
      cy.contains('save').click()
      cy.get('html').should('contain', 'adding this with cypress')
    })

    //ex5.20
    it('blog can be liked', function () {
      cy.contains('Add new Blog').click()
      cy.get('input').type('adding this with cypress')
      cy.contains('save').click()
      cy.get('html').should('contain', 'adding this with cypress')

      cy.contains('Show').click()
      cy.get('html').should('contain', 'Likes: 0')
      cy.get('.likebutton').click()
      cy.get('html').should('contain', 'Likes: 1')
    })

    //ex5.21
    it('user can delete blog', function () {
      cy.contains('Add new Blog').click()
      cy.get('input').type('this blog will be deleted')
      cy.contains('save').click()
      cy.contains('this blog will be deleted')
        .parent()
        .contains('Show').click()
        .parent()
        .contains('Delete').click()
        .should('not.contain', 'this blog will be deleted')
    })


    describe('ex5.21 cant delete unown blogs', function () {
      beforeEach(function () {
        cy.contains('Add new Blog').click()
        cy.get('input').type('adding this with cypress')
        cy.contains('save').click()
        cy.get('html').should('contain', 'adding this with cypress')

        cy.contains('Add new Blog').click()
        cy.get('input').type('adding 2nd')
        cy.contains('save').click()
        cy.get('html').should('contain', 'adding 2nd')
      })

      it.only('user cant delete blogs posted by others', function () {

        cy.contains('Logout').click()
        // after logging out we create a differt user, log in, and try to delete blog

        const user = {
          name: 'Kek2 Kek2',
          username: 'kek2',
          password: 'kek2'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')

        cy.get('input:first').type('kek2')
        cy.get('input:last').type('kek2')
        cy.get('button').click()
        cy.contains('Hello, kek2')

        // there should not be any delete buttons for this other user kek2
        cy.get('html').should('not.contain', 'Delete')
      })

    })





  })




})