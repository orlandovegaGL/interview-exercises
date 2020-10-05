package com.asuring.urlslugbe.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class UrlSlugConversion {
    @Id
    @GeneratedValue
    private Long id;
    private String url;
    private String description;
    private String slug;
}
