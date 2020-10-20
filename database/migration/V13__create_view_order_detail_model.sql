CREATE VIEW order_detail_model AS (
SELECT
  order_detail.id,
  order_detail.order_id,
  menu_item.name AS item_name,
  menu_item.price,
  order_detail.quantity,
  order_status.status
FROM
  order_detail
INNER JOIN
  menu_item
ON
  order_detail.item_id = menu_item.id
INNER JOIN
  order_status
ON
  order_detail.status_id = order_status.id
);
