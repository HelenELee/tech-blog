
  # [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

  # E-Commerce Back End

  ## Table of Contents
 - [Description](#description)
 - [Installation](#installation)
 - [Usage](#usage)
 - [License](#license)
 - [Test Instructions](#test-instructions)
 - [Credits](#credits)
 - [Questions](#questions)
  
  ## Description
  This is a Tech Blog application where developers can publish their blog posts and comment on other developers’ posts as well. Its is a full stack application with the front end developed using Handlebars, routing done using Express.js and Node.js and the backend uses Sequelize to interact with MySQL where the data is stored.

  Users can create an account and login and their session details are stored utilising the "express-session" package. Returning users will be authenticated against their username and password. Passwords are encrypted using bcrypt.

  The application follows the Model View Controller pattern. The Controller contains routes for the API and routes to render the content using Handlebars. The Views holds the Handlebar files for rendering and The Model being an abstraction that represents the table in the mysql database holds the files that define the data.

  Logged in users can create, read, update and delete Blog posts, as well as comment on existing Blog posts. User are autmatically logged out after a set time.
  
  The application is developed using the following technologies:
  - javascript
  - node.js
  - Sequelize
  - MySQL2
  - Express.js
  - dotenv package
  - Handlebars

  The main challenge in developing this application was getting all the routes developed correctly and in the correct files using the MVC pattern. 


  ## Installation
  Ensure node is installed. Test by running 
  ```
  node -v
  ```

  To install this package run:
  ```
  npm install
  ```

  ## Usage
  To run this application ensure you are in the main tech-blog directory. 
  
  The database has been seeded already but to reseed run :
```
npm run seed
```

  To start the server run:
```
npm start
```
You should see the server startup message:

![Here is a screenshot showing the server started.](./images/server_start.png)

Once the server is running you can open your browser and enter:
```
http://localhost:3001/

```

You will be presented with the Home Page:

To setup a login, click the "Login" link and then choose "Sign up instead". Enter your details and click "Submit".

Once logged in you can open any Blog and you will see the details of the Blog plus any existing comments. You can add comments here too.

To create, update or delete one of you own Blog posts, select the "Dashboard" link. You will be presented with a list of your Blogs. Click one to update to delete it.

To create a new Blog post select the "New Post" option at the end of the "Dashboard" page.

When you are finished, click "Logout" to logout.

Below are some samples:

![Here is a screenshot listing all products.](./images/get_products.png)


![Here is a screenshot posting a product.](./images/post_product.png)


![Here is a screenshot listing one category.](./images/get_one_category.png)


![Here is a screenshot updating a tag.](./images/put_tag.png)


  ## License
  This project is covered by the "The MIT License" license.
  For more details click on the link below:
  [License](https://opensource.org/licenses/MIT)
  
  
  ## Test Instructions
  The application can be tested using an API client such as Insomnia. The api is outlined in usage above. Please check models/Category.js, models/Product.js and models/ProductTag.js to see the expected fields for each model.


  ## Credits
  I would like to thank the instructors at UWA Bootcamp. 
  
  ## Questions
 If you have any questions or feedback please contact me. My details are below. As this is a learning challenge for me I would appreciate any feedback, or ideas for improvement.

 Github : https://github.com/HelenELee 

 Email : helenelee3@outlook.com
  
