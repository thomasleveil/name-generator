name generator
==============

This project provides a web service that generates random names to identify objects among humans.


Usage:

```bash
curl http://localhost:10010/fr
{"name":"Hannibal-outré"}                                                                        

curl http://localhost:10010/docker
{"name":"naughty-minsky"}%                             
```



| endpoint                                         |  description                     |
|--------------------------------------------------|----------------------------------|
| http://127.0.0.1:10010/fr/                       | generates french names           |
| http://127.0.0.1:10010/docker/                   | generates names like Docker does |
| http://127.0.0.1:10010/swagger                   | Swagger API spec file            |


How to run
----------

    git clone http://........ name-generator
    cd name-generator
    npm install


### dev server

    npm run dev



### prod server

    npm run start


How to add data
---------------

See the [`data`](data) folder