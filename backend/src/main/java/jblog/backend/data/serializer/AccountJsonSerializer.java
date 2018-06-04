package jblog.backend.data.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import jblog.backend.entity.Account;
import jblog.backend.entity.Article;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;

@JsonComponent
public class AccountJsonSerializer extends JsonSerializer<Account> {
    @Override
    public void serialize(Account account, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        jsonGenerator.writeStartObject();

        jsonGenerator.writeStringField("id", account.getId().toString());

        jsonGenerator.writeStringField("username", account.getUsername());

        jsonGenerator.writeStringField("email", account.getEmail());

        jsonGenerator.writeArrayFieldStart("articles");

        for (Article article : account.getArticles()) {
            jsonGenerator.writeObject(article);
        }

        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
