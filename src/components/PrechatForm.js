'use strict';

import React, { Component } from 'react';
import CardContainer from 'components/CardContainer';
import MessageSvg from 'components/MessageSvg';
import ActionButton from 'components/ActionButton';
import { log } from 'utils';
import { connect } from 'react-redux'
import zChat from 'vendor/web-sdk';

class PrechatForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: false
    };
    this.send = this.send.bind(this);
    this.renderChild = this.renderChild.bind(this);
  }

  send(event) {
    event.preventDefault();
    const msg = this.refs.message.value;

    // Don't send empty messages
    if (!msg) return;

    zChat.setVisitorInfo({
      name: 'John Doe',
      email: 'myuser@useruser.com',
    }, (err) => {
      if (err) return;

      zChat.sendChatMsg(msg, (err) => {
        if (err) log('Error sending message');
      })
    });

    this.props.dispatch({
      type: 'synthetic',
      detail: {
        type: 'visitor_send_msg',
        msg: msg
      }
    });
  }

  renderChild() {
    return (
      <form key="not-sent" className="offline-form">
        <div className="content">
          <div className="section">
            <label className="label">Message</label>
            <textarea ref="message" />
          </div>
        </div>
        <div className="button-container">
          <ActionButton
            addClass="button-send"
            label="Send"
            onClick={this.send}
          />
        </div>
      </form>
    );
  }

  render() {
    return (
      <CardContainer title="Start a chat" addClass="offline-card" contentAddClass={this.state.sent ? 'sent' : ''} icon={ <MessageSvg /> }>
        {this.renderChild()}
      </CardContainer>
    );
  }
}


PrechatForm.displayName = 'PrechatForm';
PrechatForm.propTypes = {
  onClick: React.PropTypes.func,
  addClass: React.PropTypes.string
};

export default connect()(PrechatForm);
