# Table

| attribute | type | note |
| --------- | ---- | ---- |
| id | INT | |
| room_name | STRING | |
| is_ended | BOOL | |
| start_at | DATETIME | |
| orders | []Order | |

# Order
| attribute | type | note |
| --------- | ---- | ---- |
| id | INT | |
| table_id | INT | |
| staff_id | INT | |
| created_at | DATETIME|
| details | []OrderDetail | |

# OrderDetail
| attribute | type | note |
| --------- | ---- | ---- |
| id | INT | |
| order_id | INT | |
| item_name | STRING | |
| price | INT | |
| quantity | INT | |
| status | STRING | |

# Bill
| attribute | type | note |
| --------- | ---- | ---- |
| id | INT | |
| table_id | INT | |
| amount | INT | |
| is_valid | BOOL | |
| created_at | DATETIME | |
