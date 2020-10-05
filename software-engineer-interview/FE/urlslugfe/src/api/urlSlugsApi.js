export function fetchExistentUrlSlugs(successHandler, errorHandler) {
    fetch(process.env.REACT_APP_API_URI + "/urlSlugConversions")
        .then(response => response.json())
        .then(data => {
            // Verify the data
            if (Array.isArray(data) &&
                data.reduce(((isOk, element) =>
                    element.id &&
                    element.description &&
                    element.slug), true)
            ) {
                successHandler(data);
            } else {
                console.log("Unexpected response:", data);
                errorHandler("Unable to get the existent URL Slugs");
            }
        })
        .catch(error => {
            console.log(error);
            errorHandler("Unable to get the existent URL Slugs");
        });
}

export function createUrlSlugs(data, successHandler, errorHandler) {
    fetch(process.env.REACT_APP_API_URI + "/urlSlugConversions", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json"
        },
        "body": JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            // Verify the data
            if (response && response.id && response.slug) {
                successHandler(response);
            } else {
                console.log("Unexpected response:", response);
                errorHandler("Unable to create the URL Slug");
            }
        })
        .catch(error => {
            console.log(error);
            errorHandler("Unable to create the URL Slug");
        });
}