import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'rating-component',
  styleUrl: 'rating.css',
})
export class Rating {
  @Prop() value = 1;
  @Prop() maxValue = 5;

  @State() starList: Array<object> = [];

  createStarList() {
    let starList = [];
    for (let i = 1; i <= this.maxValue; i++) {
      if (i <= this.value) {
        starList.push(<span class="rating">&#x2605;</span>);
      } else {
        starList.push(<span class="rating">&#x2606;</span>);
      }
    }
    this.starList = starList;
  }

  render() {
    return (<div>{this.starList}</div>);
  }
}
