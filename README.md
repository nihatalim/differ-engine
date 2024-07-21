# differ-engine


```
POST /differ/execute
{
    "operationId": "d6a7b123-4567-89ab-cdef-0123456789ab",
    "templates": {
        "left": {
            "id": 1,
            "url": "https://jsonplaceholder.typicode.com/todos/4",
            "method": "GET",
            "headers": {
                "correlationid": "test"
            }
        },
        "right": {
            "id": 2,
            "url": "https://jsonplaceholder.typicode.com/todos/5",
            "method": "GET",
            "headers": {
                "correlationid": "test"
            }
        }
    }
}
```
