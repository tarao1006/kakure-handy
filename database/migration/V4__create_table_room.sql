CREATE TABLE room (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO room (id, name) VALUES (1, "1");
INSERT INTO room (id, name) VALUES (2, "2");
INSERT INTO room (id, name) VALUES (3, "3");
INSERT INTO room (id, name) VALUES (4, "4");
INSERT INTO room (id, name) VALUES (5, "5");
INSERT INTO room (id, name) VALUES (6, "6");
INSERT INTO room (id, name) VALUES (7, "1, 2");
INSERT INTO room (id, name) VALUES (8, "2, 3");
INSERT INTO room (id, name) VALUES (9, "1, 2, 3");
INSERT INTO room (id, name) VALUES (10, "か");
INSERT INTO room (id, name) VALUES (11, "く");
INSERT INTO room (id, name) VALUES (12, "れ");
INSERT INTO room (id, name) VALUES (13, "か, く");
INSERT INTO room (id, name) VALUES (14, "く, れ");
INSERT INTO room (id, name) VALUES (15, "か, く, れ");
INSERT INTO room (id, name) VALUES (16, "カウンター");
