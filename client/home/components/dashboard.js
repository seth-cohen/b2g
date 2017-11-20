import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCurrentUser,
  getGamesForUser,
  getPlatformsForUser
} from "../selectors";
import Counter from "../../design_components/lb_counter";
import Button from "../../design_components/lb_button";
import Game from "../../design_components/lb_owned_game_card";
import "../../design_components/styles/lb_profile.scss";

class Dashboard extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      username: PropTypes.string,
      emailAddress: PropTypes.string,
      profile: PropTypes.shape({
        thumbnail: PropTypes.string,
        bannerPhoto: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        middleName: PropTypes.string,
        aboutMe: PropTypes.string
      })
    }).isRequired,
    userGames: PropTypes.arrayOf(
      PropTypes.shape({
        game: PropTypes.object,
        platform: PropTypes.object,
        purchaseDate: PropTypes.number,
        lastPlayed: PropTypes.number
      })
    ).isRequired,
    userPlatforms: PropTypes.arrayOf(
      PropTypes.shape({
        platform: PropTypes.object,
        purchaseDate: PropTypes.number,
        lastPlayed: PropTypes.number
      })
    ).isRequired
  };
  render() {
    const {
      user: {
        username,
        profile: { firstName, lastName, thumbnail, bannerPhoto, aboutMe }
      },
      userGames
      /* userPlatforms*/
    } = this.props;

    return (
      <section className="Dashboard">
        <article className="Profile row">
            <img className="Profile-banner" src={bannerPhoto} />
            <section className="Profile-user col-xs-7">
              <div className="row">
                <img className="Profile-user-image col-xs-5" src={thumbnail} />
                <div className="col-xs">
                  <p className="">Member since: Just a few minutes ago</p>
                  <p className="">{username}</p>
                  <p className="">{`${firstName} ${lastName}`}</p>
                  <dl>
                    <dt>About me:</dt>
                    {aboutMe.length ? (
                      <dd>{aboutMe}</dd>
                    ) : (
                      <button className="btn btn-link">
                        Click to update profile description
                      </button>
                    )}
                  </dl>
                </div>
              </div>
            </section>
            <section className="Profile-stats col-xs-5">
              <div className="row center-xs bottom-xs">
                <div className="col-xs">
                  <Counter label="Games" count={this.props.userGames.length} />
                </div>
                <div className="col-xs">
                  <Counter
                    label="Platforms"
                    count={this.props.userPlatforms.length}
                  />
                </div>
              </div>
            </section>
            <section className="Profile-actions col-xs-12">
              <div className="row">
                <div className="col-xs-2">
                  <Button variation="ghost">Friends</Button>
                </div>
                <div className="col-xs-2">
                  <Button variation="ghost">Clans</Button>
                </div>
                <div className="col-xs-2 u-flexRight">
                  <Button variation="primary">Edit Profile</Button>
                </div>
              </div>
            </section>
        </article>

        {/* GAMES CARD */}
        <section className="Dashboard card mt-4">
          <header className="card-header d-flex">
            <h3>Games</h3>
            <i className="fa fa-compress fa-2x ml-auto" />
          </header>
          <section className="row">
            {userGames.map(game => (
              <div key={game.id}>
                <Game key={game.id} {...game} />
              </div>
            ))}
          </section>
        </section>

        {/* PLATFORMS CARD */}
        <section className="Dashboard card mt-4">
          <header className="card-header d-flex">
            <h3>Platforms</h3>
            <i className="fa fa-compress fa-2x ml-auto" />
          </header>
          <section className="row px-2">
            {userGames.map(game => (
              <div key={game.id} className="col-12 col-md-6 mt-2">
                <Game key={game.id} {...game} />
              </div>
            ))}
          </section>
        </section>
        <div className="container">
          <div className="row">Dashboard things</div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: getCurrentUser(state),
    userGames: getGamesForUser(6)(state),
    userPlatforms: getPlatformsForUser(6)(state)
  };
};
export default connect(mapStateToProps)(Dashboard);
