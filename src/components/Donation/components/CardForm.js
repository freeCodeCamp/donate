import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import Reaptcha from 'reaptcha';

import StripCardForm from './StripeCardForm';

const propTypes = {
  amount: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

class CardForm extends PureComponent {
  constructor(...props) {
    super(...props);

    this.state = {
      isFormValid: false,
      isCaptchaReady: false
    };

    this.captcha = null;

    this.getValidationState = this.getValidationState.bind(this);
    this.submit = this.submit.bind(this);
    this.onVerify = this.onVerify.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  onVerify = () => {
    this.props.handleSubmit();
  };

  onLoad = () => {
    this.setState({
      isCaptchaReady: true
    });
  };

  submit(e) {
    e.preventDefault();
    this.captcha.execute();
  }

  getValidationState(isFormValid) {
    this.setState(state => ({
      ...state,
      isFormValid
    }));
  }

  render() {
    const { amount } = this.props;
    const { isFormValid, isCaptchaReady } = this.state;
    return (
      <Form className='donation-form' onSubmit={this.submit}>
        <StripCardForm getValidationState={this.getValidationState} />
        <Reaptcha
          onLoad={this.onLoad}
          onVerify={this.onVerify}
          ref={e => (this.captcha = e)}
          sitekey='6LfacJkUAAAAACGSu23khz5B_Vz4KOoaPrL2H4Pr'
          size='invisible'
        />
        <Button
          block={true}
          bsSize='lg'
          bsStyle='primary'
          disabled={!isFormValid && !isCaptchaReady}
          id='confirm-donation-btn'
          type='submit'
          >
          {`Confirm your donation of $${amount} / month`}
        </Button>
      </Form>
    );
  }
}
CardForm.displayName = 'CardForm';
CardForm.propTypes = propTypes;

export default CardForm;
