# QA-Website

## QA - Website

### Requirements

**Backend**
 
* [npm](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
* [python](https://www.python.org/)
* [pip](https://pypi.org/project/pip/)

**Frontend**

* [ReactJs](https://reactjs.org/docs/getting-started.html)



### Execution guidlines

* Step 1: preparing libraries for image server:
 
 ```
 # IBM cloud object storage sdk
 # Flask (just a few lines of codes :) )
 
 cd /path/to/utility_servers
 pip install -r requirements.txt

 ```
 
* Step 2: start utility servers:

*Image servers:*
 
```
cd /path/to/utility_servers/image_server
python api.py
```

*Socket servers:*


```
cd /path/to/utility_servers/socket_server
npm i
npm start
```

* Step 3: start backend and frontend servers:

```
#backend
cd /path/to/backend
npm i
npm start

#frontend
cd /path/to/frontend
npm i
npm start
```

* Note: This project hasn't been deployed yet on any platform, in order to run this locallty, please configure the `ip address` in several files listed below:

 Frontend/store/endpoints.js
 utility_servers/image-server/api.py 
