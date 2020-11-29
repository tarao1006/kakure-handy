CREATE VIEW table_order_amount AS (
SELECT
  dinner_table.id AS table_id,
  CASE
    WHEN SUM(cuisine_order.price * cuisine_order.quantity) IS NULL THEN 0
    ELSE SUM(cuisine_order.price * cuisine_order.quantity)
  END AS amount
FROM
  dinner_table
LEFT OUTER JOIN
  (
    SELECT
      cuisine_order.table_id,
      cuisine_order.quantity,
      menu_item.price
    FROM
     cuisine_order
    INNER JOIN
      menu_item
    ON
      cuisine_order.item_id = menu_item.id
    WHERE
      status_id IN (1, 2)
  ) AS cuisine_order
ON
  dinner_table.id = cuisine_order.table_id
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
  dinner_table.is_started,
  dinner_table.is_ended,
  dinner_table.start_at,
  dinner_table.end_at,
  room.id AS room_id,
  room.name AS room_name,
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
  table_bill
USING (table_id)
GROUP BY
  dinner_table.id
);
