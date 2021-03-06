import * as React from 'react';
import { postMessage, Message } from '../client';
import { Button, Form, Segment, TextArea } from 'semantic-ui-react';

interface MessageFormProps {
    channelName: string;
}

interface MessageFormState {
    body?: string;
}

export class MessageForm extends React.Component<MessageFormProps, MessageFormState> {

    constructor(props: MessageFormProps) {
        super(props);
        this.state = {
            body: ''
        };
        this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
    }

    public render() {
        return (
            <Segment basic textAlign='center'>
            <p> 入力値: {this.state.body}</p>
            <Form onSubmit={this.handleFormSubmit}>
                <Form.Field>
                   <TextArea
                     autoHeight
                     placeholder='Write message'
                     value={this.state.body}
                     onChange={this.handleTextAreaChange} />
                </Form.Field>
                <Button primary type='submit'>Send</Button>
            </Form>
            </Segment>
        );
    }

    private handleTextAreaChange(event: React.FormEvent<HTMLTextAreaElement>) {
        event.preventDefault()
        this.setState({body: event.currentTarget.value });
    }

    private handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const payload = {
            body: this.state.body,
        } as Message;
        postMessage(this.props.channelName, payload)
          .then(() => {
              this.setState({body: ''});
          })
          .catch(err => {
              console.log(err);
          });
    }
}

