import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchMessages, onSubmitMessage} from "../../store/actions/messagesActions";
import PostMessage from '../../components/PostMessage/PostMessage';
import GetMessages from '../../components/GetMessages/GetMessages';
import {Alert} from 'reactstrap';

class Messages extends Component {
  interval = null;
  
  state = {
    author: '',
    message: ''
	};
	
	submitFormHandler = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({author: '', message: ''});
	};

	inputChangeHandler = event => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

  async componentDidMount() {
    this.props.FetchMessages(this.props.lastTime);
    this.interval = setInterval(() => this.props.FetchMessages(this.props.lastTime), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    let showDivWithAttention = 'none';
    if(this.props.error) {
      showDivWithAttention = 'block';
    } 

    return (
      <div className='Message'>
        <PostMessage 
          change={this.inputChangeHandler}
          submit={(event) => this.submitFormHandler(event)}
          author={this.state.author}
          message={this.state.message}
        />

        <Alert color="danger" style={{display: showDivWithAttention, maxWidth: '895px'}}>
          <p>{this.props.error}</p>
        </Alert>

        <div className='MessagesAll'>
        {this.props.messages.map(message => (
          <GetMessages
            key={message.id}
            date={message.datetime}
            author={message.author}
            message={message.message}
          />
        )).reverse()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    lastTime: state.messages.lastTime,
    error: state.messages.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    FetchMessages: (date) => dispatch(fetchMessages(date)),
    onSubmit: (message) => dispatch(onSubmitMessage(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);