# Table

## `staff`

従業員

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|firebase_uid|VARCHAR|o|o|
|email|VARCHAR|||
|display_name|VARCHAR|||
|created_at|DATETIME|o||
|updated_at|DATETIME|o||

## `item_category`

メニューアイテムのカテゴリ

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|name|VARCHAR|o|o|

## `item_subcategory`

メニューアイテムのサブカテゴリ

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|*category_id*|INTEGER|o||
|name|VARCHAR|o|o|

## `menu_item`

メニューのアイテム

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|*category_id*|INTEGER|o||
|*subcategory_id*|INTEGER|o||
|name|VARVCHAR|o|o|
|price|INTEGER|o||

## `room`

部屋

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|name|VARVCHAR|o|o|

## `order_status`

注文状況

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|status|VARCHAR|o|o|

## `dinner_table`

お客さん

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|*room_id*|INTEGER|o||
|is_ended|BOOLEAN|o||
|start_at|INTEGER|o||
|end_at|INTEGER|o||

## `cuisine_order`

一度の注文。複数のメニューに対する注文がまとめられている。

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|*staff_id*|INTEGER|o||
|*table_id*|INTEGER|o||
|created_at|DATETIME|o||

## `order_detail`

注文の詳細

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|*order_id*|INTEGER|o||
|*item_id*|INTEGER|o||
|quantity|INTEGER|o||
|*status_id*|INTEGER|o||

## `bill`

会計

|name|type|NOT NULL|UNIQUE KEY|
|:-:|:-:|:-:|:-:|
|**id**|INTEGER|o||
|*table_id*|INTEGER|o||
|amount|INTEGER|o||
|is_valid|BOOLEAN|o||
|created_at|DATETIME|o||

# View

## `table_order`

テーブルごとの注文

|name|
|:-:|
|table_id|
|id|
|name|
|price|
|quantity|
|status|
|staff_id|
|created_at|

## `table_order_amount`

テーブルごとの注文総額

|name|
|:-:|
|table_id|
|amount|

## `table_order_cnt`

テーブルごとの注文数

|name|
|:-:|
|table_id|
|cnt|


## `table_information`

テーブルごとの情報

|name|
|:-:|
|table_id|
|is_ended|
|room_name|
|order_cnt|
|amount|
|start_at|
|end_at|

## `order_detail_model`

`OrderDetail` モデル用

|name|
|:-:|
|id|
|order_id|
|item_name|
|price|
|quantity|
|status|

## `order_model`

`Order` モデル用

|name|
|:-:|
|id|
|table_id|
|staff_id|
|created_at|
|order_detail_id|
|order_id|
|item_name|
|price|
|quantity|
|status|

## `table_model`

`Table` モデル用

|name|
|:-:|
|id|
|room_name|
|is_ended|
|start_at|
