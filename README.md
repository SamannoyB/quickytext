# QuickyText API Documentation
Specially built for Highseas and raspapi-ysws events on hackclub!
## Endpoints

### 1. Home Page
- **Method**: `GET`
- **URL**: [https://quickytext.samannoyb.hackclub.app/](https://quickytext.samannoyb.hackclub.app/)
- **Description**: Home Page, giving you a welcome!

### 2. Help Page
- **Method**: `GET`
- **URL**: [https://quickytext.samannoyb.hackclub.app/help](https://quickytext.samannoyb.hackclub.app/help)
- **Description**: API documentation, providing a list of all available endpoints.

### 3. Get All Posts
- **Method**: `GET`
- **URL**: [https://quickytext.samannoyb.hackclub.app/posts](https://quickytext.samannoyb.hackclub.app/posts)
- **Description**: Retrieve all posts from QuickyText in one place.

### 4. Filter Posts by Email
- **Method**: `GET`
- **URL**: [https://quickytext.samannoyb.hackclub.app/posts/[email]](https://quickytext.samannoyb.hackclub.app/posts/[email])
- **Description**: Filter posts by a specific email address.

### 5. Search Posts
- **Method**: `GET`
- **URL**: [https://quickytext.samannoyb.hackclub.app/posts/search](https://quickytext.samannoyb.hackclub.app/posts/search)
- **Description**: Search for posts using a query string.

### 6. Create a New Post
- **Method**: `POST`
- **URL**: [https://quickytext.samannoyb.hackclub.app/createpost](https://quickytext.samannoyb.hackclub.app/createpost)
- **Description**: Make a new post.
- **Required Parameters**:
  - `name`: The name of the user.
  - `email`: The email address of the user.
  - `title`: The title of the post.
  - `content`: The content of the post.

