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

# Project Architecture
<!-- TODO -->
The project consist of the following folders:
* node_modules - exteral modules that the project depends on;
* public:
	* favicon.ico - the small icon displayed in the browser's tab bar and bookmarks.
	* index.html - the main HTML file that serves as the initial entry point for the React application. It contains the basic HTML structure and references the compiled JavaScript bundle.
* src
	* components:
		* AdminPanel - folder consisting of 11 subfolders and 30 files. It contains all the admin panel logic and components for managing and performing CRUD operations on the collections.
		* Contacts - folder containing the Contacts component and its stylesheet. This component is used to render the contacts page.
		* Favourites - folder containing the Favourites component and its stylesheet. This component is used to render the favourites page.
		* Footer - folder containing the Footer component and its stylesheet. This component is used to render the footer on each page of the application.
		* Forbidden - folder containing the Forbidden component and its stylesheet. This component is used to render the forbidden page in case of unauthorised access by a user.
		* Header - folder consisting of 4 components. The Header component is the main component and HeaderInfo, HeaderItems and Navigation are nested within it. The Header component is used to render the whole header on each page of the application.
		* Home - folder consisting of 5 subfolders and 15 files. It contains the hero and the current promotion within it, category list, new and discounted items pinned to the home page.
		* Items -
		* Login -
		* Modals - folder containing the ModalTemplate component and its stylesheet. This component is used to render error, information and confirmation messages to users.
		* NotFound - folder containing the NotFound component and its stylesheet. This component is used to render the page with error 404-not found in case of a non-existent path to content requested by the user.
		* Orders -
		* Register -
		* RequireAuth -
		* ShoppingCart -
		* Spinner - folder containing the Spinner component and its stylesheet. This component is widget that indicates that an operation is in progress. It provides feedback to users while waiting for data to load or actions to complete.
	* context
		* AuthContext.js
	* img
	* services - folder consisting of 7 js files. Services are reusable functions that encapsulate a specific logic or functionality. They are used to fetch data, manipulate data, and manage state changes.
	* App.css - global stylesheet file.
	* App.js
	* Firebase.js
	* index.js
	* reset.css - global stylesheet file.

and files:
* .env - environment file containing the Firebase Web Application configuration variables.
* .gitignore - this file ensures that certain files not tracked by Git remain untracked.
* package-lock.json - lockfile that holds information on the dependencies or packages installed for a project.
* package.json - contains modules listed as dependencies to install.
* README.md - contains this short documentation of the project.

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

# TODO before exam date:
* Responsive css design for mobile devices
* Rewrite css in module.css style sheets for the following components:
	* Header;
	* CreateCategory;
	* Categories;
	* DiscountedItems;
	* Guarantee;
	* NewItems.

# Future work:
* Implement reset password functionality;
* Implement pagination;
* Implement send email functionality in Contacts component;
* Implement item count in cart for shopping-cart button red dot;
* Implement drag and drop functionality for uploading image;
* Implement search functionality in header section.
