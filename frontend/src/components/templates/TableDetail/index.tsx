import React, { useEffect, useState } from 'react';
import { List } from '@atoms';
import { Table, Order } from '@model';
import { AuthContext } from '@contexts';
import { OrderStatusList } from '@organisms';

interface TableDetailTemplateProps {
  table: Table;
}

export const TableDetailTemplate = ({ table }: TableDetailTemplateProps): JSX.Element => {
  const handleServed = async (id: number) => {
  }

  const handleCancel = async (id: number) => {
  }

  const handleOrdered = async (id: number) => {
  }

  return (
    <OrderStatusList
      orders={table.orders}
      handleServed={handleServed}
      handleCancel={handleCancel}
      handleOrdered={handleOrdered}
    />
  )
}
