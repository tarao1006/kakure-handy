USE kakure;

SET foreign_key_checks = 0;

-- データを削除
TRUNCATE dinner_table;
TRUNCATE cuisine_order;
TRUNCATE order_detail;
TRUNCATE bill;

-- 終了済みのお客さん
INSERT INTO dinner_table (id, room_id, start_at) VALUES (1, 1, "2020-08-01 12:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (1, 1, 1, "2020-08-01 13:00:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 1, 1, 1, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 1, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (2, 1, 2, "2020-08-01 14:00:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 2, 1, 1, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 2, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (3, 1, 1, "2020-08-01 15:00:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 3, 3, 1, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 3, 4, 1, 2);
INSERT INTO bill (id, table_id, amount) VALUES (NULL, 1, 5050);
UPDATE dinner_table SET end_at = "2020-08-01 16:00:00", is_ended = true WHERE id = 1;

-- 終了済みのお客さん
INSERT INTO dinner_table (id, room_id, start_at) VALUES (2, 2, "2020-08-02 15:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (4, 2, 1, "2020-08-02 16:00:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 4, 1, 2, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 4, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (5, 2, 2, "2020-08-02 17:00:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 5, 1, 2, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 5, 2, 1, 2);
INSERT INTO cuisine_order (id, table_id, staff_id, created_at) VALUES (6, 2, 1, "2020-08-02 18:00:00");
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 6, 3, 2, 2);
INSERT INTO order_detail (id, order_id, item_id, quantity, status_id) VALUES (NULL, 6, 4, 1, 2);
INSERT INTO bill (id, table_id, amount) VALUES (NULL, 2, 7700);
UPDATE dinner_table SET end_at = "2020-08-02 19:00:00", is_ended = true WHERE id = 2;

-- 来客中のお客さん
INSERT INTO dinner_table (id, room_id, start_at) VALUES (3, 3, NOW());
INSERT INTO dinner_table (id, room_id, start_at) VALUES (4, 4, NOW());

SET foreign_key_checks = 1;
