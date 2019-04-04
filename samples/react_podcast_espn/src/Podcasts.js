import React, { Component } from 'react';
import './Podcasts.css';

class Podcasts extends Component {
  render() {
    var arr;

    if(this.props.items.length > 10) {
      arr = this.props.items.slice(0,10);
    } else {
      arr = this.props.items;
    }

    const podcasts = arr.map((item, index) => 
      <div key={index}
        className={this.props.selected === index ? "Selected Podcast" : "Podcast"}
        onClick={(e) => this.props.clickFunc(item.enclosure.$.url, index,e)}>
        <div>{item.title}</div>
        <div className="PodDesc">
          {typeof item.description === 'object' ? item.description._ : item.description}<br/>
          ( {item["itunes:duration"]} )
        </div>
      </div>
    );

    return (
      <div>{podcasts}</div>
    );
  }
}

export default Podcasts;