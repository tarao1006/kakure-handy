# Table

## POST /table
### Summary
Create new table.

### Request

<details>

```json
{
  "room_id": 1
}
```

</details>

### Response

<details>

```json
{
    "id": 5,
    "room_name": "Sun",
    "is_ended": false,
    "start_at": "2020-09-13T20:25:25+09:00",
    "orders": []
}
```

</details>

| status code | note |
| --- | --- |
| 201 | |

## GET /table
### Summary
Get all tables information.

### Response

<details>

```json
[
    {
        "id": 1,
        "room_name": "Sun",
        "is_ended": true,
        "start_at": "2020-08-01T12:00:00+09:00",
        "orders": [
            {
                "id": 1,
                "table_id": 1,
                "staff_id": 1,
                "created_at": "2020-08-01T12:30:00+09:00",
                "details": [
                    {
                        "id": 1,
                        "order_id": 1,
                        "item_name": "Maguro",
                        "price": 1000,
                        "quantity": 1,
                        "status": "cancelled"
                    },
                    {
                        "id": 2,
                        "order_id": 1,
                        "item_name": "Ikura",
                        "price": 890,
                        "quantity": 1,
                        "status": "served"
                    }
                ]
            },
            {
                "id": 2,
                "table_id": 1,
                "staff_id": 2,
                "created_at": "2020-08-01T13:00:00+09:00",
                "details": [
                    {
                        "id": 3,
                        "order_id": 2,
                        "item_name": "Maguro",
                        "price": 1000,
                        "quantity": 1,
                        "status": "served"
                    },
                    {
                        "id": 4,
                        "order_id": 2,
                        "item_name": "Ikura",
                        "price": 890,
                        "quantity": 1,
                        "status": "served"
                    }
                ]
            },
            {
                "id": 3,
                "table_id": 1,
                "staff_id": 1,
                "created_at": "2020-08-01T13:30:00+09:00",
                "details": [
                    {
                        "id": 5,
                        "order_id": 3,
                        "item_name": "Ika",
                        "price": 450,
                        "quantity": 1,
                        "status": "served"
                    },
                    {
                        "id": 6,
                        "order_id": 3,
                        "item_name": "Tako",
                        "price": 300,
                        "quantity": 1,
                        "status": "served"
                    }
                ]
            },
            {
                "id": 7,
                "table_id": 1,
                "staff_id": 1,
                "created_at": "2020-09-13T20:21:40+09:00",
                "details": [
                    {
                        "id": 13,
                        "order_id": 7,
                        "item_name": "Maguro",
                        "price": 1000,
                        "quantity": 1,
                        "status": "ordered"
                    },
                    {
                        "id": 14,
                        "order_id": 7,
                        "item_name": "Ikura",
                        "price": 890,
                        "quantity": 5,
                        "status": "ordered"
                    },
                    {
                        "id": 15,
                        "order_id": 7,
                        "item_name": "Tako",
                        "price": 300,
                        "quantity": 18,
                        "status": "ordered"
                    }
                ]
            }
        ]
    },
    {
        "id": 2,
        "room_name": "Mercury",
        "is_ended": true,
        "start_at": "2020-08-02T15:20:00+09:00",
        "orders": [
            {
                "id": 4,
                "table_id": 2,
                "staff_id": 1,
                "created_at": "2020-08-02T17:30:00+09:00",
                "details": [
                    {
                        "id": 7,
                        "order_id": 4,
                        "item_name": "Maguro",
                        "price": 1000,
                        "quantity": 2,
                        "status": "served"
                    },
                    {
                        "id": 8,
                        "order_id": 4,
                        "item_name": "Ikura",
                        "price": 890,
                        "quantity": 1,
                        "status": "served"
                    }
                ]
            },
            {
                "id": 5,
                "table_id": 2,
                "staff_id": 2,
                "created_at": "2020-08-02T18:12:00+09:00",
                "details": [
                    {
                        "id": 9,
                        "order_id": 5,
                        "item_name": "Maguro",
                        "price": 1000,
                        "quantity": 2,
                        "status": "served"
                    },
                    {
                        "id": 10,
                        "order_id": 5,
                        "item_name": "Ikura",
                        "price": 890,
                        "quantity": 1,
                        "status": "served"
                    }
                ]
            },
            {
                "id": 6,
                "table_id": 2,
                "staff_id": 1,
                "created_at": "2020-08-02T21:30:00+09:00",
                "details": [
                    {
                        "id": 11,
                        "order_id": 6,
                        "item_name": "Ika",
                        "price": 450,
                        "quantity": 2,
                        "status": "served"
                    },
                    {
                        "id": 12,
                        "order_id": 6,
                        "item_name": "Tako",
                        "price": 300,
                        "quantity": 1,
                        "status": "served"
                    }
                ]
            }
        ]
    },
    {
        "id": 3,
        "room_name": "Venus",
        "is_ended": false,
        "start_at": "2020-08-03T21:45:00+09:00",
        "orders": []
    },
    {
        "id": 4,
        "room_name": "Earth",
        "is_ended": false,
        "start_at": "2020-08-03T22:34:00+09:00",
        "orders": []
    },
    {
        "id": 5,
        "room_name": "Sun",
        "is_ended": false,
        "start_at": "2020-09-13T20:25:25+09:00",
        "orders": []
    }
]
```

</details>

| status code | note |
| --- | --- |
| 200 | |

## GET /table/:id
### Summary
Get table information.

### Response

<details>

```json
{
    "id": 1,
    "room_name": "Sun",
    "is_ended": true,
    "start_at": "2020-08-01T12:00:00+09:00",
    "orders": [
        {
            "id": 1,
            "table_id": 1,
            "staff_id": 1,
            "created_at": "2020-08-01T12:30:00+09:00",
            "details": [
                {
                    "id": 1,
                    "order_id": 1,
                    "item_name": "Maguro",
                    "price": 1000,
                    "quantity": 1,
                    "status": "cancelled"
                },
                {
                    "id": 2,
                    "order_id": 1,
                    "item_name": "Ikura",
                    "price": 890,
                    "quantity": 1,
                    "status": "served"
                }
            ]
        },
        {
            "id": 2,
            "table_id": 1,
            "staff_id": 2,
            "created_at": "2020-08-01T13:00:00+09:00",
            "details": [
                {
                    "id": 3,
                    "order_id": 2,
                    "item_name": "Maguro",
                    "price": 1000,
                    "quantity": 1,
                    "status": "served"
                },
                {
                    "id": 4,
                    "order_id": 2,
                    "item_name": "Ikura",
                    "price": 890,
                    "quantity": 1,
                    "status": "served"
                }
            ]
        },
        {
            "id": 3,
            "table_id": 1,
            "staff_id": 1,
            "created_at": "2020-08-01T13:30:00+09:00",
            "details": [
                {
                    "id": 5,
                    "order_id": 3,
                    "item_name": "Ika",
                    "price": 450,
                    "quantity": 1,
                    "status": "served"
                },
                {
                    "id": 6,
                    "order_id": 3,
                    "item_name": "Tako",
                    "price": 300,
                    "quantity": 1,
                    "status": "served"
                }
            ]
        },
        {
            "id": 7,
            "table_id": 1,
            "staff_id": 1,
            "created_at": "2020-09-13T20:21:40+09:00",
            "details": [
                {
                    "id": 13,
                    "order_id": 7,
                    "item_name": "Maguro",
                    "price": 1000,
                    "quantity": 1,
                    "status": "ordered"
                },
                {
                    "id": 14,
                    "order_id": 7,
                    "item_name": "Ikura",
                    "price": 890,
                    "quantity": 5,
                    "status": "ordered"
                },
                {
                    "id": 15,
                    "order_id": 7,
                    "item_name": "Tako",
                    "price": 300,
                    "quantity": 18,
                    "status": "ordered"
                }
            ]
        }
    ]
}
```

</details>

| status code | note |
| --- | --- |
| 200 | |

## POST /table/:id/order
### Summary
Create new order.

### Request

<details>

```json
{
  "details": [
    {
      "item_id": 1,
      "quantity": 5
    },
    {
      "item_id": 2,
      "quantity": 2
    }
  ]
}
```

</details>

### Response
<details>

```json
{
    "id": 8,
    "table_id": 1,
    "staff_id": 1,
    "created_at": "2020-09-13T20:26:16+09:00",
    "details": [
        {
            "id": 16,
            "order_id": 8,
            "item_name": "Maguro",
            "price": 1000,
            "quantity": 1,
            "status": "ordered"
        },
        {
            "id": 17,
            "order_id": 8,
            "item_name": "Ikura",
            "price": 890,
            "quantity": 5,
            "status": "ordered"
        },
        {
            "id": 18,
            "order_id": 8,
            "item_name": "Tako",
            "price": 300,
            "quantity": 18,
            "status": "ordered"
        }
    ]
}
```

</details>

| status code | note |
| --- | --- |
| 201 | |


## PATCH /table/:table_id/order/:order_detail_id
### Summary
Change order status.

### Request

<details>

```json
{
  "status": "served"
  "status_id": 2
}
```

</details>

### Response

<details>

```json
{
    "id": 1,
    "order_id": 1,
    "item_name": "Maguro",
    "price": 1000,
    "quantity": 1,
    "status": "served"
}
```

</details>

| status code | note |
| --- | --- |
| 204 | |

## POST table/:id/bill
### Summary
Create new bill.

### Request
Empty.

### Response
<details>

```json
{
    "id": 2,
    "table_id": 1,
    "amount": 26230,
    "is_valid": true,
    "created_at": "2020-09-13T20:27:17+09:00"
}
```

</details>

| status code | note |
| --- | --- |
| 201 | |

## GET table/:id/bill
### Summary
Get bill information.

### Response
<details>

```json
{
    "id": 2,
    "table_id": 1,
    "amount": 26230,
    "is_valid": true,
    "created_at": "2020-09-13T20:27:17+09:00"
}
```

</details>

| status code | note |
| --- | --- |
| 200 | |

## DELETE table/:id/bill/:bill_id
### Summary
Delete bill.

### Response
<details>

```json
{}
```

</details>

| status code | note |
| --- | --- |
| 200 | |

## PUT table/:id/end
### Summary
End dinner table.

### Request
Empty.

### Response
<details>
<summary>200</summary>

```json
{
    "id": 1,
    "room_name": "Sun",
    "is_ended": true,
    "start_at": "2020-08-01T12:00:00+09:00",
    "orders": [
        {
            "id": 1,
            "table_id": 1,
            "staff_id": 1,
            "created_at": "2020-08-01T12:30:00+09:00",
            "details": [
                {
                    "id": 1,
                    "order_id": 1,
                    "item_name": "Maguro",
                    "price": 1000,
                    "quantity": 1,
                    "status": "cancelled"
                },
                {
                    "id": 2,
                    "order_id": 1,
                    "item_name": "Ikura",
                    "price": 890,
                    "quantity": 1,
                    "status": "served"
                }
            ]
        },
        {
            "id": 2,
            "table_id": 1,
            "staff_id": 2,
            "created_at": "2020-08-01T13:00:00+09:00",
            "details": [
                {
                    "id": 3,
                    "order_id": 2,
                    "item_name": "Maguro",
                    "price": 1000,
                    "quantity": 1,
                    "status": "served"
                },
                {
                    "id": 4,
                    "order_id": 2,
                    "item_name": "Ikura",
                    "price": 890,
                    "quantity": 1,
                    "status": "served"
                }
            ]
        },
        {
            "id": 3,
            "table_id": 1,
            "staff_id": 1,
            "created_at": "2020-08-01T13:30:00+09:00",
            "details": [
                {
                    "id": 5,
                    "order_id": 3,
                    "item_name": "Ika",
                    "price": 450,
                    "quantity": 1,
                    "status": "served"
                },
                {
                    "id": 6,
                    "order_id": 3,
                    "item_name": "Tako",
                    "price": 300,
                    "quantity": 1,
                    "status": "served"
                }
            ]
        },
        {
            "id": 7,
            "table_id": 1,
            "staff_id": 1,
            "created_at": "2020-09-13T20:21:40+09:00",
            "details": [
                {
                    "id": 13,
                    "order_id": 7,
                    "item_name": "Maguro",
                    "price": 1000,
                    "quantity": 1,
                    "status": "ordered"
                },
                {
                    "id": 14,
                    "order_id": 7,
                    "item_name": "Ikura",
                    "price": 890,
                    "quantity": 5,
                    "status": "ordered"
                },
                {
                    "id": 15,
                    "order_id": 7,
                    "item_name": "Tako",
                    "price": 300,
                    "quantity": 18,
                    "status": "ordered"
                }
            ]
        },
        {
            "id": 8,
            "table_id": 1,
            "staff_id": 1,
            "created_at": "2020-09-13T20:26:16+09:00",
            "details": [
                {
                    "id": 16,
                    "order_id": 8,
                    "item_name": "Maguro",
                    "price": 1000,
                    "quantity": 1,
                    "status": "ordered"
                },
                {
                    "id": 17,
                    "order_id": 8,
                    "item_name": "Ikura",
                    "price": 890,
                    "quantity": 5,
                    "status": "ordered"
                },
                {
                    "id": 18,
                    "order_id": 8,
                    "item_name": "Tako",
                    "price": 300,
                    "quantity": 18,
                    "status": "ordered"
                }
            ]
        }
    ]
}
```
</details>


<details>
<summary>400</summary>

```json
{
    "status": 400,
    "message": "this table have already ended, id: 1"
}
```

</details>

| status code | note |
| --- | --- |
| 200 | |
| 400 | if table have been ended already |
