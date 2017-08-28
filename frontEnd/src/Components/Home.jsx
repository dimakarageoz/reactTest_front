import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { queryParams, queryBody } from '../Services/API.js'
import path from '../Services/path.js';
import Channel from './ChannelItem.jsx';
import FeedItem from './FeedItem.jsx';
import Dialog from './Dialog.jsx';
import Feed from './FeedContent.jsx';
import Header from './Header.jsx';
import { removeProps } from '../Services/helper.js'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.deleteChannel = this.deleteChannel.bind(this);
        this.chooseChannel = this.chooseChannel.bind(this);
        this.chooseFeed = this.chooseFeed.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.addChannel = this.addChannel.bind(this);
        this.setFeed = this.setFeed.bind(this);
        this.exit = this.exit.bind(this);
        this.state = {
            channels: [],
            feeds: [],
            dialog: false,
            feedRead: undefined
        }
    }
    componentDidMount() {
        this.setFeed()
    }
    setFeed() {
        queryParams('GET', path.channels)
        .then(channels => {
            this.setState({ channels });
            if (channels.length > 0)
                queryParams('GET', path.channel, channels[0].id)
                .then(feeds => this.setState({ feeds, feedRead: feeds[0] }))
        })
    }
    deleteChannel(id) {
        queryParams('DELETE', path.channel, id)
            .then(res => {
                const channels = this.state.channels.filter(item => item.id !== id)
                this.setState({ channels })
            })
    }

    chooseChannel(channel) {
        queryParams('GET', path.channel, channel.id)
            .then(feeds => this.setState({ feeds, feedRead: feeds[0] }))
    }
    showDialog() {
        this.setState((prevState => ({
            dialog: !prevState.dialog
        })))
    }
    
    chooseFeed(feedRead) {
        this.setState({ feedRead })
    }
    addChannel(obj) {
        this.setState({ dialog: false })
        queryBody('POST', path.channelCreate, obj)
            .then(res => {
                this.setFeed()
            })
    }
    exit() {
        removeProps();
        this.props.history.push('/setup');
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
                            remove={this.deleteChannel}
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
        </div>
    )
}
} 
export default withRouter(HomePage);