package jblog.backend.controller;

import jblog.backend.entity.Account;
import jblog.backend.entity.Article;
import jblog.backend.entity.Comment;
import jblog.backend.exception.NotPermittedOperationException;
import jblog.backend.security.ApplicationUserDetails;
import jblog.backend.service.IArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@Controller
@RequestMapping(path = "/api/articles")
public class ArticleController {
    private final IArticleService articleService;

    @Autowired
    public ArticleController(IArticleService articleService) {
        this.articleService = articleService;
    }

    @RequestMapping(path = "", method = { RequestMethod.GET }, produces = { "application/json" })
    @ResponseBody
    public List<Article> getArticles() {
        return articleService.getArticles();
    }

    @RequestMapping(path = "", method = { RequestMethod.POST }, consumes = { "application/json" }, produces = { "application/json" })
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public Article createArticle(Principal principal, @RequestBody Article article) {
        ApplicationUserDetails userDetails = (ApplicationUserDetails) ((Authentication) principal).getPrincipal();

        article.setAccount(userDetails.getAccount());

        return articleService.createArticle(article);
    }

    @RequestMapping(path = "/{id}", method = { RequestMethod.GET }, produces = { "application/json" })
    @ResponseBody
    public Article getArticle(@PathVariable Long id) {
        return articleService.getArticle(id);
    }

    @RequestMapping(path = "/{id}", method = { RequestMethod.PUT }, consumes = { "application/json" }, produces = { "application/json" })
    @ResponseBody
    public Article updateArticle(Principal principal, @PathVariable Long id, @RequestBody Article newArticle) {
        ApplicationUserDetails userDetails = (ApplicationUserDetails) ((Authentication) principal).getPrincipal();

        Article oldArticle = articleService.getArticle(id);

        if (!isOwner(userDetails.getAccount(), oldArticle)) {
            throw new NotPermittedOperationException();
        }

        return articleService.updateArticle(oldArticle, newArticle);
    }

    @RequestMapping(path = "/{id}", method = { RequestMethod.DELETE }, produces = { "application/json" })
    @ResponseBody
    public ResponseEntity<?> deleteArticle(Principal principal, @PathVariable Long id) {
        ApplicationUserDetails userDetails = (ApplicationUserDetails) ((Authentication) principal).getPrincipal();

        Article article = articleService.getArticle(id);

        if (!isOwner(userDetails.getAccount(), article)) {
            throw new NotPermittedOperationException();
        }

        articleService.deleteArticle(article);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(path = "/{articleId}/comments", method = { RequestMethod.POST }, consumes = { "application/json" }, produces = { "application/json" })
    @ResponseBody
    @ResponseStatus(value = HttpStatus.CREATED)
    public Comment addComment(@PathVariable Long articleId, @RequestBody Comment comment) {
        Article article = articleService.getArticle(articleId);

        comment.setArticle(article);

        return articleService.addComment(article, comment);
    }

    @RequestMapping(path = "/{articleId}/comments/{commentId}", method = { RequestMethod.DELETE }, produces = { "application/json" })
    @ResponseBody
    public ResponseEntity<?> deleteComment(Principal principal, @PathVariable Long articleId, @PathVariable Long commentId) {
        ApplicationUserDetails userDetails = (ApplicationUserDetails) ((Authentication) principal).getPrincipal();

        Article article = articleService.getArticle(articleId);

        if (!isOwner(userDetails.getAccount(), article)) {
            throw new NotPermittedOperationException();
        }

        Comment comment = articleService.getComment(article, commentId);

        articleService.deleteComment(article, comment);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private boolean isOwner(Account account, Article article) {
        return account.getId().equals(article.getAccount().getId());
    }
}
