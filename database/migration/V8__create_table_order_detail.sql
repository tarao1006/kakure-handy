CREATE TABLE order_detail (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id INT UNSIGNED NOT NULL,
  item_id INT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  status_id INT UNSIGNED NOT NULL DEFAULT 1,
  FOREIGN KEY (order_id) REFERENCES cuisine_order(id),
  FOREIGN KEY (item_id) REFERENCES menu_item(id),
  FOREIGN KEY (status_id) REFERENCES order_status(id),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
