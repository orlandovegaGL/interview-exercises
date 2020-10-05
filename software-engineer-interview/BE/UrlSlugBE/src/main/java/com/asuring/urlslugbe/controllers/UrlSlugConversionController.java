package com.asuring.urlslugbe.controllers;

import java.util.Collection;
import java.util.LinkedList;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import com.asuring.urlslugbe.dtos.ConversionGetResponseElement;
import com.asuring.urlslugbe.dtos.ConversionPostRequest;
import com.asuring.urlslugbe.dtos.ConversionPostResponse;
import com.asuring.urlslugbe.entities.UrlSlugConversion;
import com.asuring.urlslugbe.exceptions.InvalidParametersException;
import com.asuring.urlslugbe.repositories.IUrlSlugConversionRepository;
import com.asuring.urlslugbe.utilities.IUrlSlugConverter;

@RestController
public class UrlSlugConversionController {

    private IUrlSlugConversionRepository urlSlugConversionRepository;

    private IUrlSlugConverter efficientUrlSlugConverter;

    public UrlSlugConversionController(
            IUrlSlugConversionRepository urlSlugConversionRepository,
            IUrlSlugConverter efficientUrlSlugConverter) {
        this.urlSlugConversionRepository = urlSlugConversionRepository;
        this.efficientUrlSlugConverter = efficientUrlSlugConverter;
    }

    @GetMapping("/urlSlugConversions")
    public Collection<ConversionGetResponseElement> findAll() {
        return urlSlugConversionRepository.findAll()
                .stream()
                .map(urlSlugConversion -> new ConversionGetResponseElement(
                        urlSlugConversion.getId(),
                        urlSlugConversion.getDescription(),
                        urlSlugConversion.getSlug()
                )).collect(Collectors.toCollection(LinkedList::new));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/urlSlugConversions")
    public ConversionPostResponse newBook(@RequestBody ConversionPostRequest conversionPostRequest) {
        String url = conversionPostRequest.getUrl();
        String description = conversionPostRequest.getDescription();

        // ToDo: Use Bean Validation instead
        if (!StringUtils.hasText(url) || !url.matches("^https?:\\/\\/[^\\s$.?#].[^\\s]*$")) {
            throw new InvalidParametersException();
        }

        if (!StringUtils.hasText(description)) {
            throw new InvalidParametersException();
        }

        String slug = efficientUrlSlugConverter.convertToSlug(description);

        UrlSlugConversion urlSlugConversion = new UrlSlugConversion();
        urlSlugConversion.setUrl(url);
        urlSlugConversion.setDescription(description);
        urlSlugConversion.setSlug(slug);
        urlSlugConversionRepository.save(urlSlugConversion);

        ConversionPostResponse conversionPostResponse = new ConversionPostResponse(
                urlSlugConversion.getId(),
                slug
        );

        return conversionPostResponse;
    }
}