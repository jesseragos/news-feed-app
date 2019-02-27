import { Component } from "@angular/core";
import { NewsApiService } from "./news-api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  mArticles: Array<any>;
  mSources: Array<any>;
  mArticlesLike: Array<boolean> = [];
  currentSource: string = "";

  constructor(private newsapi: NewsApiService) {
    console.log("app component constructor called");
  }

  ngOnInit() {
    //load articles
    this.newsapi
      .initArticles()
      .subscribe(data => this.setArticles(data["articles"]));

    //load news sources
    this.newsapi
      .initSources()
      .subscribe(data => (this.mSources = data["sources"]));
  }

  searchArticles(sourceId) {
    console.log("selected sourceId is: " + sourceId);
    this.newsapi
      .getArticlesByID(sourceId)
      .subscribe(data => this.setArticles(data["articles"]));
  }

  setArticles(articles) {
    this.mArticles = articles;

    if(this.mArticles.length > 0)
      this.currentSource = this.mArticles[0]["source"]["name"];

    //set article likes to false
    this.mArticles.forEach(
      (article, index) => (this.mArticlesLike[index] = false)
    );
  }

  toggleLike(i) {
    this.mArticlesLike[i] = !this.mArticlesLike[i];
  }
}
