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
   ```
