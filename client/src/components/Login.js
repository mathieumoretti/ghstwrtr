import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      loading: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  render() {
    return (<ErrorBoundary>
      {this.state.loading
        ? <div>loading...</div>
        : <div className="jumbotron bg-white">
          <h1 className="display-5">Log In</h1>
             <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
                }}
              >
       {({ isSubmitting }) => (
         <Form>
            <div className='form-group'>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className='form-group'>
              <label htmlFor="email">Password</label>
              <Field type="password" name="password" className="form-control" />
              <ErrorMessage name="password" component="div" />
            </div>
            <div className='form-group'>
              <button type="submit" disabled={isSubmitting} className="btn btn-dark">
                Submit
              </button>
            </div>
         </Form>
       )}
     </Formik>
      </div>
      }</ErrorBoundary>
    );
  }
}

class ErrorBoundary extends React.Component {
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
    console.log(error); 
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle UI de repli.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
