CREATE VIEW order_model AS (
SELECT
  cuisine_order.id,
  cuisine_order.table_id,
  cuisine_order.staff_id,
  cuisine_order.created_at,
  order_detail_model.id AS order_detail_id,
  order_detail_model.order_id,
  order_detail_model.item_name,
  order_detail_model.price,
  order_detail_model.quantity,
  order_detail_model.status
FROM
  order_detail_model
INNER JOIN
  cuisine_order
ON
  order_detail_model.order_id = cuisine_order.id
);
