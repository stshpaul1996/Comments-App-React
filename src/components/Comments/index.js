import {Component} from 'react'
import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(each => {
        if (each.id === id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(each => (
      <CommentItem
        key={each.id}
        commentDetails={each}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      initialClassName: initialBackgroundColorClassName,
      isLiked: false,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state
    return (
      <div className="bg-page">
        <h1 className="heading">Comments</h1>
        <div className="comment-main-container">
          <form className="comment-container" onSubmit={this.onAddComment}>
            <p className="comment-para">Say something about 4.0 Technologies</p>
            <input
              className="comment-name"
              placeholder="Your Name"
              type="text"
              value={nameInput}
              onChange={this.onChangeNameInput}
            />
            <textarea
              className="comment"
              rows="6"
              placeholder="Your Comment"
              value={commentInput}
              onChange={this.onChangeCommentInput}
            />
            <button type="submit" className="comment-button">
              Add Comment
            </button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comment-img"
            />
          </div>
        </div>
        <hr />
        <div className="count-container">
          <button type="button" className="btn-count">
            {commentsList.length}
          </button>
          <p className="count-para">Comments</p>
        </div>
        <ul className="comments-list"> {this.renderCommentsList()}</ul>
      </div>
    )
  }
}
export default Comments
