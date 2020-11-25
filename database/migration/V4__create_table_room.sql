CREATE TABLE room (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  capacity INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO room (id, name, capacity) VALUES (1, "1", 5);
INSERT INTO room (id, name, capacity) VALUES (2, "2", 5);
INSERT INTO room (id, name, capacity) VALUES (3, "3", 5);
INSERT INTO room (id, name, capacity) VALUES (4, "4", 2);
INSERT INTO room (id, name, capacity) VALUES (5, "5", 2);
INSERT INTO room (id, name, capacity) VALUES (6, "6", 3);
INSERT INTO room (id, name, capacity) VALUES (7, "1, 2", 10);
INSERT INTO room (id, name, capacity) VALUES (8, "2, 3", 10);
INSERT INTO room (id, name, capacity) VALUES (9, "1, 2, 3", 20);
INSERT INTO room (id, name, capacity) VALUES (10, "か", 5);
INSERT INTO room (id, name, capacity) VALUES (11, "く", 5);
INSERT INTO room (id, name, capacity) VALUES (12, "れ", 5);
INSERT INTO room (id, name, capacity) VALUES (13, "か, く", 10);
INSERT INTO room (id, name, capacity) VALUES (14, "く, れ", 10);
INSERT INTO room (id, name, capacity) VALUES (15, "か, く, れ", 20);
INSERT INTO room (id, name, capacity) VALUES (16, "カウンター", 5);
