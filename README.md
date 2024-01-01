# API Documentation

#### Note : Deployed on - https://skill-street-kapil-assignment.onrender.com/

## User endpoints :

### 1. Register User

- Request type : **_POST_**
- Endpoint :
  *https://skill-street-kapil-assignment.onrender.com/api/v1/user/register*
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
        "_id": "6592d4728ba9c9e7fe9d937f",
        "joined": "2024-01-01T15:04:18.388Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTJkNDcyOGJhOWM5ZTdmZTlkOTM3ZiIsImlhdCI6MTcwNDEyMTQ1OSwiZXhwIjoxNzA2NzEzNDU5fQ.X6UMVz0WGSMTNKfCt7HFArUfR2zPqS0c0Ybl7axTqHo"
}
```

### 2. Login as User

- Request type : **_POST_**
- Endpoint :
  *https://skill-street-kapil-assignment.onrender.com/api/v1/user/login*
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
        "_id": "6592d4728ba9c9e7fe9d937f",
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

- Request type : **_POST_**
- Endpoint :
  *https://skill-street-kapil-assignment.onrender.com/api/v1/user/logout*

- Expected Response :

```
{
    "success": true,
    "message": "Logged-in successfully",
    "user": {
        "_id": "6592d4728ba9c9e7fe9d937f",
        "name": "temp",
        "email": "temp@hotmail.com",
        "password": "$2a$10$6XGa9QAR1Nin9envpwliA.H6tWEgpQIOUV9TKhPZI2BBTViOVg82G",
        "joined": "2024-01-01T15:04:18.388Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTJkNDcyOGJhOWM5ZTdmZTlkOTM3ZiIsImlhdCI6MTcwNDEyMTU2MywiZXhwIjoxNzA2NzEzNTYzfQ.jdylzGRhrcEdRCnu6HFDQiNoY4_InXbzY9WaWmOQdIU"
}
```
