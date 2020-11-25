CREATE VIEW table_order AS (
SELECT
  cuisine_order.table_id,
  cuisine_order.id AS order_id,
  cuisine_order.quantity,
  cuisine_order.staff_id,
  cuisine_order.created_at,
  menu_item.name,
  menu_item.price,
  order_status.id AS status_id,
  order_status.status
FROM
  cuisine_order
INNER JOIN
  menu_item
ON
  cuisine_order.item_id = menu_item.id
INNER JOIN
  order_status
ON
  cuisine_order.status_id = order_status.id
);
