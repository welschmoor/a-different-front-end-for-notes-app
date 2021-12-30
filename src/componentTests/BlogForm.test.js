// testing the Form
// CI=true npm test
// CI=true npm test -- src/componentTests/BlogForm.test.js

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from '../components/BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} author="mike" />
  )

  const input = component.container.querySelector('input')
  const form = component.container.querySelector('form')

  // simulating the change event:
  fireEvent.change(input, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.submit(form)

  console.log('<><>:::', createBlog.mock.calls[0][0].title)
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
})