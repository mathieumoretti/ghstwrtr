import React from 'react';
import { Story } from './Story';

export class StoryBoard extends React.Component {

  constructor(props) {
    super(props);
    console.log("ctr StoryBoard")
    this.state = {
      loading: true,
      storyId: props.id || 0
    };
  }

  componentDidMount() {
    //Simple GET request using fetch
    fetch(`/api/story/${this.state.storyId}`)
      .then(response => response.json())
      .then(data => {
        console.log("data");
        console.log(data);
          this.setState({ story: data,
                          loading: false })
      }).catch(()=>{
    });
  }

  render() {

    if (this.state.loading)
    {
      return <div>loading StoryBoard</div>;
    }

    return (<Story story={this.state.story}></Story>
    );
  }
}