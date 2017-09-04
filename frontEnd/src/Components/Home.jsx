import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { request } from '../Services/API.js'
import path from '../Services/path.js';
import Channel from './Channel/ChannelItem.jsx';
import FeedItem from './Feed/FeedItem.jsx';
import ConfirmDialog from './Dialog/ConfirmDialog.jsx';
import Dialog from './Dialog/Dialog.jsx';
import Feed from './Feed/FeedContent.jsx';
import Header from './Header.jsx';
import { removeProps } from '../Services/helper.js'


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.deleteChannelEvent = this.deleteChannelEvent.bind(this);
        this.deleteChannelAction = this.deleteChannelAction.bind(this);
        this.chooseChannel = this.chooseChannel.bind(this);
        this.chooseFeed = this.chooseFeed.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.showConfirmDialog = this.showConfirmDialog.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.setFeed = this.setFeed.bind(this);
        this.exit = this.exit.bind(this);
        this.state = {
            channels: [],
            feeds: [],
            text: '',
            action: '',
            dialog: false,
            confirmDialog: false,
            feedRead: undefined
        }
    }
    componentDidMount() {
        this.setFeed()
    }
    setFeed() {
        request('GET', path.channels, {})
        .then(channels => {
            this.setState({ channels });
            if (channels.length > 0)
                request('GET', path.channel, {
                    params: channels[0].id
                })
                .then(feeds => this.setState({ feeds, feedRead: feeds[0] }))
            else {
                console.log('dima')
                this.setState({ feedRead: undefined });            
            }
        })
    }
    deleteChannelAction(id) {
        this.setState({ confirmDialog: false });
        request('DELETE', path.channel, {
            params: id
        })
        .then(res => {
            const channels = this.state.channels.filter(item => item.id !== id)
            this.setState({ channels })
            this.setFeed();
        })
    }
    deleteChannelEvent(id) {
        this.setState({
            confirmDialog: true,
            action: () => this.deleteChannelAction(id),
            text: 'Do you really wanna delete this channel?'
        });
    }

    chooseChannel(channel) {
        request('GET', path.channel, {
            params: channel.id
        })
            .then(feeds => this.setState({ feeds, feedRead: feeds[0] }))
    }
    showDialog() {
        this.setState((prevState => ({
            dialog: !prevState.dialog
        })))
    }
    showConfirmDialog() {
        this.setState((prevState => ({
            confirmDialog: !prevState.confirmDialog
        })))
    }
    
    chooseFeed(feedRead) {
        this.setState({ feedRead })
    }
    addChannel(obj) {
        this.setState({ dialog: false })
        request('POST', path.channelCreate, {
            body: obj
        })
            .then(res => {
                this.setFeed()
            })
    }
    exit() {
        this.setState({
            confirmDialog: true,
            action: () => {
                removeProps();
                this.props.history.push('/setup');
            },
            text: 'Do you really wanna exit?'
        });
    }

render() {
    return (
        <div className="container">
        <header>
            <Header exit={this.exit} />
        </header>
        <div className="page">
            <div className="channel">
                    <p className="channel__item__title">Channels<i onClick={this.showDialog} className="material-icons icon__add">add_box</i></p>
                {
                    this.state.channels.length ? this.state.channels.map((item, index)=>
                        <Channel
                            key={index}
                            channel={item}
                            remove={this.deleteChannelEvent}
                            choose={this.chooseChannel}
                        />
                    ) :
                    <p>No channels</p>
                }
            </div>
            <div className="feed">
                <div className="feed__list">
                        <p className="channel__item__title">Feeds List</p>
                    {
                         this.state.feeds.length > 0 ? this.state.feeds.map((item, index) => 
                            <FeedItem
                                key={index}
                                feed={item}
                                chooseFeed={this.chooseFeed}
                            />
                        )   :
                        <p>No feeds</p>
                    }
                </div>
                {
                    this.state.feedRead && <Feed feedRead={this.state.feedRead} />
                }
            </div>
        </div>
        {
                this.state.dialog &&
                    <Dialog
                        showDialog={this.showDialog}
                        submit={this.addChannel}
                    />
        }
        {
            this.state.confirmDialog &&
                <ConfirmDialog
                    text={this.state.text}
                    action={this.state.action}
                    closeDialog={this.showConfirmDialog}
                />
        }
        </div>
    )
}
} 
export default withRouter(HomePage);