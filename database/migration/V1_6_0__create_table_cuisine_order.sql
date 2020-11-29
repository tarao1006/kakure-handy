CREATE TABLE cuisine_order (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  staff_id INT UNSIGNED NOT NULL,
  table_id INT UNSIGNED NOT NULL,
  item_id INT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  status_id INT UNSIGNED NOT NULL DEFAULT 1,
  course_progress INT DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (staff_id) REFERENCES staff (id),
  FOREIGN KEY (table_id) REFERENCES dinner_table (id),
  FOREIGN KEY (item_id) REFERENCES menu_item(id),
  FOREIGN KEY (status_id) REFERENCES order_status(id),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
