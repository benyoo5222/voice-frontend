import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import useUserInfoAuth from './hooks/useUserInfoAuth';
import useHomeTimeLineTweets from './hooks/useHomeTimeLineTweets';
import useUserTrending from './hooks/useUserTrending';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import HomeTimeLine from './components/Home/Home';
import SideMenu from './components/SideMenu/SideMenu';
import TweetModal from './components/TweetModal/TweetModal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.scss';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();

const websocket = new WebSocket('ws://localhost:8000'); //put url
websocket.binaryType = "arraybuffer";

const downsampleBuffer = function (buffer, sampleRate, outSampleRate) {
	if (outSampleRate == sampleRate) {
		return buffer;
	}
	if (outSampleRate > sampleRate) {
		throw "downsampling rate show be smaller than original sample rate";
	}
	var sampleRateRatio = sampleRate / outSampleRate;
	var newLength = Math.round(buffer.length / sampleRateRatio);
	var result = new Int16Array(newLength);
	var offsetResult = 0;
	var offsetBuffer = 0;
	while (offsetResult < result.length) {
		var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
		var accum = 0, count = 0;
		for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
			accum += buffer[i];
			count++;
		}

		result[offsetResult] = Math.min(1, accum / count) * 0x7FFF;
		offsetResult++;
		offsetBuffer = nextOffsetBuffer;
  }
  return result;
};

const handleListen = () => {
  navigator.mediaDevices.getUserMedia({
    audio: true,
  }).then((stream) => {
    console.log("STREAm!!!", stream)

    let processor = context.createScriptProcessor(2048, 1, 1);
    processor.connect(context.destination);
    context.resume();

    let input = context.createMediaStreamSource(stream);
		input.connect(processor);

		processor.onaudioprocess = function (e) {
			var left = e.inputBuffer.getChannelData(0);
      // var left16 = convertFloat32ToInt16(left); // old 32 to 16 function
      var left16 = downsampleBuffer(left, 44100, 16000);
      console.log("Buffer", left16);

      websocket.send(JSON.stringify({connectionID: 3333, audio: Array.from(left16)}));
    };
    
    websocket.onopen = () => {
      console.log("Connected");
    };

    websocket.onerror = () => {
      console.log("Error!!!!!!!!!")
    }
    
    websocket.onmessage = (message) => {
      console.log("MESSAGE", message);
    };
  })
  .catch((err) => {
    console.log("error", err);
  })
};

function App() {
  const {
    isAuthenticated,
    setAuthenticationStatus,
    user,
    setUser,
  } = useUserInfoAuth();

  const {
    homeTimeLineTweets,
    setHomeTimeLineTweets,
  } = useHomeTimeLineTweets(isAuthenticated);

  const {
    userTrendingData
  } = useUserTrending();

  const modalState = false;
  //handleListen();

  const preventScroll = () => {
    if (modalState) document.body.style.overflow = "hidden";
  };

  preventScroll();
  return (
    <Router>
      <Container fluid className="container">
        <Row xs={1} sm={1} md={3} lg={3} xl={3} className="removeMargin">
          <Col xs={0} sm={0} md={2} lg={1} xl={3}>
            <Footer userInfo={user} />
          </Col>

          <Col xs sm md={9} lg={7} xl={6} className="main-content">
            <Navigation 
              userInfo={user} 
              isAuthenticated={isAuthenticated}
            />

            <Switch>
              <Route path="/">
                <HomeTimeLine homeTimeLineTweets={homeTimeLineTweets} />
              </Route>
            </Switch>
          </Col>

          <Col xs={0} sm={0} md={1} lg={4} xl={3}>
            <SideMenu userTrendingData={userTrendingData} />
          </Col>
        </Row>

        <TweetModal user={user} modalState={modalState}/>
      </Container>
  </Router>
  );
}

export default App;
