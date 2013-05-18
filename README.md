Forms with undefined schema
========================

A UI that will let user create a free flowing schema for his/her data and then create UI for that schema accordingly.  Additionally will use avro to ensure data conforms to the defined schema

How to run
----------

```
> tree -L 1
.
├── README.md
├── angular-seed
└── server
```

```
cd angular-seed/app
python -m SimpleHTTPServer

cd server
python avroServerForDynamicUI.py
```

open browser at http://localhost:8000

TODO 
----
- Fix the avro bit
- Add JS validations depending on the schema
- clean up the javascript code
