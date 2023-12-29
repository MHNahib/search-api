# Search API

For this project, I have created a backend REST API using Node.js with Express and MongoDB as the database. The API will allow users to search for posts based on a provided keyword. The external API used for this example is https://jsonplaceholder.typicode.com/posts.

### Technologies Used:

- Node.js
- Express.js
- MongoDB (Mongoose for ODM)
- TypeScript

### Project Description:

This project aims to create a backend REST API that enables users to search for posts based on a keyword. The API interacts with an external API to retrieve posts and matches the keyword in the title and body. Matching posts are stored in a database along with user search actions, creating a one-to-many relationship between searches and matching posts. The API also logs user IP addresses and timestamps for each request.

## Entity Relationship (ER) Diagram

![Entity Relationship (ER) Diagram Search Api](https://i.ibb.co/dkK65F5/Untitled-Diagram-drawio.png)

## Installation

To install the project please follow the following steps.

```bash
  git clone https://github.com/MHNahib/search-api.git
  cd search-api
  npm i
```

**Recommended node version: v18.17.1**

## Run Locally

Clone the project

```bash
  git clone https://github.com/MHNahib/search-api.git
```

Go to the project directory

```bash
  cd search-api
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_URI=YOUR_DB_URI`

`EXTERNAL_API=https://jsonplaceholder.typicode.com/posts`

## API Reference

#### Index

```http
  GET /
```

#### Get all posts

```http
  GET /search
```

#### Get all posts by keyword

```http
  GET /search?keyword=<keyword>
```

| Query     | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `keyword` | `string` | **Any keyword to fetch**. |

## Deployment

To deploy this project run

```bash
  npm run build
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
