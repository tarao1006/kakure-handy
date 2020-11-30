CREATE VIEW menu_item_category_type AS (
SELECT
  menu_item.id,
  menu_item.name,
  menu_item.price,
  item_category.id AS category_id,
  item_category.name AS category_name,
  item_category_type.id AS category_type_id,
  item_category_type.name AS category_type_name
FROM
  menu_item
INNER JOIN
  item_category
ON
  menu_item.category_id = item_category.id
INNER JOIN
  item_category_type
ON
  item_category_type.id = item_category.category_type_id
);

CREATE VIEW order_model AS (
SELECT
  cuisine_order.id,
  cuisine_order.table_id,
  cuisine_order.staff_id,
  cuisine_order.quantity,
  cuisine_order.parent_order_id,
  cuisine_order.created_at,
  menu_item_category_type.id AS item_id,
  menu_item_category_type.name AS item_name,
  menu_item_category_type.price AS item_price,
  menu_item_category_type.category_id AS item_category_id,
  menu_item_category_type.category_name AS item_category_name,
  menu_item_category_type.category_type_id AS item_category_type_id,
  menu_item_category_type.category_type_name AS item_category_type_name,
  order_status.id AS status_id,
  order_status.status
FROM
  cuisine_order
INNER JOIN
  menu_item_category_type
ON
  cuisine_order.item_id = menu_item_category_type.id
INNER JOIN
  order_status
ON
  cuisine_order.status_id = order_status.id
);
