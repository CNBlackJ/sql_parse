# SQL语法解析

- 1、输入sql，输出AST
- 2、AST转图片

## Installation

- `$ git clone git@github.com:CNBlackJ/sql_parse.git`
- `$ cd sql_parse`
- `$ npm i`
- '$ npm run parse'

## 可替换`index.js`的`demoSQL`进行查看不同的解析结果


## DEMO

输入的SQL

```sql
SELECT * FROM CSS.INV_RECEIVE_PRODUCT  T
JOIN CSS.INV_RECEIVE T1
ON T.receive_id=T1.receive_id
JOIN CSS.inv_location T2
ON T1.location_id=T2.location_id
LEFT JOIN CSS.INV_DELIVERY T3
ON T1.ORDER_ID = T3.DELIVERY_ID 
JOIN CSS.INV_DELIVERY_DETAIL T4
ON T3.DELIVERY_ID = T4.DELIVERY_ID
WHERE T2.location_type IN ('1','2')--19638323
AND T3.DELIVERY_ID IS NULL
```

输出的AST

```json
{  
   "with":null,
   "type":"select",
   "options":null,
   "distinct":null,
   "columns":"*",
   "from":[  
      {  
         "db":"CSS",
         "table":"INV_RECEIVE_PRODUCT",
         "as":"T"
      },
      {  
         "db":"CSS",
         "table":"INV_RECEIVE",
         "as":"T1",
         "join":"INNER JOIN",
         "on":{  
            "type":"binary_expr",
            "operator":"=",
            "left":{  
               "type":"column_ref",
               "table":"T",
               "column":"receive_id"
            },
            "right":{  
               "type":"column_ref",
               "table":"T1",
               "column":"receive_id"
            }
         }
      },
      {  
         "db":"CSS",
         "table":"inv_location",
         "as":"T2",
         "join":"INNER JOIN",
         "on":{  
            "type":"binary_expr",
            "operator":"=",
            "left":{  
               "type":"column_ref",
               "table":"T1",
               "column":"location_id"
            },
            "right":{  
               "type":"column_ref",
               "table":"T2",
               "column":"location_id"
            }
         }
      },
      {  
         "db":"CSS",
         "table":"INV_DELIVERY",
         "as":"T3",
         "join":"LEFT JOIN",
         "on":{  
            "type":"binary_expr",
            "operator":"=",
            "left":{  
               "type":"column_ref",
               "table":"T1",
               "column":"ORDER_ID"
            },
            "right":{  
               "type":"column_ref",
               "table":"T3",
               "column":"DELIVERY_ID"
            }
         }
      },
      {  
         "db":"CSS",
         "table":"INV_DELIVERY_DETAIL",
         "as":"T4",
         "join":"INNER JOIN",
         "on":{  
            "type":"binary_expr",
            "operator":"=",
            "left":{  
               "type":"column_ref",
               "table":"T3",
               "column":"DELIVERY_ID"
            },
            "right":{  
               "type":"column_ref",
               "table":"T4",
               "column":"DELIVERY_ID"
            }
         }
      }
   ],
   "where":{  
      "type":"binary_expr",
      "operator":"AND",
      "left":{  
         "type":"binary_expr",
         "operator":"IN",
         "left":{  
            "type":"column_ref",
            "table":"T2",
            "column":"location_type"
         },
         "right":{  
            "type":"expr_list",
            "value":[  
               {  
                  "type":"string",
                  "value":"1"
               },
               {  
                  "type":"string",
                  "value":"2"
               }
            ]
         }
      },
      "right":{  
         "type":"binary_expr",
         "operator":"IS",
         "left":{  
            "type":"column_ref",
            "table":"T3",
            "column":"DELIVERY_ID"
         },
         "right":{  
            "type":"null",
            "value":null
         }
      }
   },
   "groupby":null,
   "having":null,
   "orderby":null,
   "limit":null
}
```

