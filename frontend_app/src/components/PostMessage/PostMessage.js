import React, {Component} from 'react';
import {Input, Label} from 'reactstrap';
import {Button, Col, Form, FormGroup} from "react-bootstrap";

class PostMessage extends Component {

  render() {
    return (
      <Form onSubmit={this.props.submit}>
        <FormGroup >
          <Label sm={2} for="authorName">Author</Label>
          <Col sm={10}>
            <Input
              type="text" 
              name="author" id="authorName"
              placeholder="Enter your name"
              onChange={this.props.change} 
              value={this.props.author}
            />
          </Col>
        </FormGroup>

        <FormGroup >
          <Label sm={2} for="message">Message</Label>
          <Col sm={10}>
            <Input
              type="textarea" 
              name="message" id="message"
              placeholder="Enter your message"
              onChange={this.props.change} 
              value={this.props.message}
            />
          </Col>
        </FormGroup>
        
        <FormGroup >
          <Col sm={{offset:2, size: 10}}>
            <Button type="submit" color="primary">Send</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  } 
};

export default PostMessage;