import React, { Component } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/users_actions";

class Register extends Component {
  state = {
    lastname: "",
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    errors: [],
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error}</p>);

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password should be more than 6 characters" };
      this.setState({ errors: errors.concact(error) });
    } else {
      return true;
    }
  };

  isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ lastname, name, email, password, passwordConfirmation }) => {
    return (
      !name.length ||
      !lastname.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = {
      email: this.state.email,
      name: this.state.name,
      lastname: this.state.lastname,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    };
    if (this.isFormValid()) {
      this.setState({ errors: [] });
      this.props
        .dispatch(registerUser(dataToSubmit))
        .then((response) => {
          if (response.payload.success) {
            this.props.history.push("/login");
          } else {
            this.setState({
              errors: this.state.errors.concat(
                "your attempt to send data to DB  failed"
              ),
            });
          }
        })
        .catch((err) => {
          this.setState({
            errors: this.state.errors.concat(err),
          });
        });
    } else {
      console.log("Form is invalid");
    }
  };

  render() {
    return (
      <div className="container">
        <h3>Sign Up</h3>
        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="lastname"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.lastname}
                  id="lastname"
                  type="text"
                  className="validate"
                />
                <label className="active" htmlFor="lastname">
                  LastName
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="name"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.name}
                  id="name"
                  type="text"
                  className="validate"
                />
                <label className="active" htmlFor="name">
                  First Name
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.email}
                  id="email"
                  type="email"
                  className="validate"
                />
                <label className="active" htmlFor="email">
                  Email
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.password}
                  id="password"
                  type="password"
                  className="validate"
                />
                <label className="active" htmlFor="password">
                  Password
                </label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  name="passwordConfirmation"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.passwordConfirmation}
                  id="passwordConfirmation"
                  type="password"
                  className="validate"
                />
                <label className="active" htmlFor="passwordConfirmation">
                  Password Confirmation
                </label>
              </div>
            </div>
            <div>
              {this.state.errors.length > 0 ? (
                <div className="error_label">
                  {this.displayErrors(this.state.errors)}
                </div>
              ) : null}
              <button
                className="btn waves-effect red lighten-2"
                type="submit"
                name="action"
                onClick={(event) => this.submitForm(event)}
              >
                Create an account
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(Register);
