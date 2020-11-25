CREATE VIEW table_order_amount AS (
SELECT
  dinner_table.id AS table_id,
  CASE
    WHEN SUM(table_order.price * table_order.quantity) IS NULL THEN 0
    ELSE SUM(table_order.price * table_order.quantity)
  END AS amount
FROM
  dinner_table
LEFT OUTER JOIN
  (
    SELECT
      *
    FROM
     table_order
    WHERE
      status_id IN (1, 2)
  ) AS table_order
ON
  dinner_table.id = table_order.table_id
GROUP BY
  dinner_table.id
);

CREATE VIEW table_order_count AS (
SELECT
  dinner_table.id AS table_id,
  COUNT(table_order.order_id) AS order_count
FROM
  dinner_table
LEFT OUTER JOIN
  table_order
ON
  dinner_table.id = table_order.table_id
GROUP BY
  dinner_table.id
);

-- TODO: MAXを使わない方法を考える。
CREATE VIEW table_bill AS (
SELECT
  dinner_table.id AS table_id,
  CASE
    WHEN MAX(bill.id) is NULL THEN 0
    ELSE MAX(bill.id)
  END AS bill_id
FROM
  dinner_table
LEFT OUTER JOIN
  bill
ON
  dinner_table.id = bill.table_id
GROUP BY
  dinner_table.id
);

CREATE VIEW table_model AS (
SELECT
  dinner_table.id AS id,
  dinner_table.person_count,
  dinner_table.is_reserved,
  dinner_table.is_ended,
  dinner_table.start_at,
  dinner_table.end_at,
  room.id AS room_id,
  room.name AS room_name,
  table_order_count.order_count,
  table_order_amount.amount,
  table_bill.bill_id
FROM
  dinner_table
INNER JOIN
  room
ON
  dinner_table.room_id = room.id
INNER JOIN
  table_order_amount
ON
  dinner_table.id = table_order_amount.table_id
INNER JOIN
  table_order_count
USING (table_id)
INNER JOIN
  table_bill
USING (table_id)
GROUP BY
  dinner_table.id
);
