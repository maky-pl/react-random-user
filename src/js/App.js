import React from "react";
import Collapsible from "./Collapsible";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contacts: []
    };
  }

  componentWillMount() {
    localStorage.getItem("contacts") &&
      this.setState({
        contacts: JSON.parse(localStorage.getItem("contacts")),
        isLoading: false
      });
  }

  componentDidMount() {
    const date = localStorage.getItem("contactsDate");
    const contactsDate = date && new Date(parseInt(date));
    const now = new Date();

    const dataAge = Math.round((now - contactsDate) / (1000 * 60)); // in minutes
    const tooOld = dataAge >= 5;

    if (tooOld) {
      this.fetchData();
    } else {
      console.log(
        `Using data from localStorage that are ${dataAge} minutes old.`
      );
    }
  }

  fetchData() {
    this.setState({
      isLoading: true,
      contacts: []
    });

    fetch("https://randomuser.me/api/?results=50&nat=gb")
      .then(response => response.json())
      .then(parsedJSON =>
        parsedJSON.results.map(user => ({
          name: `${user.name.first} ${user.name.last}`,
          username: `${user.login.username}`,
          email: `${user.email}`,
          location: `${user.location.street}, ${user.location.city}`,
          picture: `${user.picture.thumbnail}`,
          age: `${user.dob.age}`
        }))
      )
      .then(contacts =>
        this.setState({
          contacts,
          isLoading: false
        })
      )
      .catch(error => console.log("parsing failed", error));
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("contacts", JSON.stringify(nextState.contacts));
    localStorage.setItem("contactsDate", Date.now());
  }

  render() {
    const { isLoading, contacts } = this.state;
    return (
      <div>
        <header>
          <h2>
            {" "}
            <button
              className="btn btn-sm btn-success"
              onClick={e => {
                this.fetchData();
              }}
            >
              Get new data from randomuser.me
            </button>
          </h2>
        </header>
        <div className={`content ${isLoading ? "is-loading" : ""}`}>
          <div className="panel-group">
            {!isLoading && contacts.length > 0
              ? contacts.map(contact => {
                  const {
                    username,
                    name,
                    email,
                    location,
                    picture,
                    age
                  } = contact;
                  return (
                    <Collapsible key={username} title={name} picture={picture}>
                      <p>
                        <strong>Email:</strong> {email}
                      </p>
                      <p>
                        <strong>Location:</strong> {location}
                      </p>
                      <p>
                        <strong>Age:</strong> {age}
                      </p>
                    </Collapsible>
                  );
                })
              : null}
          </div>
          <div className="loader">
            <div className="icon" />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
