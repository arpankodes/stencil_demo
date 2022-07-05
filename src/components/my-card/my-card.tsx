import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'my-card',
  styleUrl: 'my-card.css',
  shadow: true, // its used so that the css of the component does not overwrite styling of other (parent) components
  // scoped: true,  while used scoped as true stencil automatically configures the css of the component and add
})
export class MyCard {
  @Prop({ mutable: true }) userName: string;
  // @Prop usually defined for getting data from outside the component,
  // if needed from the inside of component use mutable as true

  @State() APIData: string = 'Loading data ...';
  // not recommended, to be used only when component needs to rerender

  @State() showAngular: boolean = false;
  @State() showReact: boolean = false;

  @State() angularUsers: string;
  @State() reactUsers: string;

  onContentChange(content) {
    if (content == 'angularTab') {
      this.showAngular = true;
      this.showReact = false;
    } else if (content == 'reactTab') {
      this.showAngular = false;
      this.showReact = true;
    } else {
      this.showAngular = false;
      this.showReact = false;
    }
  }

  changeName(event: Event) {
    this.userName = (event.target as HTMLInputElement).value; // as we do not have value already, we have to do casting
  }

  // componentWillRender() { // to prove component will render when variable is defined with state decorator
  //     console.log('componentWillRender');
  // }

  angularAPI() {
    this.angularUsers = 'Loading data ...';
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
      .then(res => res.json())
      .then(parsedRes => {
        var timeSeries = parsedRes['Time Series (5min)'];
        var timeDateStencil = timeSeries['2022-06-29 19:25:00'];
        this.angularUsers = timeDateStencil['5. volume'];
      });
  }

  reactAPI() {
    this.reactUsers = 'Loading data ...';
    fetch('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo')
      .then(res => res.json())
      .then(parsedRes => {
        var timeSeries = parsedRes['Time Series (5min)'];
        var timeDateStencil = timeSeries['2022-06-29 18:55:00'];
        this.reactUsers = timeDateStencil['5. volume'];
      });
  }
/*

A basic fetch request is really simple to set up. Have a look at the following code:

fetch('http://example.com/movies.json')
  .then(response => response.json())
  .then(data => console.log(data));

Here we are fetching a JSON file across the network and printing it to the console. The simplest use of fetch() takes one argument — the path to the resource you want to fetch — and does not directly return the JSON response body but instead returns a promise that resolves with a Response object.

The Response object, in turn, does not directly contain the actual JSON response body but is instead a representation of the entire HTTP response. So, to extract the JSON body content from the Response object, we use the json() method, which returns a second promise that resolves with the result of parsing the response body text as JSON.

*/

  render() {
    let angularContent = (
      <div>
        <h5>Live Users {this.angularUsers}</h5>
        <button class="btn-ng" onClick={this.angularAPI.bind(this)}>
          Fetch Angular Users
        </button>
      </div>
    );

    let reactContent = (
      <div>
        <h5>Live Users {this.reactUsers}</h5>
        <button class="btn" onClick={this.reactAPI.bind(this)}>
          Fetch React Users
        </button>
      </div>
    );

    let contentToShow = '';
    if (this.showAngular) {
      contentToShow = angularContent;
    } else if (this.showReact) {
      contentToShow = reactContent;
    }

    let mainContent = (
      <div class="box">
        Hi {this.userName}
        <br />
        <button class="btn-ng" onClick={this.onContentChange.bind(this, 'angularTab')}>
          Angular
        </button>
        <button class="btn" onClick={this.onContentChange.bind(this, 'reactTab')}>
          React
        </button>
        {contentToShow}
        <h3>Two way binding in Stencil</h3>
        <input type="text" class="inputPlaceholder" onInput={this.changeName.bind(this)} value={this.userName} />
      </div>
    );
    return mainContent;
  }
}
