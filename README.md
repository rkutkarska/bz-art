# Studio BZ Art - ReactJS Application
# Starting the project
1. Copy the provided **.env** file to the project root directory. This file contains the Firebase Web Application configuration variables.
2. In the root directory, run the following command to install the required dependencies:
```js
npm i
```
3. To start the application, run the following command:
```js
npm start
```
4. Navigate to this local address in any browser to preview the app:
```
http://localhost:3000
```

# Project Description
## Front end
This project is built using the ReactJs library. The CSS code is written by hand and does not use any external libraries with ready-to-use templates. The **App.css** and **reset.css** stylesheets are global. The file **App.css** stylesheet contains styles that apply to all components. The **reset.css** stylesheet is used to clear some of the browser's default formatting of HTML elements.

## Back end
The project uses the following Firebase back-end services: Authentication, Storage and Firestore Database.

### Firebase Authentication
The project uses password-based accounts authentication with emails.
* The **Administrator** account is created manually in the database. It can change the roles of users. His login credentials are:
	* username: admin@bz-art.com
 	* password: 123456
* Each guest can register in the app and gets a **User** role.
* The administrator can give the role **Moderator** to any registered user

For convenience there are currently 2 more accounts created:
* **Moderator**. His login credentials are:
	* username: moderator@bz-art.com
 	* password: 123456
* **User**. His login credentials are:
	* username: user@bz-art.com
 	* password: 123456

### Storage
The project uses file Cloud Storage on Web for items and categories images.

### Firestore Database
The database consist of the following collections:

1. **categories**;
Categories collection has categories unique Ids documents, each of them with fields:
* categoryImageUrl (type: string)
* categoryName (type: string)
* categoryName (type: timestamp)

2. **items**;
Items collection has items unique Ids documents, each of them with fields:
* categoryName (type: string)
* dateCreated (type: timestamp)
* description (type: string)
* discount (type: number)
* hasDiscount (type: boolean)
* imageUrl(type: string)
* isNew (type: boolean)
* isPinnedToHome (type: boolean)
* materialName (type: string)
* name (type: string)
* price (type: number)
* quantity (type: number)
* type (type: string)

3. **materials**;
Materials collection has materials unique Ids documents, each of them with fields:
* dateCreated (type: timestamp)
* materialName (type: string)

4. **users**;
Users collection has users unique Ids documents, each of them with fields:
* email (type: string)
* role (type: number)

5. **usersItems**.
UsersItems collection has users unique Ids documents, each of them with documents:
* users IDs
	* collection: cart
		* document: items ids
			* field: quantity (type: number)
	* collection: orders
		* document: orders ids
			* fields:
				* i : object {
					desiredQuantity (type: number),
					id (type: string),
					imageUrl (type: string),
					price: (type: number)
				}
				* dateCreated (type: timestamp)
				* totalSum (type: 52)
	* collection: favourites
 		* document: items ids

# User Roles
## Guest - public part
Guest is every unregistered user. This user has access to:
1. View the home page.
2. View all items and their information.
3. View all items by their category.
4. View all items with current promotion.
5. View the contact page.
6. Log in page.
7. Register page.

Guest does not have access to:
1. Add to cart functionality and order items.
2. Add to favourites functionality.
3. Perform CRUD operations with registered users, items, item categories and item materials.

## Moderator - private part
Moderator is a registered user with a role value of 1. When it is signed in this user can:
1. Access the admin panel from their profile to perform CRUD operations on items, item categories and item materials.
2. Access the admin panel from their profile to perform Read operations with registered users.
3. View the home page.
4. View all items and their information.
6. View all items by their category.
4. View all items with current promotion.
5. View the contact page.
7. Logout.

Moderator does not have access to:
1. Perform update and delete operations with registered users.
2. Add items to cart, read and delete them from their cart.
3. Place order.
4. Add items to favourites, read and delete them from their favourites list.

## Administrator - private part
Administrator is a registered user with a role value of 0. When it is signed in this user can:
1. Access the admin panel from their profile to perform Update operations with registered users.
2. Access the admin panel from their profile to perform Read operations with items, item categories and item materials.
3. View the home page.
4. View all items and their information.
6. View all items by their category.
4. View all items with current promotion.
5. View the contact page.
4. Logout.

Administrator does not have access to:
1. Perform create update and delete operations with items, item categories and item materials.
2. Perform Delete operations with registered users.
3. Add items to cart, read and delete them from their cart.
4. Place order.
5. Add items to favourites, read and delete them from their favourites list.

## User - private part
User is a registered user with a role value of 2. When it is signed in this user can:
1. Add items to cart, read and delete them from their cart.
2. Place order and view their order history.
3. Add items to favourites, read and delete them from their favourites list.
4. View the home page.
5. View all items and their information.
6. View the contact page.
7. Logout

User does not have access to:
1. The admin panel to Perform CRUD operations on users, items, item categories and item materials.

# Project Architecture
The project consist of the following folders:
* node_modules - exteral modules that the project depends on;
* public:
	* favicon.ico - the small icon displayed in the browser's tab bar and bookmarks.
	* index.html - the main HTML file that serves as the initial entry point for the React application. It contains the basic HTML structure and references the compiled JavaScript bundle.
* src
	* components:
		* AdminPanel - folder consisting of 11 subfolders and 30 files. It contains all the admin panel logic and components for managing and performing CRUD operations on the collections and their stylesheets. These components interact most with services for admin, categories, users, users items and materials.
		* Authentication folder consisting of the following files:
			* Login.js - this component handles user login functionalities and renders the corresponding login form. It utilizes React hooks, context, and event handlers to manage the login process and display error messages.
			* Register.js - this component handles user registration and renders the corresponding registration form. It utilizes React hooks, context, and event handlers to manage the registration process.
			* RequireAuth.js - this component handles user authentication and authorization for routes that require specific roles. It utilizes React hooks, context, and a service to manage user data and roles.
			* LoginRegister.css - stylesheet for Login and Register components.
		* Contacts - folder, which contains the Contacts component and its stylesheet. This component is used to render the contacts page with dynamic form.
		* Favourites - folder, which contains the Favourites component and its stylesheet. This component is used to render the favourite items of the user and the relevant actions with added items - remove items and move items to the cart.
		* Footer - folder, which contains the Footer component and its stylesheet. This component is used to render the footer on each page of the application.
		* Forbidden - folder, which contains the Forbidden component and its stylesheet. This component is used to render the forbidden page in case of unauthorised access by a user.
		* Header - folder consisting of 4 components. The Header component is the main component and HeaderInfo, HeaderItems and Navigation are nested within it. The Header component is used to render the whole header on each page of the application.
		* Home - folder consisting of 6 subfolders and 16 files. It contains the hero and the current promotion within it, category list, new and discounted items pinned to the home page and gurantee section and their stylesheets.
		* Items - folder, which contains 4 folders and 7 files. These components renders: items by their category in home page, the action buttons - detailes and add to cart to every item, item description detailes: price, discount, description, quantity etc. and actions like add to cart and add to favourites.
		* Modals - folder, which contains the ModalTemplate component and its stylesheet. This component is used to render error, information and confirmation messages to users.
		* NotFound - folder, which contains the NotFound component and its stylesheet. This component is used to render the page with error 404-not found in case of a non-existent path to content requested by the user.
		* Orders - folder, which contains 6 files. The components have the following functionality: placing an order, information page after successfully placing an order and listing the order history for the user.
		* ShoppingCart - folder, which contains the ShoppingCart component and its stylesheet. This component is used to render the user's shopping cart, to validate the desired quantity and render the error messages and to place an order.
		* Spinner - folder, which contains the Spinner component and its stylesheet. This component is widget that indicates that an operation is in progress. It provides feedback to users while waiting for data to load or actions to complete.
	* context
		* AuthContext.js - provides a centralized way to manage authentication data and functions. It simplifies the process for other components to access and utilize authentication-related features.
	* img - folder consisting of 8 files and 4 folders. It contains static images for the application such as: application logo, login and register cover image, 403 and 404 page error images and their Adobe Illustrator project, hero image and the vector blob images for home page Guarantee component.
	* services - folder consisting of 7 js files. Services are reusable functions that encapsulate a specific logic or functionality. They are used to fetch data, manipulate data, and manage state changes.
	* App.css - global stylesheet file.
	* App.js - entry point of a React application. It initializes the React application, defines the components to render, and handles routing between pages and imports the global stylesheets.
	* Firebase.js - initializes Firebase and provides access to the Firebase services for storage, database, and authentication, making it possible to interact with the Firebase platform from this React application.
	* index.js - App main JS file (startup script). This is a central component of a React application, responsible for bringing all the pieces together. It sets up the basic structure for a React application, uses React libraries, creates a root instance, renders the main component, and manages routing with BrowserRouter.
	* reset.css - global stylesheet file.

and files:
* .env - environment file containing the Firebase Web Application configuration variables.
* .gitignore - this file ensures that certain files not tracked by Git remain untracked.
* package-lock.json - lockfile that holds information on the dependencies or packages installed for a project.
* package.json - project configuration. Module name, dependencies, build actions.
* README.md - contains short documentation of the project.

# Future work:
* Responsive css design for mobile devices;
* Implement reset password functionality;
* Implement pagination;
* Implement send email functionality in Contacts component;
* Implement item count in cart for shopping-cart button red dot;
* Implement drag and drop functionality for uploading image;
* Implement search functionality in header section.
