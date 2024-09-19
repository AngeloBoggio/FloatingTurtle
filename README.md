# FloatingTurtle

Built with Express.js, MongoDB, JSON Web Tokens (JWT), and bcrypt. This API handles user registration and login, providing secure authentication for various applications.

Features
User registration with password hashing
User login with JWT authentication
Secure password storage using bcrypt
Token-based authentication for protected routes

What started as a simple Authentication API for learning the in's and out's of CRUD and learning JS via ExpressJS has expanded into an API simulating the operations for an ecommerce site so currently:
- Users can register and have their passwords safely stored via hashing using bcrypt, Users can also login safely as well and have JWT provide them a token for their session
- Users have a shopping cart and support for multiple payment methods
- Product creation is functional as well with the thought of having future organization for the front-end to be able to categorize each product based on their category: Shoes, Bottoms, Tops...ETC
