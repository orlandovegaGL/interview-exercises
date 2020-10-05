package com.asuring.urlslugbe.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.asuring.urlslugbe.entities.UrlSlugConversion;

public interface IUrlSlugConversionRepository extends JpaRepository<UrlSlugConversion, Long> {

    UrlSlugConversion findBySlug(String slug);
}
