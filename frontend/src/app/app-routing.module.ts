import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthGuard } from "./guards/auth.guard";

import { WelcomeComponent } from "./components/welcome/welcome.component";
import { RegistrationComponent } from "./components/registration/registration.component";
import { LoginComponent } from "./components/login/login.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { MainComponent } from "./components/main/main.component";
import { ArticlesComponent } from "./components/blog/articles/articles.component";
import { ArticleCreateComponent } from "./components/blog/article-create/article-create.component";
import { ArticleDetailComponent } from "./components/blog/article-detail/article-detail.component";
import { ArticleUpdateComponent } from "./components/blog/article-update/article-update.component";
import { AccountDetailComponent } from "./components/account-detail/account-detail.component";

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'articles', component: ArticlesComponent, canActivate: [AuthGuard] },
  { path: 'articles/create', component: ArticleCreateComponent, canActivate: [AuthGuard] },
  { path: 'articles/:id', component: ArticleDetailComponent, canActivate: [AuthGuard] },
  { path: 'articles/:id/update', component: ArticleUpdateComponent, canActivate: [AuthGuard] },
  { path: 'accounts/:id', component: AccountDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
