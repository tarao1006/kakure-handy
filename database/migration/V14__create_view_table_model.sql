CREATE VIEW table_model AS (
SELECT
  dinner_table.id,
  room.name AS room_name,
  dinner_table.is_ended,
  dinner_table.start_at
FROM
  dinner_table
INNER JOIN
  room
ON
  dinner_table.room_id = room.id
);
