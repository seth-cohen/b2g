import React from "react";
import PropTypes from "prop-types";
import SelectInput from "./lb_select_input";

const platformOptions = [
  { id: 1, name: "Playstation" },
  { id: 2, name: "Sega" },
  { id: 3, name: "Xbox One" },
  { id: 4, name: "Nintendo Switch" }
];

class Registration extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    publishers: PropTypes.arrayOf(PropTypes.Object),
    developers: PropTypes.arrayOf(PropTypes.Object),
    releaseDate: PropTypes.number,
    availablePlatforms: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    name: "MarioKart",
    thumbnail:
      "http://dlp2gfjvaz867.cloudfront.net/product_photos/42431181/WEEDLIFE_20-_20StayHigh_20Super_20Mario_20T-Shirt_20-_20WEEDLIFE_200sq.jpg",
    publishers: ["Activision"],
    developers: ["343 - Studios"],
    releaseDate: 1510115258,
    availablePlatforms: []
  };

  validate = () => {
    let errors = {};
    return errors;
  };

  render() {
    const date = new Date(this.props.releaseDate * 1000);

    return (
      <article className="card">
        <div className="row">
          <section className="text-left col-8 d-flex">
            <img src={this.props.thumbnail} className="img-thumbnail m-2" />
            <section className="m-2 mt-4">
              <h4 className="card-title">{this.props.name}</h4>
              <dl className="row">
                <dt className="col-5">Publisher:</dt>
                <dd className="col-7">{this.props.publishers[0]}</dd>
                <dt className="col-5">Developer:</dt>
                <dd className="col-7">{this.props.developers[0]}</dd>
                <dt className="col-5">Release Date:</dt>
                <dd className="col-7">{date.toLocaleDateString()}</dd>
              </dl>
            </section>
          </section>
          <section className="col">
            <form
              className="px-4 pt-4"
              method="POST"
              action="/users/create"
              onSubmit={this.handleSubmit}
              noValidate
            >
              <SelectInput options={platformOptions} />
              <button type="submit" className="btn btn-primary form-control">
                Add
              </button>
            </form>
          </section>
        </div>
      </article>
    );
  }
}

export default Registration;
