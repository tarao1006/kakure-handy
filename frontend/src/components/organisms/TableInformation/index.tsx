import React from 'react';
import { Table, TableBody, TableCell, TableRow } from '@atoms';
import { Table as TableModel } from '@model';
import { convertTimeToHM } from '@utils';

interface TableInformationProps {
  table: TableModel;
}

export const TableInformation = ({ table }: TableInformationProps): JSX.Element => {

  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell align="center">人数</TableCell>
          <TableCell align="left">{table.personCount}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">経過時間</TableCell>
          <TableCell align="left">{convertTimeToHM(table.startAt, new Date())}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell align="center">合計</TableCell>
          <TableCell align="left">{table.amount} 円</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}