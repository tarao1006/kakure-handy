CREATE VIEW item_model AS (
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
