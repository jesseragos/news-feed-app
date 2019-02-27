import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class NewsApiService {
  api_key = "b953186f45f34e74b89c9924c836f8f1";

  constructor(private http: HttpClient) {}

  // Get news resources to load for side menu
  initSources() {
    return this.http.get(
      `https://newsapi.org/v2/sources?language=en&apiKey=${this.api_key}`
    );
  }

  // Get initial articles from TechCrunch as first news source
  initArticles() {
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${
        this.api_key
      }`
    );
  }

  getArticlesByID(source: String) {
    return this.http.get(
      `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${
        this.api_key
      }`
    );
  }
}
