# Project Name : Donate ease simple server (I will update this server later is this for just testing)

## live link : https://donate-simple-server.vercel.app/



## API Routes and CRUD Operations

### User Registration

- **Endpoint:** `POST /api/v1/register`
- **Description:** Register a new user.

### User Login

- **Endpoint:** `POST /api/v1/login`
- **Description:** Authenticate and log in an existing user.

### Create Data

- **Endpoint:** `POST /api/v1/create`
- **Description:** Add new data.

### Get All Data

- **Endpoint:** `GET /api/v1/data`
- **Description:** Retrieve all data.

### Get Single Data by ID

- **Endpoint:** `GET /api/v1/data/:id`
- **Description:** Retrieve a specific data item by its ID.

### Update Data by ID

- **Endpoint:** `PUT /api/v1/data/:id`
- **Description:** Update a specific data item by its ID.

### Delete Data by ID

- **Endpoint:** `DELETE /api/v1/data/:id`
- **Description:** Delete a specific data item by its ID.

### Testimonials

#### Create Testimonial

- **Endpoint:** `POST /api/v2/create`
- **Description:** Add new testimonial.

#### Get All Testimonials

- **Endpoint:** `GET /api/v2/get`
- **Description:** Retrieve all testimonials.

#### Get Single Testimonial by ID

- **Endpoint:** `GET /api/v2/get/:id`
- **Description:** Retrieve a specific testimonial by its ID.

### Gratitude Wall

#### Create Gratitude Wall Entry

- **Endpoint:** `POST /api/v3/create`
- **Description:** Add new entry to the gratitude wall.

#### Get All Gratitude Wall Entries

- **Endpoint:** `GET /api/v3/get`
- **Description:** Retrieve all entries from the gratitude wall.

### Volunteer Hub

#### Create Volunteer Entry

- **Endpoint:** `POST /api/v4/create`
- **Description:** Add new volunteer entry.

#### Get All Volunteer Entries

- **Endpoint:** `GET /api/v4/get`
- **Description:** Retrieve all volunteer entries.

## Technologies Used

- MongoDB
- Express.js
- Node.js
- bcrypt
- jwt
- cors

## How to Run

1. Clone the repository.
2. Install dependencies: `npm install`
3. Set up environment variables (check `.env.example`).
4. Run the application: `npm start`

## Contribution

Feel free to contribute to the project by opening issues or pull requests.
