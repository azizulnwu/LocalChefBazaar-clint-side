import React from 'react';
import { Link } from 'react-router';
import PageTitle from '../../Pages/PageTitle';

const PaymentCancelled = () => {
  return (
    <div>
      <PageTitle title="Dashboard | Payment Cancelled"/>
      <h1>Payment Cancelled</h1>
      <Link>
      <button className='btn btn-primary hover:bg-blue-600'>Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;