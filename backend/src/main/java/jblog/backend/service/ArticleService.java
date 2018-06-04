package jblog.backend.service;

import jblog.backend.entity.Article;
import jblog.backend.entity.Comment;
import jblog.backend.exception.ResourceNotFoundException;
import jblog.backend.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService implements IArticleService {
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public List<Article> getArticles() {
        return articleRepository.findAll();
    }

    @Override
    public Article createArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public Article getArticle(Long id) throws ResourceNotFoundException {
        return articleRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Article not found"));
    }

    @Override
    public Article updateArticle(Article oldArticle, Article newArticle) {
        oldArticle.setHeader(newArticle.getHeader());

        oldArticle.setBody(newArticle.getBody());

        oldArticle.setTag(newArticle.getTag());

        return articleRepository.save(oldArticle);
    }

    @Override
    public void deleteArticle(Article article){
        articleRepository.delete(article);
    }

    public Comment getComment(Article article, Long id) throws ResourceNotFoundException {
        return article.getComments().stream().filter(comment -> comment.getId().equals(id)).findFirst().orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
    }

    @Override
    public Comment addComment(Article article, Comment comment) {
        article.getComments().add(comment);

        articleRepository.save(article);

        return comment;
    }

    @Override
    public void deleteComment(Article article, Comment comment) {
        article.getComments().remove(comment);

        articleRepository.save(article);
    }
}
