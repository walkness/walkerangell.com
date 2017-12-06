/* globals XMLHttpRequest */

import React, { Component } from 'react';
import { locationShape } from 'react-router/lib/PropTypes';
import Helmet from 'react-helmet';
import Formsy from 'formsy-react';

import PageHeader from 'AppComponents/PageHeader';
import { Input, TextArea } from 'AppComponents/Forms/Formsy';
import SubmitButton from 'AppComponents/SubmitButton';
import Alert from 'AppComponents/Alert';

import './styles.scss';


class Contact extends Component {

  static propTypes = {
    location: locationShape.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      formValid: false,
      isSubmitting: false,
      error: false,
      success: props.location && props.location.hash === '#success',
    };
    this.submitUrl = 'https://formspree.io/hello@walkerangell.com';
    this.onValidSubmit = this.onValidSubmit.bind(this);
  }

  onValidSubmit(data, resetForm) {
    this.setState({ isSubmitting: true }, () => {
      const oReq = new XMLHttpRequest();

      oReq.onreadystatechange = (e) => {
        if (oReq.readyState === 4) {
          if (oReq.status === 200) {
            // resetForm();
            this.setState({
              success: true,
              error: false,
              isSubmitting: false,
            });
          } else {
            console.warn(e.target.response);
            this.setState({
              error: true,
              success: false,
              isSubmitting: false,
            });
          }
        }
      };

      oReq.open('POST', this.submitUrl);

      oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      oReq.setRequestHeader('Accept', 'application/json');

      oReq.send(JSON.stringify(data));
    });
  }

  render() {
    const { formValid, isSubmitting, error, success } = this.state;

    return (
      <div className='container'>

        <Helmet title='Contact' />

        <PageHeader title='Contact' />

        <div
          className='body'
          dangerouslySetInnerHTML={{ __html: require('data/content/contact/index.md') }} // eslint-disable-line react/no-danger, global-require, max-len
        />

        <Alert type='danger' display={!!error}>
          <strong>Error: </strong>An unknown error occurred. Please try again.
        </Alert>

        <Alert type='success' display={!error && success}>
          <strong>Thanks for your message!</strong> I&#039;ll get back to you soon.
        </Alert>

        <Formsy
          className='form'
          styleName='contact-form'
          action={this.submitUrl}
          method='POST'
          onValid={() => this.setState({ formValid: true })}
          onInvalid={() => this.setState({ formValid: false })}
          onValidSubmit={this.onValidSubmit}
          noValidate
        >

          <div className='row'>

            <fieldset styleName='details'>
              <Input
                name='name'
                label='Name'
              />

              <Input
                type='email'
                name='email'
                label='Email'
                validations={{ isEmail: true }}
                validationErrors={{
                  isEmail: 'Must be a valid email.',
                }}
                required
              />

              <Input
                type='tel'
                name='tel'
                label='Phone'
                validations={{
                  matchRegexp: /^\+?[\d()\s.-]{10,20}$/,
                }}
                validationError='Must be a valid phone number.'
              />
            </fieldset>

            <TextArea
              wrapperClassName='message'
              name='message'
              label='Message'
              rows={10}
              required
            />

          </div>

          <Input
            type='text'
            name='_gotcha'
            style={{ display: 'none' }}
          />

          <Input type='hidden' name='_next' value='http://walkerangell.com/contact/#success' />

          <SubmitButton
            enabled={formValid}
            isSubmitting={isSubmitting}
            styleName='btn'
          />

        </Formsy>

      </div>
    );
  }
}

export default Contact;
