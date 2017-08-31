import React from 'react';

const Channel = ({ channel = {}, remove = () => {}, choose = () => {}}) => {

const deleteAction = () => remove(channel.id)
const chooseMethod = () => choose(channel)

    return (
        <div className="channel__item" data-title={channel.url}>
            <div style={{ 'overflow': 'hidden' }} onClick={chooseMethod}>
                <p className="channel__item__p">{channel.url}</p>
            </div>
            <i className="material-icons channel__item__icon" onClick={deleteAction}>close</i>
        </div>
    );
}
export default Channel;