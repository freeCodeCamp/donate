import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';

import StripCardForm from './StripeCardForm';

const propTypes = {
  amount: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

class CardForm extends PureComponent {
  constructor(...props) {
    super(...props);

    this.state = {
      isFormValid: false
    };

    this.getValidationState = this.getValidationState.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    this.props.handleSubmit();
  }

  getValidationState(isFormValid) {
    this.setState(state => ({
      ...state,
      isFormValid
    }));
  }

  render() {
    const { amount } = this.props;
    const { isFormValid } = this.state;
    return (
      <Form className='donation-form' onSubmit={this.submit}>
        <StripCardForm getValidationState={this.getValidationState} />
        <Button
          block={true}
          bsSize='lg'
          bsStyle='primary'
          disabled={!isFormValid}
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
