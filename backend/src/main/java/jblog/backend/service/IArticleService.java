package jblog.backend.service;

import jblog.backend.entity.Article;
import jblog.backend.entity.Comment;
import jblog.backend.exception.ResourceNotFoundException;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
public interface IArticleService {
    List<Article> getArticles();

    Article createArticle(Article article);

    Article getArticle(Long id) throws ResourceNotFoundException;

    Article updateArticle(Article oldArticle, Article newArticle);

    void deleteArticle(Article article);

    Comment getComment(Article article, Long id) throws ResourceNotFoundException;

    Comment addComment(Article article, Comment comment);

    void deleteComment(Article article, Comment comment);
}
