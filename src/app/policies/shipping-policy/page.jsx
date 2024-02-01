import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';

const page = () => {
  return (
    <div className="w-full h-full bg-white">
      <MaxWidthWrapper
        className={
          'mx-auto pt-8 pb-20 w-full flex flex-col items-center gap-10 max-w-screen-md text-left'
        }
      >
        <div className="font-fraunces font-semibold text-2xl lg:text-2xl text-primary">
          Shipping policy
        </div>

        <div className="font-questrial text-lg text-primary w-full font-semibold">
          Domestic Shipping
        </div>

        <ul className="font-questrial text-lg text-primary">
          <li className="mb-4">
            We offer free shipping on all orders above Rs. 399. We charge a
            delivery fee of Rs. 50 on orders below Rs. 399.
          </li>
          <li className="mb-4">
            We charge a small COD fee of INR 50 on each order for Cash On
            Delivery facility.
          </li>
          <li className="mb-4">
            Most orders are generally dispatched within 24-48 hours of the order
            being received.
          </li>
          <li className="mb-4">
            The delivery service has a ETA of 2-7 days from the date of
            dispatch.
          </li>
          <li className="mb-4">
            For any shipping related queries, please reach out to us at
            team@dorjeteas.com.
          </li>
        </ul>

        <div className="font-questrial text-lg text-primary w-full font-semibold">
          International Shipping
        </div>

        <ul className="font-questrial text-lg text-primary w-full">
          <li className="mb-4">
            International shipping rates are based on actual costs and
            calculated on order size.
          </li>
          <li className="mb-4">
            We only offer One Time Purchase for international deliveries.
          </li>
        </ul>

        <div className="font-questrial text-lg text-primary">
          Deliveries might be delayed due to local festivals or local
          restrictions. Inconvenience caused is regretted.
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default page;
