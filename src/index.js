import React from 'react';
import ReactDOM from 'react-dom';

class CommentsApp extends React.Component {
  constructor() {
    super();
    this.state = localStorage.getItem('comments') ?
      {
        comments: JSON.parse(localStorage.getItem('comments')),
        newAuthor: '',
        newText: '',
        date: ''
      } :
      {
        comments: [],
        newAuthor: '',
        newText: '',
        date: ''
      };
  }

  addComment() {
    const date = new Date();
    const comments = this.state.comments;

    if ((this.state.newAuthor === '') || (this.state.newText === '')) {
      alert('Оба поля обязательны');
    } else {
      comments.push({
        author: this.state.newAuthor,
        text: this.state.newText,
        date: date.toString()
      });

      // обновляем состояние приложения
      this.setState({
        comments: comments,
        newAuthor: '',
        newText: '',
        date: ''
      });

      localStorage.setItem('comments', JSON.stringify(comments));
    }
  }

  deleteComment(key) {
    const comments = this.state.comments.filter((comment, i) => (key !== i) ? comment : null);

    // обновляем состояние приложения
    this.setState({comments: comments});
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  render() {
    return (<div className="content">
      <h1>react-comments-widget</h1>
      <p><input
        required
        name="usrname"
        placeholder="Ваше имя"
        type = "text"
        value = {this.state.newAuthor}
        onChange = {ev => {
          this.setState({ newAuthor: ev.target.value });
        }}
      /></p>
      <p><textarea
        required
        placeholder="Ваш комментарий"
        type = "text"
        value = {this.state.newText}
        onChange = {ev => {
          this.setState({ newText: ev.target.value });
        }}
      /></p>
      <p><button
        type="submit"
        onClick = {() => this.addComment()}>Добавить комментарий</button></p>
      <hr />
      {
        this.state.comments.map( (comment, i) => {
          return (
            <div key = {i} className="comment">
              <p className="commentAuthor">{comment.author}</p>
              <p className="commentDate">{comment.date}</p>
              <p className="commentText">{comment.text}</p>
              <button
                onClick = {() => this.deleteComment(i)}>delete</button>
              <hr />
            </div>
          );
        })
      }

    </div>);
  }
}
ReactDOM.render(
  <CommentsApp />,
  document.getElementById('app')
);
