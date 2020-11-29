CREATE TABLE order_status (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;