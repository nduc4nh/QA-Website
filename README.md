# QA-Website

## QA - Website
### Team

**Member**

* Nguyễn Đức Anh 20172937 [Leader]
* Bùi Hoàng Lọc 20173237
* Phạm Thanh Bình 20183693
* Phạm Văn Quốc 20183815

**Contribution**

<table>
 <tr>
  <td>
   Name
   </td>
  <td>
   tasks
   </td>
 </tr>
 <tr>
  <td>
   Nguyễn Đức Anh
   </td>
  <td>
   Frontend: HomePage, Question Page, Search Result Page; Servers: utility servers (Image server, socket) 
   </td>
 </tr>
 
 
 <tr>
  <td>
   Bùi Hoàng Lọc
   </td>
  <td>
   Frontend: Frontend-support: Admin Page, beautfying UI
   </td>
 </tr>
 
 <tr>
  <td>
   Phạm Thanh Bình
   </td>
  <td>
   Backend: Apis, Database design
   </td>
 </tr>
 
 
 <tr>
  <td>
   Phạm Văn Quốc
   </td>
  <td>
   Backend-support, tester   </td>
 </tr>
 
 </table>


**Contribution**


### Requirements

**Backend**
 
* [npm](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
* [python](https://www.python.org/)
* [pip](https://pypi.org/project/pip/)

**Frontend**

* [ReactJs](https://reactjs.org/docs/getting-started.html)



### Execution guidelines

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
