import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <Link>
      <button className='btn btn-primary hover:bg-blue-600'>Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;