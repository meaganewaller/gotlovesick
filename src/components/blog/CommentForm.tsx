'use client'

import { createComment } from '@/services/graphql'
import { useState } from 'react'
import { randomBytes } from 'crypto'

export function CommentForm({ postID }: { postID: number }) {
  const [author, setAuthor] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState('')
  const [clientMutationId, setClientMutationId] = useState('')

  /**
    * Handle the comment form submission.
    */
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setClientMutationId(randomBytes(10).toString('hex'))

    // Create the comment and await the status.
    const status = await createComment({
      author,
      authorEmail: email,
      authorUrl: website,
      content: comment,
      commentOn: postID,
      clientMutationId
    })

    // If the comment was created successfully...
    if (status && status.success) {
      // Clear the form.
      setAuthor('')
      setEmail('')
      setWebsite('')
      setComment('')
      setClientMutationId('')

      // Set the status message.
      setStatus(
        `Thank you ${author}! Your comment has been submitted and is awaiting moderation.`
      )
    }

    // If there was an error...
    if (status && !status.success) {
      setStatus(`There was an error submitting your comment: ${status.comment}`)
    }
  }

  return (
    <div className="comment-respond">
      <h3 id="reply-title" className="comment-reply-title">Leave a Reply</h3>
      <form className="comment-form" onSubmit={handleSubmit}>
        <p className="comment-notes">
          <span id="email-notes">Your email address will not be published.{" "}</span>
          <span className="required-field-message">
            Required fields are marked{" "}
            <span className="required">*</span>
          </span>
        </p>
        <p className="comment-form-comment comment-form-float-label">
          <textarea
            id="comment"
            name="comment"
            placeholder="Leave a comment..."
            cols={45}
            rows={8}
            maxLength={65525}
            aria-required="true"
            required={true}
            onChange={(e) => setComment(e.target.value)}
          />
          <label className="float-label" htmlFor="comment">
            Comment{" "}
            <span className="required">*</span>
          </label>
        </p>
        <div className="comment-input-wrap has-url-field">
          <p className="comment-form-author">
            <input
              id="author"
              onChange={(e) => setAuthor(e.target.value)}
              required
              type="text"
              value={author}
              aria-required={true}
              placeholder="Jane Doe"
              size={30}
              maxLength={245}
              aria-label="Name"
            />
            <label className="float-label" htmlFor="author">
              Name{" "}
              <span className="required">*</span>
            </label>
          </p>
          <p className="comment-form-email">
            <input
              aria-label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="float-label" htmlFor="email">
              Email{" "}
              <span className="required">*</span>
            </label>
          </p>
          <p className="comment-form-url">
            <input
              aria-label="Website"
              id="url"
              name="url"
              type="url"
              placeholder="https://example.com"
              value={website}
              size={30}
              maxLength={200}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <label className="float-label" htmlFor="url">Website</label>
          </p>
        </div>
        <p className="comment-form-cookies-consent">
          <input id="wp-comment-cookies-consent" name="wp-comment-cookies-consent" type="checkbox" value="yes" />
          <label htmlFor="wp-comment-cookies-consent">Save my name, email, and website in this browser for the next time I comment.</label>
        </p>
        <p className="form-submit">
          <button type="submit">Submit</button>
        </p>
        {status && <p>{status}</p>}
      </form>
    </div>
  )
}
