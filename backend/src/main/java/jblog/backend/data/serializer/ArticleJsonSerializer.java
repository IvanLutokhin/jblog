package jblog.backend.data.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import jblog.backend.entity.Account;
import jblog.backend.entity.Article;
import jblog.backend.entity.Comment;
import org.springframework.boot.jackson.JsonComponent;

import java.io.IOException;

@JsonComponent
public class ArticleJsonSerializer extends JsonSerializer<Article> {
    @Override
    public void serialize(Article article, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
        Account account = article.getAccount();

        jsonGenerator.writeStartObject();

        jsonGenerator.writeStringField("id", article.getId().toString());

        jsonGenerator.writeStringField("header", article.getHeader());

        jsonGenerator.writeStringField("body", article.getBody());

        jsonGenerator.writeStringField("tag", article.getTag());

        jsonGenerator.writeObjectFieldStart("account");

        jsonGenerator.writeStringField("id", account.getId().toString());

        jsonGenerator.writeStringField("username", account.getUsername());

        jsonGenerator.writeStringField("email", account.getEmail());

        jsonGenerator.writeEndObject();

        jsonGenerator.writeArrayFieldStart("comments");

        for (Comment comment : article.getComments()) {
            jsonGenerator.writeObject(comment);
        }

        jsonGenerator.writeEndArray();

        jsonGenerator.writeEndObject();
    }
}
