import * as React from 'react';
import { match } from 'react-router-dom';
import { MessageForm, MessageFeed } from '../components';

interface ChannelMatch {
    channelName: string;
}

interface ChannelProps {
    match: match<ChannelMatch>;
}

export interface match<P> {
    params: P;
    isExact: boolean;
    path: string;
    url: string;
}

export class Channel extends React.Component<ChannelProps, {}> {

    constructor(props: ChannelProps) {
        super(props);
    }

    public render() {
        const { channelName } = this.props.match.params;
        return (
            [
                <MessageFeed key='message-feed' channelName={channelName} />,
                <MessageForm key='message-form' channelName={channelName} />
            ]
        );
    }
}