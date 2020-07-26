import React, { Component } from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
      //logErrorToMyService(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        // Vous pouvez afficher n'importe quelle UI de repli.
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }