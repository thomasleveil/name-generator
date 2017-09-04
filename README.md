Name generator
==============

This project provides a web service that generates random names to identify objects among humans.

It provides two collections :
- fr : names and french adjectives
- docker : same names and adjectives as the Docker project

Usage:

```bash
curl http://localhost:10010/fr
{"name":"Hannibal-outré"}                                                                        

curl http://localhost:10010/docker
{"name":"naughty-minsky"}                          
```


| endpoint                                         |  description                     |
|--------------------------------------------------|----------------------------------|
| http://127.0.0.1:10010/fr/                       | generates french names           |
| http://127.0.0.1:10010/docker/                   | generates names like Docker does |
| http://127.0.0.1:10010/swagger                   | Swagger API spec file            |



Deploying with docker
---------------------

    docker run -d -p 80:10010 tomdesinto/name-generator
    
Or, if you want to build the image yourself:

    git clone https://github.com/thomasleveil/name-generator
    cd name-generator
    docker build -t name-generator .
    docker run -d -p 80:10010 name-generator

The application is listening on port `80`


Deploying with docker-compose
-----------------------------

    git clone https://github.com/thomasleveil/name-generator
    cd name-generator
    docker-compose up -d

The application is listening on port `80`



How to run
----------

    git clone https://github.com/thomasleveil/name-generator
    cd name-generator
    npm install


### dev server

    npm run dev



### prod server

    npm run start


How to add data
---------------

See the [`data`](data) folder

