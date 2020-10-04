package com.asuring.urlslugbe.utilities;

import java.util.*;
import java.util.stream.Collectors;

import org.junit.jupiter.api.Test;

import lombok.extern.slf4j.Slf4j;

import static org.junit.jupiter.api.Assertions.assertIterableEquals;

@Slf4j
public class UrlSlugConverterTest {

    @Test
    public void covertToSlugTest() {
        Collection<IUrlSlugConverter> iUrlSlugConverters = Arrays.asList();

        Map<String, String> testCases = new HashMap<>();
        testCases.put("Aunt Millie's & Co., Inc.", "aunt-millies-and-co-inc");
        testCases.put("& test1: testing & character a&a &", "and-test1-testing-and-character-aanda-and");
        testCases.put("@ test2: testing @ character a@a @", "at-test2-testing-at-character-aata-at");
        testCases.put("% test3: testing % character a%a %", "percent-test3-testing-percent-character-apercenta-percent");
        testCases.put("--- test4: testing --- dash characters a-a ---", "test4-testing-dash-characters-aa");
        testCases.put("   test5: testing   spaces   ", "test5-testing-spaces");
        testCases.put("\t\t\t test6: testing \t\t\t tabs a\t\t\ta \t\t\t", "test6-testing-tabs-a-a");
        testCases.put("\r\n\r\n test7: testing \r\n\r\n new lines a\n\r\n\ra \r\n\r\n", "test7-testing-new-lines-a-a");
        testCases.put("test8: TestIng UPPER CASE", "test8-testing-upper-case");
        testCases.put("`~!#$^*()_+={[}]|;:',<.>?/ test9: testing `~!#$^*()_+={[}]|;:',<.>?/ special characters a`~!#$^*()_+={[}]|;:',<.>?/a `~!#$^*()_+={[}]|;:',<.>?/", "test9-testing-special-characters-aa");
        testCases.put("\\\" test10: testing \\\" special characters a\\\"a \\\"", "test10-testing-special-characters-aa");

        StringBuilder longTextValueTest = new StringBuilder();
        StringBuilder longTextKeyTest = new StringBuilder();

        for (int i = 0; i< 1000; i++) {
            longTextKeyTest.append("Aunt Millie's & Co., Inc.");
            longTextValueTest.append("aunt-millies-and-co-inc");
        }

        testCases.put(longTextKeyTest.toString(), longTextValueTest.toString());

        iUrlSlugConverters.forEach(iUrlSlugConverter -> {
            long startTimestamp = System.currentTimeMillis();

            log.info(String.format("Testing converter %s:", iUrlSlugConverter.getClass().getName()));
            assertIterableEquals(
                    testCases.values(),
                    testCases.keySet()
                            .stream()
                            .map(key -> iUrlSlugConverter.convertToSlug(key))
                            .collect(Collectors.toCollection(LinkedList::new))
            );

            log.info(String.format("All tests with this converter required %d milliseconds", System.currentTimeMillis() - startTimestamp)); // ToDo: Change this to an aspect when spring has been added
        });
    }
}
