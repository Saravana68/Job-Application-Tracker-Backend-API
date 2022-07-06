## JOBS-API
<hr>
<h1> <a href="https://jobs-api-6800.herokuapp.com/#/"> API- Link </a> </h1> 
<h3> ✅ My First Backend API Project Buit Using NodeJs ExpressJs MongoDb </h3>
<h3> ✅ Can be consumed for Frontend Project like <a href="https://react-jobs-app.netlify.app/"> JobIO-React-Project </a> </h3>
<h3> ✅ Please visit above Documentation link for further details about Implementation </h3>

<br>

![image](https://user-images.githubusercontent.com/63772127/177473274-7bb78f5a-cec2-49e5-b1d9-de9c92f5ad43.png)  </br>

![image](https://user-images.githubusercontent.com/63772127/177475066-58f0bdd7-9863-4b0a-b2ec-47fd422783c1.png)


#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

