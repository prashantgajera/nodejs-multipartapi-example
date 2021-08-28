# nodejs-multipartapi-example
This node js project shows how we can make multipart formdata rest api call to remote server using axios


## First API Call - Get json from remote api

Make a `HTTP GET` to `SERVER URL` to get a JSON like the below.

```json
{
    "id": "7276f591-48c4-ab72-d71a-a32dadca5f53",
    "nums": [
        8051,
        4778,
        4502,
        2949,
        1234
    ]
}
```

## Second API Call - Submitting Your Application With attaching some files

Make a `HTTP POST` to `SERVER URL` to submit request with some files.

The POST request is of type `multipart/form-data` and contains following parts:

### Multipart Request - First Part

calculated sum and answer parameters in this request we are getting from first API call.
The name of this part is `application` and it is of `application/json` content type. for example check...

```json
{
    "applicant": {
        "firstName": "$firstName",
        "lastName": "$lastName"
    },
    "role": "$role",
    "answer": {
        "questionId": "$questionId",
        "sum": $answer
    }
}
```

### Multipart Request - Second Part
The name of this part is `file` and its content is a pdf file you plan to upload. The content type is `appliation/octet-stream`.


### Multipart Request - Third Part
The name of this part is `source` and its content is a `.zip` archive. The content type is `appliation/octet-stream`.
