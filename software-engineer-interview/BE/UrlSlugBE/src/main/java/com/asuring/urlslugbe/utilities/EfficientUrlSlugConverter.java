package com.asuring.urlslugbe.utilities;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/**
 * Using RexExp is not the more efficient solution, but it is to small
 * and easy to adjust. On the other hand, this solution is more efficient
 * but is a little bit more complex on its logic. Use this if time complexity
 * is important.
 */
@Slf4j
@Component
public class EfficientUrlSlugConverter implements IUrlSlugConverter {

    @Override
    public String convertToSlug(String siteDescription) {
        long startTimestamp = System.currentTimeMillis(); // ToDo: Change this to an aspect when spring has been added

        StringBuilder stringBuilder = new StringBuilder();
        int upperCaseASCIIDiff = 'a' - 'A';

        siteDescription.chars().forEach(character -> {
            switch(character) {
                case '&':
                    stringBuilder.append("and");
                    break;
                case '@':
                    stringBuilder.append("at");
                    break;
                case '%':
                    stringBuilder.append("percent");
                    break;
                case ' ':  // Don't break on purpose
                case '\t': // Don't break on purpose
                case '\n': // Don't break on purpose
                case '\r': // Don't break on purpose
                    // Keep just one dash
                    if (stringBuilder.length() != 0 &&
                            stringBuilder.charAt(stringBuilder.length() - 1) != '-') {
                        stringBuilder.append('-');
                    }
                    break;
                default:
                    // Ignore not letters or numbers
                    if ('a' <= character && character <= 'z' ||
                            '0' <= character && character <= '9') {
                        stringBuilder.append((char) character);
                    } else if ('A' <= character && character <= 'Z') {
                        // adding upperCaseASCIIDiff gets the lower case value
                        stringBuilder.append((char) (character + upperCaseASCIIDiff));
                    }
                    break;
            }
        });

        if (stringBuilder.lastIndexOf("-") == stringBuilder.length() - 1) {
            stringBuilder.setLength(stringBuilder.length() - 1);
        }

        log.info(String.format("Conversion required %d milliseconds", System.currentTimeMillis() - startTimestamp)); // ToDo: Change this to an aspect when spring has been added
        return stringBuilder.toString();
    }
}
