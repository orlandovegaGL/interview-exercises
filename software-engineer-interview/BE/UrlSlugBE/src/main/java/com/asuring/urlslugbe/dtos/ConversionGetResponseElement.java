package com.asuring.urlslugbe.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ConversionGetResponseElement {
    private Long id;
    private String description;
    private String slug;
}
