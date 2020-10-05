# Asurint Software Engineer Exercise

## General Guidelines

- Quality matters more than quantity. Do not feel like this entire task needs to be completed in the allotted time.
- Feel free to consult Google if necessary. No one has all the syntax memorized, and we don’t expect you to.
- Write tests or use TDD if you are familiar with working this way.
- In-memory persistence is fine.

## Steps

1. **Generate URL slugs based on a description**

   Create a function that can generate URL-friendly "slugs" from a description of a website.

   Invalid characters should be removed, and words should be separated using a dash, e.g.

   ```
   "Aunt Millie's & Co., Inc.” -> "aunt-millies-and-co-inc"
   ```

   This function should also replace the following special characters with their English counterparts:

   - & -> and
   - @ -> at
   - % -> percent

   All other special characters should be removed. The output should never result in multiple consecutive dash separators, or dash separators at the beginning or end of the result.

2. **Create an API that creates and stores URLs and slugs of their descriptions**

   The goal of this step is to expose an endpoint through which a website's URL and a description of the website can be saved. The description should be turned into a slug using the generation function written in step 1 and stored with the URL. We will use this data in step 3 to redirect GET requests for the slug to the registered URL.

   - The API endpoint should accept both a description string (eg. “Aunt Millie's & Co., Inc.”) and the URL for the site being described (e.g. http://auntmilliescookieemporium.com) in a request.
   - The API should respond with the slug that was generated using the function built in step 1.
   - The URL and the generated slug should somehow be persisted for future use - in-memory persistence is sufficient.

3. **Add an endpoint to the service that uses the slug to redirect to the registered website**

   Enhance the previously created API to host another endpoint that redirects requests for the generated slug to the URL that was submitted with the description in Step 2.

   For example, if we first call the API with the description “Aunt Millie's & Co., Inc.” and URL http://auntmilliescookieemporium.com, and we have generated the slug “aunt-millies-and-co-inc”, then a request sent to this endpoint with "aunt-millies-and-co-inc" will redirect the user's browser to http://auntmilliescookieemporium.com.

4. **Create a UI**

   Create a web page that allows a user to enter the description and URL, call the API, and render a link on the page to the generated redirect URL.

   - Include fields for the description and URL
   - Submit the data asynchronously
   - Use the response to populate a link on the page
   - Add form validation
   - Handle error responses

5. **Dockerize it (Bonus)**

   Create a Dockerfile and run this/these service(s) in a container.

# Do you want to run the project?

This project uses docker-compose... so to launch the app, please do the following steps:

1. Ensure you have Docker and Docker Compose installed.
2. Open a terminal and go to the folder named "software-engineer-interview".
3. Execute:

```
docker-compose -d up
```

to stop it, in the same folder, execute:

```
docker-compose down
```

5. **Dockerize it (Bonus)**

   Create a Dockerfile and run this/these service(s) in a container.

   **Implementation:**

   There are two Dockerfiles, one for BE in: ./BE/Dockerfile, and the other for FE in: ./FE/Dockerfile

   There is a docker-compose file to use both Dockerfiles mentioned above.

   **Future Work:**
   
   Use a Docker Orchestrator tool.

# Do you want to work in the BE code?

The BE project is in the "BE/UrlSlugBE" subfolder, it uses Spring Boot, so...

You can run it by:

```
./mvnw spring-boot:run
```

You can execute the unit testers by:

```
./mvnw clean test
```

For more details about the BE project, please go to its [README](./BE/README.md) file.

# Do you want to work in the FE code?

The FE project is in the "FE/urlslugfe" subfolder, it uses node and npm.

The project was created with create-react-app tool, so...

You can run it by:

```
npm install

npm start
```

For more details about the FE project, please go to its [README](./FE/README.md) file.
