/* globals XMLHttpRequest */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Formsy from 'formsy-react';
import { graphql, PageProps } from 'gatsby';
import { Input, Textarea } from 'formsy-react-components';
import Alert from 'react-bootstrap/alert';
import Button from 'react-bootstrap/button';
import Spinner from 'react-bootstrap/spinner';
import cx from 'classnames';

import PageHeader from '@/components/page_header';

import styles from './contact.module.scss';

const submitUrl = 'https://formspree.io/hello@walkerangell.com';

interface ValidFormData {
  name?: string;
  email: string;
  message: string;
  tel?: string;
  _gotcha?: string;
  _next: string;
}

interface Props extends PageProps {
  data: {
    file: {
      childMarkdownRemark: {
        frontmatter: {
          title: string;
        };
        html: string;
      };
    };
  };
}

interface State {
  formValid: boolean;
  isSubmitting: boolean;
  error: boolean;
  success: boolean;
}

class Contact extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formValid: false,
      isSubmitting: false,
      error: false,
      success: props.location && props.location.hash === '#success',
    };
    this.onValidSubmit = this.onValidSubmit.bind(this);
  }

  onValidSubmit(data: ValidFormData): void {
    this.setState({ isSubmitting: true }, () => {
      const oReq = new XMLHttpRequest();

      oReq.onreadystatechange = (e) => {
        if (oReq.readyState === 4) {
          if (oReq.status === 200) {
            this.setState({
              success: true,
              error: false,
              isSubmitting: false,
            });
          } else {
            this.setState({
              error: true,
              success: false,
              isSubmitting: false,
            });
          }
        }
      };

      oReq.open('POST', submitUrl);

      oReq.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      oReq.setRequestHeader('Accept', 'application/json');

      oReq.send(JSON.stringify(data));
    });
  }

  render(): React.ReactNode {
    const {
      data: {
        file: {
          childMarkdownRemark: {
            frontmatter: { title },
            html: content,
          },
        },
      },
    } = this.props;
    const {
      formValid,
      isSubmitting,
      error,
      success,
    } = this.state;

    return (
      <div className='container'>

        <Helmet title={title} />

        <PageHeader title={title} />

        <div
          className='body'
          dangerouslySetInnerHTML={{ __html: content }} // eslint-disable-line react/no-danger
        />

        <Alert variant='danger' show={!!error}>
          <strong>Error: </strong>
          An unknown error occurred. Please try again.
        </Alert>

        <Alert variant='success' show={!error && success}>
          <strong>Thanks for your message!</strong>
          I&#039;ll get back to you soon.
        </Alert>

        <Formsy
          className={`form ${styles.contactForm}`}
          action={submitUrl}
          method='POST'
          onValid={() => this.setState({ formValid: true })}
          onInvalid={() => this.setState({ formValid: false })}
          onValidSubmit={this.onValidSubmit}
          noValidate
        >

          <div className='row'>

            <fieldset className={styles.details}>
              <Input
                name='name'
                label='Name'
                placeholder='Name'
                layout='vertical'
              />

              <Input
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                layout='vertical'
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
                placeholder='Phone'
                layout='vertical'
                validations={{
                  matchRegexp: /^\+?[\d()\s.-]{10,20}$/,
                }}
                validationError='Must be a valid phone number.'
              />
            </fieldset>

            <Textarea
              rowClassName='message'
              name='message'
              label='Message'
              placeholder='Message'
              layout='vertical'
              rows={9}
              required
            />

          </div>

          <Input
            type='text'
            name='_gotcha'
            rowClassName='d-none'
          />

          <Input
            type='hidden'
            name='_next'
            value='http://walkerangell.com/contact/#success'
            rowClassName='d-none'
          />

          <div className='clearfix' style={{ padding: '.5em 0' }}>
            <Button
              type='submit'
              disabled={!formValid || isSubmitting}
              size='lg'
              className={cx(styles.btn, { 'is-loading': isSubmitting })}
            >
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              Submit
            </Button>
          </div>

        </Formsy>

      </div>
    );
  }
}

export const pageQuery = graphql`
  query {
    file(relativePath: {eq: "content/contact/index.md"}) {
      childMarkdownRemark {
        frontmatter {
          title
        }
        html
      }
    }
  }
`;

export default Contact;
