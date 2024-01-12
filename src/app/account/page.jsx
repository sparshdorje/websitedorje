import React from 'react';
import { cookies } from 'next/headers';
import { formatDateString, formatPrice, getServerSideUser } from '@/lib/utils';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

const page = async () => {
  const nextCookies = cookies();
  const user = await getServerSideUser(nextCookies);
  const { edges: orders } = user.orders || {};

  return (
    <MaxWidthWrapper
      className={'mx-auto pt-8 pb-52 w-full grid grid-cols-1 gap-12'}
    >
      <div
        className={'mx-auto pt-8 w-full grid-cols-1 grid lg:grid-cols-3 gap-4'}
      >
        <div>
          <div className="font-fraunces text-primary text-xl font-semibold mb-2">
            Name
          </div>
          <div className="text-questrial text-primary text-lg font-semobold">
            {user?.displayName}
          </div>
        </div>

        <div>
          <div className="font-fraunces text-primary text-xl font-semibold mb-2">
            Email
          </div>
          <div className="text-questrial text-primary text-lg font-semobold">
            {user?.email}
          </div>
        </div>

        {user?.defaultAddress && (
          <div>
            <div className="font-fraunces text-primary text-xl font-semibold mb-2">
              Default Shipping Address
            </div>
            <div className="text-questrial text-primary text-lg font-semobold">
              {user.defaultAddress.address1} <br /> {user.defaultAddress.city},
              {user.defaultAddress.country}, ({user.defaultAddress.zip}) <br />
              {user.defaultAddress.phone}
            </div>
          </div>
        )}
      </div>

      <div>
        <div className="font-fraunces text-primary text-xl font-semibold mb-6">
          Orders
        </div>
        <Table>
          {!orders ||
            (orders.length === 0 && (
              <TableCaption className="font-fraunces mt-12 font-semibold text-lg">
                No Orders Yet
              </TableCaption>
            ))}

          <TableHeader>
            <TableRow>
              <TableHead>ORDER</TableHead>
              <TableHead>DATE</TableHead>
              <TableHead>FULLFILLMENT STATUS</TableHead>
              <TableHead className="text-right">TOTAL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders.length > 1 &&
              orders.map((order) => (
                <TableRow>
                  <TableCell>
                    <Link
                      target="_blank"
                      className="font-questrial font-semibold text-base underline"
                      href={order.node.statusUrl}
                    >
                      {order.node.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <div className=" min-w-[100px]">
                      {formatDateString(order.node.processedAt)}
                    </div>
                  </TableCell>
                  <TableCell>{order.node.fulfillmentStatus}</TableCell>
                  <TableCell className="text-right">
                    {formatPrice(order.node.totalPrice.amount)}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
