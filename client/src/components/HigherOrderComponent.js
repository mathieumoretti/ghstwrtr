import React from 'react';

const config = {
    title : "Hello World"
}

var enhanceComponent = (Component) =>
class Enhance extends React.Component {
    render () {
        return (
            <Component {...this.props} title={config.title}/>
        )
    }
}

var Title = ({title}) => <h1>{title}</h1>;
export const EnhancedTitle = enhanceComponent(Title);
