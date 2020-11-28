CREATE TABLE room (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  capacity INT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO room (id, name, capacity) VALUES (1, "1", 5);
INSERT INTO room (id, name, capacity) VALUES (2, "2", 5);
INSERT INTO room (id, name, capacity) VALUES (3, "1, 2", 10);
INSERT INTO room (id, name, capacity) VALUES (4, "3", 5);
INSERT INTO room (id, name, capacity) VALUES (6, "2, 3", 10);
INSERT INTO room (id, name, capacity) VALUES (7, "1, 2, 3", 20);
INSERT INTO room (id, name, capacity) VALUES (8, "4", 2);
INSERT INTO room (id, name, capacity) VALUES (16, "5", 2);
INSERT INTO room (id, name, capacity) VALUES (32, "6", 3);
INSERT INTO room (id, name, capacity) VALUES (64, "か", 5);
INSERT INTO room (id, name, capacity) VALUES (128, "く", 5);
INSERT INTO room (id, name, capacity) VALUES (192, "か, く", 10);
INSERT INTO room (id, name, capacity) VALUES (256, "れ", 5);
INSERT INTO room (id, name, capacity) VALUES (384, "く, れ", 10);
INSERT INTO room (id, name, capacity) VALUES (448, "か, く, れ", 20);
INSERT INTO room (id, name, capacity) VALUES (512, "カウンター", 5);
