import React from 'react';

const FeedItem = ({ feed, chooseFeed }) => {

    const chooseMethod = () => chooseFeed(feed);
    
    return (
        <div className="channel__item">
            <div style={{ 'overflow': 'hidden' }} onClick={chooseMethod}>
                <p className="channel__item__p">{feed.title}</p>
            </div>
        </div>
    );
}
export default FeedItem;