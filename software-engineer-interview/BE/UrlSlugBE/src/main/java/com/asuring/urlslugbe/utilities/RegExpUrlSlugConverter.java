package com.asuring.urlslugbe.utilities;

import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/**
 * Using RexExp is not the more efficient solution, but it is to small
 * and easy to adjust. So use this if time complexity is not too relevant.
 */
@Slf4j
@Component
public class RegExpUrlSlugConverter implements IUrlSlugConverter {

    @Override
    public String convertToSlug(String siteDescription) {
        long startTimestamp = System.currentTimeMillis(); // ToDo: Change this to an aspect when spring has been added

        String result = siteDescription
                // \\w = word = [a-zA-Z_0-9]
                // \\W = non word = [^\\w]
                // \\s = whitespace character = [ \\t\\n\\x0B\\f\\r]
                // \\S = non whitespace character = [^\\s]
                // [\\W&&\\S] = non word, excluding whitespace characters
                // [[\W&&\S]_] = non word, excluding whitespace characters, but including underscore

                .replaceAll("&", "and")
                .replaceAll("@", "at")
                .replaceAll("%", "percent")
                .replaceAll("[[\\W&&\\S]_]", "")
                .trim()
                .replaceAll("\\s", "-")
                .replaceAll("-+", "-")
                .toLowerCase();

        log.info(String.format("Conversion required %d milliseconds", System.currentTimeMillis() - startTimestamp)); // ToDo: Change this to an aspect when spring has been added

        return result;
    }
}
