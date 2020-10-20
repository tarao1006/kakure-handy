USE kakure;

SET foreign_key_checks = 0;
TRUNCATE dinner_table;
TRUNCATE cuisine_order;
TRUNCATE order_detail;

INSERT INTO dinner_table (id, room_id, start_at) VALUES (1, 1, "2020-08-01 12:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (1, 1, 1, "2020-08-01 12:30:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 1, 1, 1, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 1, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (2, 1, 2, "2020-08-01 13:00:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 2, 1, 1, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 2, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (3, 1, 1, "2020-08-01 13:30:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 3, 3, 1, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 3, 4, 1, 2);
UPDATE dinner_table SET end_at = "2020-08-01 14:00:00" WHERE id = 1;
UPDATE dinner_table SET is_ended = true WHERE id = 1;


INSERT INTO dinner_table (id, room_id, start_at) VALUES (2, 2, "2020-08-02 15:20:00");
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (4, 2, 1, "2020-08-02 17:30:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 4, 1, 2, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 4, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (5, 2, 2, "2020-08-02 18:12:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 5, 1, 2, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 5, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (6, 2, 1, "2020-08-02 21:30:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 6, 3, 2, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 6, 4, 1, 2);
UPDATE dinner_table SET end_at = "2020-08-02 22:18:00" WHERE id = 2;
UPDATE dinner_table SET is_ended = true WHERE id = 2;

INSERT INTO dinner_table (id, room_id, start_at) VALUES (3, 3, "2020-08-03 21:45:00");

INSERT INTO dinner_table (id, room_id, start_at) VALUES (4, 4, "2020-08-03 22:34:00");

SET foreign_key_checks = 1;
