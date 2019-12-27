import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button} from 'react-bootstrap'
import YouTube from 'react-youtube'

import '../css/home.css'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVideo: '',
      customVideos: ['J8sGGGVbrFs', 'quLYD3eu7zo']
    }
  }

  componentDidMount() {
    console.log('PROPS', this.props)
    this.randomVideo()
  }

  randomVideo = () => {
    console.log('RANDOM OLD VIDEO', this.state.selectedVideo)
    let newVideo = this.state.customVideos[
      Math.floor(Math.random() * this.state.customVideos.length)
    ]
    if (newVideo === this.state.selectedVideo) {
      newVideo = 'LDGoz723OJs'
    }
    this.setState({
      selectedVideo: newVideo
    })
    console.log('RANDOM NEW VIDEO', this.state.selectedVideo)
  }

  _onReady = event => {
    // access to player in all event handlers via event.target
    // event.target.mute();
  }

  _onError = event => {
    console.log(event.target.getVideoData())
    this.setState({
      selectedVideo: this.state.customVideos[
        Math.floor(Math.random() * this.state.customVideos.length)
      ]
    })
  }
  render() {
    const videoOptions = {
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        loop: 1
      }
    }

    return (
      <div>
        <div id="home">
          {/* {isLoggedIn ? <div>Let's set Sail {firstName}</div> : null} */}
          <Button
            className="buttons"
            variant="info"
            size="lg"
            onClick={() => this.props.history.push('/login')}
          >
            Login
          </Button>
          <Button
            className="buttons"
            variant="info"
            size="lg"
            onClick={() => this.props.history.push('/signup')}
          >
            Sign Up
          </Button>
        </div>
        <div className="video-background">
          <div className="video-foreground">
            <YouTube
              videoId={this.state.selectedVideo}
              opts={videoOptions}
              className="video-iframe"
              onReady={this._onReady}
              onEnd={() => this.randomVideo()}
              onError={this._onError}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    firstName: state.user.firstName
  }
}

export default connect(mapState)(Home)

// // const Home = ({isLoggedIn, firstName, history}) => {

//   const videoOptions = {
//     playerVars: { // https://developers.google.com/youtube/player_parameters
//       autoplay: 1,
//       controls: 0,
//       rel: 0,
//       showinfo: 0,
//       loop: 1
//     }
//   };
//   return (
//     <div id="home">
//       {/* {isLoggedIn ? <div>Let's set Sail {firstName}</div> : null} */}
//       <Button variant="outline-info" onClick={() => history.push('/login')}>
//         Login
//       </Button>
//       <Button variant="outline-info" onClick={() => history.push('/signup')}>
//         Sign Up
//       </Button>
//       <div className="video-background">
//         <div className="video-foreground">
//           <YouTube
//             videoId="AgFeZr5ptV8"
//             opts={videoOptions}
//             className="video-iframe"
//             // onReady={this._onReady}
//             // onEnd={this._onEnd}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.id,
//     firstName: state.user.firstName
//   }
// }

// export default connect(mapState)(Home)
