import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  articles = [];
  constructor() {
    super();
    console.log("Hello, I am a news component.");
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    console.log("cdm");
    let url =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=2d9ed4c35701444b8a03bc76208aca2a&pagesize=12&page=1";
      this.setState({
        loading: true,
      });
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrevious = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d9ed4c35701444b8a03bc76208aca2a&pagesize=12&page=${
      this.state.page - 1
    }`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();

    window.scrollTo(0, 0);
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  handleNext = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2d9ed4c35701444b8a03bc76208aca2a&pagesize=12&page=${
      this.state.page + 1
    }`;
    this.setState({
      loading: true
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    window.scrollTo(0, 0);
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false,
    });
  };

  render() {
    console.log("render");

    return (
      <div className="container my-3">
        <h1 className="text-center mb-5">NewsMonkey - Top News Here</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-info"
            disabled={this.state.page <= 1}
            onClick={this.handlePrevious}
          >
            &larr; Previous
          </button>

          <button
            type="button"
            className="btn btn-info"
            onClick={this.handleNext}
            disabled={this.state.page + 1 > 1 + this.state.totalResults / 12}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
