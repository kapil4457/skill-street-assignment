# API Documentation

#### Note : Deployed on - https://skill-street-kapil-assignment.onrender.com/

#### Protected path are those paths which can be accessed only after logging-in the application.

#### Temporary account : 
     password : temp@1234
     email : temp@hotmail.com
## User endpoints :

### 1. Register User

- Request type : **_POST_**
- Endpoint : **_/api/v1/user/register_**
- Expected Requested body parameters :

```
{
    "name" : "temp",
    "password" : "temp@1234",
    "email" : "temp@hotmail.com"
}
```

- Expected Response :

```
{
    "success": true,
    "message": "User created successfully",
    "user": {
        "name": "temp",
        "email": "temp@hotmail.com",
        "password": "$2a$10$6XGa9QAR1Nin9envpwliA.H6tWEgpQIOUV9TKhPZI2BBTViOVg82G",
        "_id": "<user_id>",
        "joined": "2024-01-01T15:04:18.388Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTJkNDcyOGJhOWM5ZTdmZTlkOTM3ZiIsImlhdCI6MTcwNDEyMTQ1OSwiZXhwIjoxNzA2NzEzNDU5fQ.X6UMVz0WGSMTNKfCt7HFArUfR2zPqS0c0Ybl7axTqHo"
}
```

### 2. Login as User

- Request type : **_POST_**
- Endpoint : **_/api/v1/user/login_**
- Expected Requested body parameters :

```
{
    "name" : "temp",
    "password" : "temp@1234",
    "email" : "temp@hotmail.com"
}
```

- Expected Response :

```
{
    "success": true,
    "message": "Logged-in successfully",
    "user": {
        "_id": "<user_id>",
        "name": "temp",
        "email": "temp@hotmail.com",
        "password": "$2a$10$6XGa9QAR1Nin9envpwliA.H6tWEgpQIOUV9TKhPZI2BBTViOVg82G",
        "joined": "2024-01-01T15:04:18.388Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTJkNDcyOGJhOWM5ZTdmZTlkOTM3ZiIsImlhdCI6MTcwNDEyMTU2MywiZXhwIjoxNzA2NzEzNTYzfQ.jdylzGRhrcEdRCnu6HFDQiNoY4_InXbzY9WaWmOQdIU"
}
```

### 3. Logout as User

- It is a protected path.
- Request type : **_POST_**
- Endpoint : **_/api/v1/user/logout_**

- Expected Response :

```
{

    "success": true,
    "message": "Logged-out successfully."

}
```

## Notes endpoints :

### 1. Create Note

- It is a protected path.
- Request type : **_POST_**
- Endpoint : **_/api/v1/notes/create_**
- Expected Requested body parameters :

```
{
    "title":"temporary note",
    "description":"this is a temporary note."
}
```

- Expected Response :

```
{
    "success": true,
    "message": "Note created successfully",
    "note": {
        "title": "temporary note",
        "description": "this is a temporary note.",
        "owner": "<owner_id>",
        "_id": "<note_id>",
        "createdAt": "2024-01-01T15:11:30.873Z",
        "updatedAt": "2024-01-01T15:11:30.873Z",
        "__v": 0
    }
}
```

### 2. Update Note as Owner

- It is a protected path.
- Request type : **_PUT_**
- Endpoint : **_/api/v1/notes/update_**
- Expected Requested body parameters :

```
{
    "title":"updated note",
    "description":"This is the updated note.",
    "id" : "<note_id>"
}
```

- Expected Response :

```
{
    "success": true,
    "message": "Note updated successfully."
}
```

### 3. Get single note as owner

- It is a protected path.
- Request type : **_GET_**
- Endpoint : **_/api/v1/notes/note/<note_id>_**

- Expected Response :

```
{
    "success": true,
    "note": {
        "_id": "<note_id>",
        "title": "updated note",
        "description": "This is the updated note.",
        "owner": "<owner_id>",
        "createdAt": "2024-01-01T15:11:30.873Z",
        "updatedAt": "2024-01-01T15:13:21.685Z",
        "__v": 0
    }
}
```

### 4. Get all notes as owner

- It is a protected path.
- Request type : **_GET_**
- Endpoint : **_/api/v1/notes/all_**

- Expected Response :

```
{
    "success": true,
    "notes": [
        {
            "_id": "<note_id>",
            "title": "updated note",
            "description": "This is the updated note.",
            "owner": "<owner_id>",
            "createdAt": "2024-01-01T15:11:30.873Z",
            "updatedAt": "2024-01-01T15:13:21.685Z",
            "__v": 0
        }
    ]
}
```

### 5. Delete a note as owner

- It is a protected path.
- Request type : **_DELETE_**
- Endpoint : **_/api/v1/notes/note/<note_id>_**

- Expected Response :

```
{
    "success": true,
    "message": "Note deleted successfully."
}
```
