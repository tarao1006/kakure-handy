## `staff`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
firebase_uid | VARCHAR | o | o |
email | VARCHAR |||
display_name | VARCHAR |||
created_at | DATETIME | o ||
updated_at | DATETIME | o ||

## `menu_item`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
name | VARVCHAR | o | o |
price | INTEGER | o | |

## `room`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
name | VARVCHAR | o | o |

## `cuisine_order_status`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
status | VARCHAR | o | o |

## `dinner`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
*room_id* | INTEGER | o | |
start_at | INTEGER | o | |
end_at | INTEGER | | |

## `cuisine_order`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
*staff_id* | INTEGER | o | |
*dinner_id* | INTEGER | o | |
created_at | DATETIME | o | |

## `cuisine_order_detail`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
*cuisine_order_id* | INTEGER | o | |
*menu_item_id* | INTEGER | o | |
quantity | INTEGER | o | |
*cuisine_order_status_id* | INTEGER | o | |

## `bill`

name | type | NOT NULL | UNIQUE KEY |
-- | -- | -- | -- |
**id** | INTEGER | o ||
*dinner_id* | INTEGER | o | |
amount | INTEGER | o | |
created_at | DATETIME | o | |
