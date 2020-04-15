/* eslint-disable */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import { geolocated } from 'react-geolocated';
import { connect } from 'react-redux';
import { hotjar } from 'react-hotjar';
import {
  Link,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll';

import {
  getCurrentUser,
  loadNewsfeed,
  claimTask,
  unclaimTask,
  completeTask,
  upvote,
  downvote,
  addComment,
  addReply,
  selectMenu,
  getLeaderboard
} from '../store/actions/auth/auth-actions';

import { ReactComponent as LogoText } from '../assets/logos/tgt-text-and-logo-beta.svg';

function About(props) {
  const { user, getCurrentUserDispatch, getLeaderboardDispatch, userRanking, leaderboard } = props;

  const history = useHistory();
  const [activeKey, setActiveKey] = React.useState('0');

  let items = [];
  const authenticated = localStorage.getItem('giving_tree_jwt');
  const refresh = async () => {
    if (authenticated && !user.username) {
      await getCurrentUserDispatch({
        env: process.env.NODE_ENV
      });
    }
  };

  React.useEffect(() => {
    hotjar.initialize('1751072', 6);
  }, []);

  function generateHash(username = '', version) {
    const secret = 'givingtree';
    const hash = require('crypto')
      .createHmac('sha256', secret)
      .update(username.toLowerCase())
      .digest('hex');

    const suffix = Number(version) === 0 || !version ? '' : `%3Fver%3D${version}`;
    const url = `https://d1ppmvgsdgdlyy.cloudfront.net/user/${hash}${suffix}`;
    return url;
  }

  function stringToHslColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }

  React.useEffect(() => {
    getLeaderboardDispatch({ env: process.env.NODE_ENV, location: 'global' });
  }, []);

  return (
    <div>
      <Navigation searchBarPosition="center" />
      <section className="bg-white pt-12 pb-10">
        <div className="lg:max-w-4xl xl:max-w-screen-xl mx-auto px-6 py-12">
          <h1 style={{ fontSize: 44 }}
          className="mb-8 text-4xl font-bold uppercase text-center">About us</h1>
          <div className="block md:flex items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <h2 className="font-bold text-4xl mb-6">Our Mission and Vision</h2>
              <p className="mb-6 max-w-xl">
                <em className="font-lg">“The best way to not feel hopeless is to get up and do something.”</em><br/>
                <span className="font-semibold block text-right">- Barack Obama</span>
              </p>

              We are a community of doers whose aim is to provide immediate, peer-to-peer assistance to our communities in the midst of COVID-19. We envision a safe, positive, and effective platform where anyone who feels they need help can receive it, and where anyone interested in supporting their community can do so quickly, and at their own pace. By gamifying our volunteering platform, we hope to encourage and entice our users to continue lifting up those around them through social good.
            </div>
            <div className="md:w-1/2 p-6">
              <LogoText className="mx-auto" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12">
        <div className="lg:max-w-4xl xl:max-w-screen-xl mx-auto px-6 block md:flex items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img className="rounded-lg" style={{
              maxHeight: 400
            }}
            src="https://d1ppmvgsdgdlyy.cloudfront.net/whoweare.jpg" />
          </div>
          <div className="md:w-1/2 md:p-6">
            <h2 className="mb-6 font-bold text-4xl">Who we are</h2>
            <p className="mb-4">We are a group of passionate, self-motivated, international strangers-turned-teammates, united by a common goal: to help ease our neighbors’ suffering as a result of COVID-19, and the current social distancing regulations.</p>

            <p>We believe the solution lies in coming together as a community, and in empowering ordinary citizens to act on their altruistic inclinations. We believe that all people deserve to have their basic needs met -- during this global pandemic, and always -- regardless of age, race, ability, or socioeconomic status.</p>
          </div>
        </div>
      </section>


      <section className="bg-white py-12">
        <div className="lg:max-w-4xl xl:max-w-screen-xl mx-auto px-6 block md:flex items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="mb-6 font-bold text-4xl">Get involved</h2>
            <p className="mb-4">Interested in contributing to our efforts? The best way to help out is by spreading the word to your friends/family/network about our platform, and by signing up to be a helper if you are able.</p>

            <p>You can also get in touch with us <a className="text-green-600" href="mailto:team.givingtree@gmail.com">by email</a> if you like what we are doing, or have ideas on how we can improve. If you would like to provide in-depth feedback on our site’s usability and features, make sure your email has the term “<strong>USER INTERVIEW</strong>” in the subject line so we know you’re interested in participating!</p>
          </div>
          <div className="md:w-1/2 md:p-6">
            <img className="rounded-lg mx-auto" style={{
              maxHeight: 300
            }}
            src="https://d1ppmvgsdgdlyy.cloudfront.net/getinvolved.png" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="lg:max-w-4xl xl:max-w-screen-xl mx-auto px-6 block md:flex items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img className="rounded-lg" style={{
              maxHeight: 400
            }}
            src="https://d1ppmvgsdgdlyy.cloudfront.net/contactus.jpg" />
          </div>
          <div className="md:w-1/2 md:p-6">
            <h2 className="mb-6 font-bold text-4xl">Contact us</h2>
            <p className="mb-4">Reach out to us anytime at <a className="text-green-600" href="mailto:team.givingtree@gmail.com">team.givingtree@gmail.com</a>.</p>

            <p>If you need our team to create a request on your behalf, call or send a text message to our hotline at 415-964-4261.</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="lg:max-w-4xl xl:max-w-screen-xl mx-auto px-6 block md:flex items-center">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="mb-6 font-bold text-4xl">Get help</h2>
            <p className="mb-4">Need immediate assistance with a request and can’t find a helper? Please <a className="text-green-600" href="mailto:team.givingtree@gmail.com">email us</a> with the word “<strong>URGENT</strong>" in the subject line.</p>

            <p>Need to report an incident, and/or the malicious or inappropriate behavior of another user? Please <a className="text-green-600" href="mailto:team.givingtree@gmail.com">email us</a> with the word “<strong>REPORT</strong>” in the subject line.</p>
          </div>
          <div className="md:w-1/2 md:p-6">
            <img className="rounded-lg mx-auto" style={{
              maxHeight: 300
            }}
            src="https://d1ppmvgsdgdlyy.cloudfront.net/gethelp.png" />
          </div>
        </div>
      </section>


      <div className="bg-white p-6">
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="justify-center hover:text-green-700 transition-duration mx-auto flex items-center uppercase text-lg"
        >
          <span>Back to top</span>
          
          <img
            className="ml-3"
            src="https://d1ppmvgsdgdlyy.cloudfront.net/back-to-top.svg"
            alt="back-to-top"
          />
        </button>
      </div>
      
      <Footer />
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  getCurrentUserDispatch: payload => dispatch(getCurrentUser(payload)),
  loadNewsfeedDispatch: payload => dispatch(loadNewsfeed(payload)),
  claimTaskDispatch: payload => dispatch(claimTask(payload)),
  unclaimTaskDispatch: payload => dispatch(unclaimTask(payload)),
  completeTaskDispatch: payload => dispatch(completeTask(payload)),
  upvoteDispatch: payload => dispatch(upvote(payload)),
  downvoteDispatch: payload => dispatch(downvote(payload)),
  addCommentDispatch: payload => dispatch(addComment(payload)),
  addReplyDispatch: payload => dispatch(addReply(payload)),
  selectMenuDispatch: payload => dispatch(selectMenu(payload)),
  getLeaderboardDispatch: payload => dispatch(getLeaderboard(payload))
});

const mapStateToProps = state => ({
  user: state.auth.user,
  newsfeed: state.auth.newsfeed,
  currentPage: state.auth.currentPage,
  selectMenu: state.auth.selectMenu,
  pages: state.auth.pages,
  numOfResults: state.auth.numOfResults,
  newsfeedSuccess: state.auth.newsfeedSuccess,
  newsfeedUpdated: state.auth.newsfeedUpdated,
  newsfeedLoading: state.auth.newsfeedLoading,
  userRanking: state.auth.userRanking,
  leaderboard: state.auth.leaderboard
});

About.defaultProps = {};

About.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(geolocated()(About));
