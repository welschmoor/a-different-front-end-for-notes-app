// CI=true npm test

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import TogglableBlogDetails from '../components/TogglableBlogDetails'


describe('<TogglableBlogDetails />', () => {
  let component
  const mockLikeHandler = jest.fn()

  const blog = {
    title: 'test title',
    author: 'author',
    likes: 7,
    url: 'url',
  }

  beforeEach(() => {
    component = render(
      <TogglableBlogDetails blog={blog} likeHandler={mockLikeHandler} >
        <div className="testDiv" />
      </TogglableBlogDetails>
    )
  })


  test('children are hidden in the beginning', () => {
    expect(component.container.querySelector('.testDiv')).toBe(null)
  })


  // ex 5.13
  test('renders title, but does not render the number of likes', () => {
    const blogTitle = component.container.querySelector('.blogtitle')
    const likesDiv = component.container.querySelector('.likesDiv')

    // the title should be 'test title', not 'batman'
    expect(blogTitle).toHaveTextContent('test title')
    expect(blogTitle).not.toHaveTextContent('batman')

    // likes should not be visible:
    expect(likesDiv).toHaveStyle('display: none')
  })


  // ex 5.14
  test('after show button is clicked, show likes', () => {
    const likesDiv = component.container.querySelector('.likesDiv')
    const likesParagraph = component.container.querySelector('.likesParagraph')
    const showButton = component.getByText('Show')
    fireEvent.click(showButton)

    expect(likesDiv).not.toHaveStyle('display: none')
    expect(likesParagraph).toHaveTextContent('Likes:')
  })

  // ex 5.15
  test('clicking the like button twice is registered twice', () => {
    const likeButton = component.getByText('Like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
  })

})