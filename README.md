# Shop final project
This Client and Server project, is my final project while studying **Full-Stack Development** in John Bryce college,<br>
The project is simulating a store website and server.

## Front-End
The front-end was built using react, i tried to work on it with a more professional approach, like building multiple components and using custom Hooks.
### components
- a custom button with multiple states (disabled, loading, active) each with animation.
- input one component that takes a label and an error string with checkError function and design for all.
- a cartItem that takes a product id and places a the amount in cart and the price and adds a button to remove from cart.
- a product card for universal look and function for each product.

**and many more...**

### Hooks
- useFetch a hook that fetches on parent load or by using the returned request functions, it returns data, loading and error and refreshes parent on value change.
- useCart handel's all cart interactions with redux
- useUser handles all user interactions with redux

**and a few more...**

### .env 
the server URL is saved in a `.env` file under the name `REACT_APP_API_URL` for easier editing.
## Back-End
a restful API that connects to mongoDB and handles all requests from front-end.<br>
built using express and mongoose packages.
### .env
the database URL is saved in a `.env` file under the name `DATA_BASE` in order to keep it a secret and for easy editing in the future, the same for the `PORT` number.
## installation and usage
### installation
1. clone the repository `https://github.com/yosef406/shop_final_project.git`
2. save in a specific folder
3. open the folder in `Visual Studio Code`
### usage
**back-end**
1. open the installation folder in terminal 
2. `cd ./server`
3. `npm i` to install packages
4. `npm run start` 

<br>

**front-end**

1. open the installation folder in terminal 
2. `cd ./client`
3. `npm i` to install packages
4. `npm run start` 
