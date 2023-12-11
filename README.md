# Studio BZ Art - ReactJS Application
# Starting the project
1. Copy the survey submitted .env file to the project root directory. This file contains the Firebase Web Application configuration variables.
2. In the root directory, run the following command to install the required dependencies:
```js
npm i
```
3. To run the application in development mode, run the following command:
```js
npm start
```
4. Navigate to the following address in any browser to preview the app:
```
http://localhost:3000
```

# Project Description
## Front end
This project is built using the ReactJs library. The CSS code is written by hand and does not use any external libraries with ready-to-use templates. The App.css stylesheet is global and contains styles that apply to all components. A reset.css stylesheet is used to clear some of the browser's default formatting of HTML elements.

## Back end
The project uses the following Firebase back-end services: Authentication, Storage and Firestore Database. 

### Firebase Authentication
The project uses password-based accounts authentication with emails. 

### Storage
The project uses file Cloud Storage on Web for items and categories images.

### Firestore Database
The database consist of the following collections:

1. Categories; 
Categories collection has categories unique Ids documents, each of them with fields:
	* categoryImageUrl (type: string)
	* categoryName (type: string)
	* categoryName (type: timestamp)

2. Items;
Items collection has items unique Ids documents, each of them with fields:
* categoryName (type: string)
* dateCreated (type: timestamp)
* description (type: string)
* discount (type: number)
* hasDiscount (type: boolean)
* imageUrl(type: string)
* isNew (type: boolean)
* materialName (type: string)
* name (type: string)
* price (type: number)
* quantity (type: number)
* type (type: string) 

3. Materials;
Materials collection has materials unique Ids documents, each of them with fields:
* dateCreated (type: timestamp)
* materialName (type: string)

4. Users;
Users collection has users unique Ids documents, each of them with fields:
* email (type: string)
* role (type: number)

5. UsersItems.
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
 		*document: items ids

# User Roles
## Guest - public part
Guest is every unregistered user. This user has access to:
1. View the home page.
2. View all items and their information.
3. View all items by their category.
4. View the contact page.
5. Log in page.
6. Register page.

Guest does not have access to:
1. Add to cart functionality and order items.
2. Add to favourites functionality.
3. Perform CRUD operations with registered users, items, item categories and item materials.

## Moderator - private part
Moderator is a registered user with a role value of 1. When it is signed in this user can:
1. Perform CRUD operations on items, item categories and item materials.
2. Perform Read operations with registered users.
3. View the home page.
4. View all items and their information.
5. View the contact page.
6. Logout.

Moderator does not have access to:
1. Perform update operations with registered users.
2. Add items to cart, read and delete them from its cart.
3. Place order.
4. Add items to favourites, read and delete them from its favourites list.

## Administrator - private part
Administrator is a registered user with a role value of 0. When it is signed in this user can:
1. Perform update operations with registered users.
2. Perform Read operations with items, item categories and item materials.
3. Logout.

Administrator does not have access to:
1. Perform create update and delete operations with items, item categories and item materials.
2. Add items to cart, read and delete them from its cart.
3. Place order.
4. Add items to favourites, read and delete them from its favourites list.

## User - private part
User is a registered user with a role value of 2. When it is signed in this user can:
1. Add items to cart, read and delete them from its cart.
2. Place order and view its order history.
3. Add items to favourites, read and delete them from its favourites list.
4. View the home page.
5. View all items and their information.
6. View the contact page.
7. Logout

User does not have access to:
1. The admin panel to Perform CRUD operations on users, items, item categories and item materials.


# TODO before exam date:
* Create component CurrentPromotion for the hero button
* Contacts form validation
* Responsive css design for mobile devices
* Rewrite css in module.css style sheets for the following components:
	* Header;
	* CreateCategory;
	* Categories;
	* DiscountedItems;
	* Guarantee;
	* NewItems;
	* ItemDescription.
	
# Future work:
* Implement reset password functionality;
* Implement pagination;
* Implement send email functionality in Contacts component;
* Implement item count in cart for shopping-cart button red dot;
* Implement drag and drop functionality for uploading image;
* Implement search functionality in header section.
