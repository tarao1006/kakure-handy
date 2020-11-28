CREATE TABLE order_status (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  status VARCHAR(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO order_status (id, status) VALUES (1, "ordered");
INSERT INTO order_status (id, status) VALUES (2, "served");
INSERT INTO order_status (id, status) VALUES (3, "cancelled");
