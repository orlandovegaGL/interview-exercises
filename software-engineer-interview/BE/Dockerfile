FROM openjdk:11

COPY UrlSlugBE /opt/urlslugbe

WORKDIR /opt/urlslugbe

RUN ./mvnw clean install

CMD ./mvnw spring-boot:run
