import React, { PureComponent} from 'react';

class Dialog extends PureComponent {
    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
    }
    submit(e) {
        e.preventDefault()
        const {url, rss } = this.refs;
        this.props.submit({
            url: url.value,
            provider: rss.checked ? 'rss' : 'facebook'
        })
    }
    render() {
        return(
            <div>
                <div className="full-layout" onClick={this.props.showDialog}></div>
                <div className="dialog">
                    <p className="dialog__title">New channel</p>
                    <form onSubmit={this.submit}>
                        <label className="dialog__url">
                            <p className="dialog__text">Input url of new channel:</p>
                            <input
                                className="dialog__url__input"
                                ref="url"
                                name="url"
                                type="text"
                                required
                            />
                        </label>
                        <div className="dialog__url">
                            <p className="dialog__text">Choose provider: </p>
                            <label className="dialog__radio__word">
                                <input
                                    ref="facebook"
                                    className="dialog__radio" 
                                    type="radio" name="provider"
                                    value="facebook"
                                    defaultChecked
                                />
                                Facebook
                            </label>
                            <label className="dialog__radio__word">
                                <input
                                    ref="rss"
                                    className="dialog__radio"
                                    type="radio"
                                    name="provider"
                                    value="rss"
                                />
                                RSS
                            </label>
                        </div>
                        <button className="dialog__submit"type="submit">Add</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Dialog;