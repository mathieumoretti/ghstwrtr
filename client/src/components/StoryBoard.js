import React from 'react';

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

    return (<div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.state.story.headline}</h5>
          <p className="card-text">{this.state.story.content}</p>
          <div className="card-text text-center">                  
            <p><small > Last updated 3 mins ago </small></p>
            <p>
                <span><div className="glyphicon glyphicon-chevron-up text-center"></div></span>
                <span><div className="glyphicon glyphicon-chevron-down text-center"></div></span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}