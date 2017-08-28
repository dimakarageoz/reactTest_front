import React from 'react';

const Channel = ({ feedRead }) => (
    <div className="feed__content">
        <p className="feed__title">{feedRead.title}</p>
        <p className="feed__text">{feedRead.content}</p>
    </div>
);
export default Channel;