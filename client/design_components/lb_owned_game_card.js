import React from "react";
import PropTypes from "prop-types";
import Button from "./lb_button";
import "./styles/lb_owned_game.scss";

class GameCard extends React.Component {
  static propTypes = {
    game: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      releaseDate: PropTypes.number,
      thumbnail: PropTypes.string,
      publishers: PropTypes.arrayOf(PropTypes.string),
      developers: PropTypes.arrayOf(PropTypes.string)
    }).isRequired,
    // @TODO update platform to be an array of platforms
    platform: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      releaseDate: PropTypes.number
    }).isRequired,
    purchaseDate: PropTypes.number,
    lastPlayed: PropTypes.number
  };

  static defaultProps = {
    purchaseDate: null,
    lastPlayed: null,
    thumbnail: ""
  };

  validate = () => {
    let errors = {};
    return errors;
  };

  render() {
    const {
      /*purchaseDate,*/
      lastPlayed,
      game: { name: gameName, developers, thumbnail },
      platform: { name: platformName }
    } = this.props;
    const lastPlayedDate = new Date(lastPlayed);

    return (
      <article className="OwnedGame is-active">
        <section className="">
          <header className="OwnedGame-header">
            <p>{gameName}</p>
          </header>
          <img className="OwnedGame-thumbnail" src={thumbnail} />
        </section>
        <section className="OwnedGame-overlay" />
        <section className="OwnedGame-overlay-actions row">
          <form
            className="col-xs-8 col-xs-offset-2"
            method="POST"
            action="/users/create"
            onSubmit={this.handleSubmit}
            noValidate
          >
            <Button variation="ghost" isFullWidth>
              New
            </Button>
            <Button variation="primary" isFullWidth>
              Search
            </Button>
          </form>
        </section>
      </article>
    );
  }
}

export default GameCard;
