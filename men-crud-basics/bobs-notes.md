# Step by step guide to setting up a basic CRUD men app MongoDB and Express.js

- Links to resources:
<br><https://zellwk.com/blog/crud-express-mongodb/>
<br><http://mongodb.github.io/node-mongodb-native/2.0/overview/quickstart/>

- You'll need to install mongodb with brew:
<br><http://blog.troygrosfield.com/2011/03/21/installing-and-running-mongodb-on-a-mac/>

### In Termainal...

- cd to dir to create new project folder then...
<br>`$ mkdir name-of-project`
  - This will create a new directory/folder for project files


- created package.jason file
<br> `$ npm init`
	- Hit **enter** through all prompts until you get back to $ ... (or add info if you want)


- if you want a notes folder
<br>`$ touch new-text-file-for-notes.txt`

- Install dependencies
<br>`$ npm install express --save`
<br>`$ npm install body-parser --save`
<br>`$ npm install mongodb --save`
<br>`$ touch server.js`

### Off tutorial Script...
`$ mkdir public`
  <br>
  - like the idea of having the FE files under public...


`$ cd public`

`$ touch index.html`

# Where i left it !!!!
- ok, so I seem to have got the mongodb database up and running
on the localhost
- to do this start terminal run $ mongod
- let it sit waiting. THEN, open new termianla and cd to project
and node server.js
- ok looks to be working, follow here for CRUD operations inline with other tutorial: http://mongodb.github.io/node-mongodb-native/2.0/overview/quickstart/
