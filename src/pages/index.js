/* eslint-disable max-len */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { StripeProvider, Elements } from 'react-stripe-elements';
import { createSelector } from 'reselect';

import { userSelector } from '../redux/app';

import Spacer from '../components/util/Spacer';
import DonateForm from '../components/Donation/components/DonateForm';
import DonateCompletion from '../components/Donation/components/DonateCompletion';
import PoweredByStripe from '../components/icons/poweredByStripe';

import './index.css';

const propTypes = {
  email: PropTypes.string,
  show: PropTypes.bool
};

const mapStateToProps = createSelector(
  userSelector,
  ({ email = '' }) => ({
    email
  })
);

// Stripe public key
const stripeKey = 'pk_live_E6Z6xPM8pEsJziHW905zpAvF';

class IndexPage extends Component {
  constructor(...props) {
    super(...props);
    this.state = {
      stripe: null
    };

    this.handleStripeLoad = this.handleStripeLoad.bind(this);
  }
  componentDidMount() {
    if (window.Stripe) {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState(state => ({
        ...state,
        stripe: window.Stripe(stripeKey)
      }));
    } else {
      document
        .querySelector('#stripe-js')
        .addEventListener('load', this.handleStripeLoad);
    }
  }

  componentWillUnmount() {
    const stripeMountPoint = document.querySelector('#stripe-js');

    if (stripeMountPoint) {
      stripeMountPoint.removeEventListener('load', this.handleStripeLoad);
    }
  }

  handleStripeLoad() {
    // Create Stripe instance once Stripe.js loads
    console.info('stripe has loaded');
    this.setState(state => ({
      ...state,
      stripe: window.Stripe(stripeKey)
    }));
  }

  renderCompletion(props) {
    return <DonateCompletion close={() => {}} {...props} />;
  }
  render() {
    const { email = '' } = this.props;
    return (
      <div>
        <div className='index-page-wrapper'>
          <Spacer size={2} />
          <Helmet title='Support the freeCodeCamp.org nonprofit' />
          <Spacer size={2} />
          <h2 style={{ textAlign: 'center' }}>Become a supporter</h2>
          <StripeProvider stripe={this.state.stripe}>
            <Elements>
              <Fragment>
                <DonateForm
                  email={email}
                  renderCompletion={this.renderCompletion}
                />
              </Fragment>
            </Elements>
          </StripeProvider>
          <Spacer size={2} />
          <a className='otherways-link' href='/other-ways-to-donate'>Other ways to donate...</a>
        </div>
        <Spacer />
        <div className='powered-by-wrapper'>
          <PoweredByStripe />
        </div>
        <Spacer size={2} />
      </div>
    );
  }
}

IndexPage.displayName = 'IndexPage';
IndexPage.propTypes = propTypes;

export default connect(mapStateToProps)(IndexPage);
