# URL SLUG FE Project

## Project base structure creation

This project has been created using the create-react-app tool

## Requirements

4. **Create a UI**

   Create a web page that allows a user to enter the description and URL, call the API, and render a link on the page to the generated redirect URL.

   - Include fields for the description and URL
   - Submit the data asynchronously
   - Use the response to populate a link on the page
   - Add form validation
   - Handle error responses

   **Implementation:**

   These classes are generic and reusable REACT Components. The style has not been included on purpose.

   ```
   src/components/form:
     Contains components to handle forms and even validations
   
   src/components/table:
     Contains components to display content in a table format
   
   src/containers:
     Contains specific components for this application
   
   src/api:
     Contains javascript files to asynchronously interact with the BE API
   
   .env.development, .env.development:
     Files to configure the BE API's URL. They are located in the project's root folder
   ```