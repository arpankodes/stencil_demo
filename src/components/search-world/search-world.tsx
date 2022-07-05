import { Component, State, Prop, h } from "@stencil/core";

@Component({
    tag: 'search-world',
    styleUrl: 'search-world.css',
    shadow: true
})

export class searchWorld {
    @Prop() inputText;
    
}