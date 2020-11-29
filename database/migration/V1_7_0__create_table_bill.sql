CREATE TABLE bill (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  table_id INT UNSIGNED NOT NULL,
  amount INT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (table_id) REFERENCES dinner_table (id),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;