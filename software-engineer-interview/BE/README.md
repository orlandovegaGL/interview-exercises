# URL SLUG BE Project

## Project base structure creation

This project has been created using the spring initalizr tool in: https://start.spring.io/

The options used where:

- Maven Project
- Java as language
- Spring Boot version: 2.3.4
- Java version: 11
- Dependencies:
  - Spring Boot DevTools
  - Lombok
  - Spring Data JPA
  - Spring Web
  - H2 Database

## Requirements

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
   
   **Implementation:**

   These classes accomplish the requirement
   
   ```
   com.asurint.urlslugbe.utilities.IUrlSlugConverter:
     The abstract logic use
   
   com.asurint.urlslugbe.utilities.UrlSlugConverterTest:
     The logic tests
   
   com.asurint.urlslugbe.utilities.EfficientUrlSlugConverter:
     Efficient option
   
   com.asurint.urlslugbe.utilities.RegExpUrlSlugConverter:
     Easy to maintain option
   ```

   **Future Work:**
   
   Add Aspect Oriented Programming to remove noise in the code.

2. **Create an API that creates and stores URLs and slugs of their descriptions**

   The goal of this step is to expose an endpoint through which a website's URL and a description of the website can be saved. The description should be turned into a slug using the generation function written in step 1 and stored with the URL. We will use this data in step 3 to redirect GET requests for the slug to the registered URL.

   - The API endpoint should accept both a description string (eg. “Aunt Millie's & Co., Inc.”) and the URL for the site being described (e.g. http://auntmilliescookieemporium.com) in a request.
   - The API should respond with the slug that was generated using the function built in step 1.
   - The URL and the generated slug should somehow be persisted for future use - in-memory persistence is sufficient.

   **Implementation:**

   These classes accomplish the requirement
   
   ```
   com.asuring.urlslugbe.entities.UrlSlugConversion:
     The persistent entity
   
   com.asuring.urlslugbe.repositories.IUrlSlugConversionRepository:
     The entity's repository
   
   com.asuring.urlslugbe.dtos.ConversionGetResponseElement:
     DTO to respond the GET request
   
   com.asuring.urlslugbe.dtos.ConversionPostResponse:
     DTO to respond the POST request
   
   com.asuring.urlslugbe.dtos.ConversionPostRequest:
     DTO to receive the information in the POST request
   
   com.asuring.urlslugbe.controllers.UrlSlugConversionController:
     Rest controller for path: /urlSlugConversions (GET|POST)
   
   com.asuring.urlslugbe.exceptions.InvalidParametersException:
     Custom exception to catch invalid parameters
   
   com.asuring.urlslugbe.exceptions.RestExceptionCatcher:
     Class to map Java Exception to REST responses
   ```
   
   **API Documentation**
   
   - Service GET /urlSlugConversions:
        - Parameter Format: None
        - Parameters: None
        - Response Format: JSON
        - Response:
        ```
        [
          {
            "id": 1,
            "description": "stored description 1"
            "slug": "stored-description-1"
          },
          {
            "id": 2,
            "description": "stored description 2"
            "slug": "stored-description-2"
          }
        ]
        ```
   - Service POST /urlSlugConversions:
        - Parameter Format: JSON
        - Parameters:
        ```
        {
          "url": "http://www.url.com",
          "description": "description to store"
        }
        ```
        - Response Format: JSON
        - Response:
        ```
        {
          "id": 1,
          "slug": "description-to-store"
        }
        ```
        - Errors:
          - HTTP 400 status if url is invalid or empty
          - HTTP 400 status if description is empty
          
   **Future Work:**
   
   Add Bean Validation

3. **Add an endpoint to the service that uses the slug to redirect to the registered website**

   Enhance the previously created API to host another endpoint that redirects requests for the generated slug to the URL that was submitted with the description in Step 2.

   For example, if we first call the API with the description “Aunt Millie's & Co., Inc.” and URL http://auntmilliescookieemporium.com, and we have generated the slug “aunt-millies-and-co-inc”, then a request sent to this endpoint with "aunt-millies-and-co-inc" will redirect the user's browser to http://auntmilliescookieemporium.com.

   **Implementation:**

   These classes accomplish the requirement
   
   ```
   com.asuring.urlslugbe.controllers.UrlSlugConversionController:
     Rest controller for path: /slugRedirect/{pathParameter}
   
   com.asuring.urlslugbe.repositories.IUrlSlugConversionRepository:
     This class has been adapt to find the URL by slug
   ```

   **API Documentation**

   - Service POST /slugRedirect/{pathParameter}:
        - Parameter Format: String inside the URL
        - Parameters: pathParameter which is the slug
        - Response Format: HTTP redirect
        - Response: Redirect to the url associated with the slug
        - Errors:
          - HTTP 400 status if the slug does not exist
