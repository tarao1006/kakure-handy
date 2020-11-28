USE kakure;

SET foreign_key_checks = 0;

-- データを削除
TRUNCATE dinner_table;
TRUNCATE cuisine_order;
TRUNCATE bill;

-- 終了済みのお客さん
INSERT INTO dinner_table (id, room_id, person_count, start_at) VALUES (1, 1, 2, "2020-08-01 12:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (1, 1, 1, 27, 2, 2, "2020-08-01 12:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (2, 1, 1, 1, 1, 2, "2020-08-01 13:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (3, 1, 1, 2, 1, 2, "2020-08-01 13:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (4, 1, 2, 1, 1, 2, "2020-08-01 14:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (5, 1, 2, 2, 1, 2, "2020-08-01 14:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (6, 1, 1, 3, 1, 2, "2020-08-01 15:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (7, 1, 1, 4, 1, 2, "2020-08-01 15:00:00");
INSERT INTO bill (id, table_id, amount) VALUES (NULL, 1, 6250);
UPDATE dinner_table SET end_at = "2020-08-01 16:00:00", is_ended = true WHERE id = 1;

-- 終了済みのお客さん
INSERT INTO dinner_table (id, room_id, person_count, start_at) VALUES (2, 2, 4, "2020-08-02 15:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (8, 2, 1, 27, 4, 2, "2020-08-01 15:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (9, 2, 1, 1, 2, 2, "2020-08-02 16:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (10, 2, 1, 2, 1, 2, "2020-08-02 16:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (11, 2, 2, 1, 2, 2, "2020-08-02 17:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (12, 2, 2, 2, 1, 2, "2020-08-02 17:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (13, 2, 1, 3, 2, 2, "2020-08-02 18:00:00");
INSERT INTO cuisine_order (id, table_id, staff_id, item_id, quantity, status_id, created_at) VALUES (14, 2, 1, 4, 1, 2, "2020-08-02 18:00:00");
INSERT INTO bill (id, table_id, amount) VALUES (NULL, 2, 10100);
UPDATE dinner_table SET end_at = "2020-08-02 19:00:00", is_ended = true WHERE id = 2;

-- 来客中のお客さん
INSERT INTO dinner_table (id, room_id, person_count, start_at) VALUES (3, 3, 3, NOW());
INSERT INTO dinner_table (id, room_id, person_count, start_at) VALUES (4, 4, 2, NOW());

SET foreign_key_checks = 1;
