package com.asuring.urlslugbe.controllers;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.asuring.urlslugbe.entities.UrlSlugConversion;
import com.asuring.urlslugbe.exceptions.InvalidParametersException;
import com.asuring.urlslugbe.repositories.IUrlSlugConversionRepository;

@RestController
public class SlugRedirectController{

    private IUrlSlugConversionRepository urlSlugConversionRepository;

    public SlugRedirectController(
            IUrlSlugConversionRepository urlSlugConversionRepository) {
        this.urlSlugConversionRepository = urlSlugConversionRepository;
    }

    @RequestMapping("/slugRedirect/{slug}")
    public RedirectView slugRedirect(@PathVariable("slug") String slug) {
        System.out.println(slug);
        UrlSlugConversion urlSlugConversion = urlSlugConversionRepository.findBySlug(slug);

        if (urlSlugConversion == null) {
            throw new InvalidParametersException();
        }

        return new RedirectView(urlSlugConversion.getUrl());
    }
}