package com.asuring.urlslugbe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class UrlSlugBEApplication {

	public static void main(String[] args) {
		SpringApplication.run(UrlSlugBEApplication.class, args);
	}

	// ToDo: Change this to use a proxy in the FE server
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/*")
						.allowedOrigins("http://localhost:3000", "http://urlslugfe:5000");
			}
		};
	}
}
