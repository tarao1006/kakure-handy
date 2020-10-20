CREATE VIEW table_order AS (
SELECT
  cuisine_order.table_id,
  detail.id,
  item.name,
  item.price,
  detail.quantity,
  status.status,
  cuisine_order.staff_id,
  cuisine_order.created_at
FROM
  order_detail AS detail
INNER JOIN
  cuisine_order
ON
  detail.order_id = cuisine_order.id
INNER JOIN
  menu_item AS item
ON
  detail.item_id = item.id
INNER JOIN
  order_status AS status
ON
  detail.status_id = status.id
);
