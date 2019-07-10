const { Parser } = require('flora-sql-parser')
const parser = new Parser()

const demoSQL = `
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
`

const ast = parser.parse(demoSQL)

console.log(JSON.stringify(ast))