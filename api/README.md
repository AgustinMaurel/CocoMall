# COCO MALL REST API - README
#### Hey! Here you will find all the possible routes of our "Coco mall" api, next to them you will find a description of how the "JSON" should be sent together with what each data should belong to and the answer you will get from them.

#### Lets start with the different entities

# Routes:

# User

</br>


##  Create an user:  POST /user/create
###
####     How should i send it?:  
######    JSON Format                 
```javascript                        
{ 
   "id": "this is the id from auth",
   "Name": "name of the new user"
   "LastName":"lastname of the new user",
   "Mail":"email@example.com"      
}
```

####    What returns to me?
######  The object of the new User
```javascript                        
{ 
   "id": "this is the id from auth",
   "Name": "name of the new user"
   "LastName":"lastname of the new user",
   "Mail":"email@example.com"      
}
```

##   Create a lot of users:  POST /user/bulkCreate
###
####     How should i send it?:
######    JSON Format                 
```javascript                        
"PENDING"
```

####    What returns to me?: 
######  The object of the new User
```javascript                        
"PENDING"
```
###
###
###
###


##  Obtain all users:  GET /user

####     How should i send it?:
```javascript
         "A Get petition from front-end"
```

####    What returns to me?
######  An array of users objects
```javascript
[
    { 
        "id": "id of user 1",
        "Name": "name of user 1"
        "LastName":"lastname of user 1",
        "Mail":"email1@example1.com"      
    },
    { 
        "id": "id of user 2",
        "Name": "name of user 2"
        "LastName":"lastname of user 2",
        "Mail":"email2@example2.com"      
    },
    { 
        "id": "id of user ",
        "Name": "name of user 3"
        "LastName":"lastname of user 3",
        "Mail":"email3@example3.com"      
    },
]
```

#
#
#
#

##  Obtain an user by ID:  GET /user/:id

####     How should i send it?:
```javascript
         "A Get petition from front-end with the ID of the user
          by params."
```

####    What returns to me?
######  An object of the user (or an empty array if not found)
```javascript
    { 
        "id": "id of user ",
        "Name": "name of user"
        "LastName":"lastname of user",
        "Mail":"email3@example3.com"      
    }
```