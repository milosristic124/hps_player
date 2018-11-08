import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/action';
import { dySize, get, getFontSize } from '../../lib/responsive';
import * as Constants from '../../lib/constants';
import CustomPoint from '../../component/point';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  video: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: dySize(60),
    left: 0,
    borderWidth: 0,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: dySize(60),
    width: get('width'),
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  bottomText: {
    fontSize: getFontSize(40),
    color: 'white',
  },
  exitButton: { 
    backgroundColor: 'black', 
    position: 'absolute', 
    zIndex: 50000, 
    paddingVertical: 5,
    paddingHorizontal: 10,
    top: 10, 
    right: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playIndex: 1,
      marginLeft: new Animated.Value(get('width')),
      videoWidth: 0,
      videoHeight: 0,
      videoMarginLeft: 0,
      videoMarginTop: 0,
      playCount: 0,
      currentTime: 0,
      countOfVideo2: 0,
      indexOfVideo2: 0,
      isTapped: false,
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    const { schoolID } = this.props.navigation.state.params;
    this.props.fetchVideoURL(schoolID);
    this.props.fetchHousesPosition(schoolID);
    this.props.fetchTickerText(() => {
      this.startAnimation();
    });
  }

  startAnimation() {
    const strLength = this.props.tickerText.length;
    this.state.marginLeft = new Animated.Value(get('width'));
    Animated.timing( // Animate over time
      this.state.marginLeft, // The animated value to drive
      {
        toValue: 0 - strLength * dySize(20), // Animate to opacity: 1 (opaque)
        duration: strLength * 200, // Make it take a while
        easing: Easing.linear,
        delay: 500,
      },
    ).start((event) => {
      event.finished && this.startAnimation();
    });
  }

  onEnd(index) {
    const { playIndex, countOfVideo2 } = this.state;
    console.log('Video playing ended');
    switch (index) {
      case 1:
        if (playIndex === 1) {
          this.video2.seek(0);
          this.setState({ playIndex: 2, indexOfVideo2: 20 });
        }
        break;
      case 2:
        if (countOfVideo2 < Constants.countOfVideo2) {
          this.video2.seek(0);
          this.setState({ countOfVideo2: countOfVideo2 + 1 });
        } else if (playIndex === 2) {
          this.video3.seek(0);
          this.setState({ playIndex: 3, indexOfVideo2: 5 });
        }
        break;
      case 3:
        if (playIndex === 3) {
          // this.video1.seek(0);
          this.setState({
            playIndex: 2,
            indexOfVideo2: 20,
            countOfVideo2: 0,
            playCount: this.state.playCount + 1,
            marginLeft: new Animated.Value(get('width')),
          });
          this.startAnimation();
        }
        break;
      default:
    }
  }

  videoError() {
    console.log('Video playing error occured');
  }

  onLoadStart() {
    console.log('Video loading started');
  }

  onLoad(data) {
    // save width/height of the video player
    if (this.video1) {
      const ratio = data.naturalSize.width / data.naturalSize.height;
      const width = dySize(315) * ratio;
      if (width > get('width')) {
        this.setState({
          videoWidth: get('width'),
          videoHeight: get('width') / ratio,
          videoMarginLeft: 0,
          videoMarginTop: (dySize(315) - get('width') / ratio) / 2,
        });
      } else {
        this.setState({
          videoWidth: width,
          videoHeight: dySize(315),
          videoMarginTop: 0,
          videoMarginLeft: (get('width') - dySize(315) * ratio) / 2,
        });
      }
    }
  }

  onProgress(time) {
    const { playIndex, countOfVideo2 } = this.state;
    //console.log('Video playing ', time);
    switch (playIndex) {
      case 1:
        this.setState({ currentTime: time.currentTime });
        break;
      case 2:
        this.setState({ currentTime: 12 + countOfVideo2 * 3 + time.currentTime });
        break;
      case 3:
        this.setState({ currentTime: 12 + (Constants.countOfVideo2 + 1) * 3 + time.currentTime });
        break;
      default:
    }
  }

  onClick = () => {
    if ( this.state.isTapped ) {
      this.setState({ isTapped: false });
    } else {
      this.setState({ isTapped: true });
    }
  };

  exitPress = () => {
    this.props.navigation.goBack();
  }
  render() {
    console.log('Position', this.props.videoURL);
    const {
      playIndex, marginLeft, videoWidth, playCount, currentTime, videoMarginLeft, videoMarginTop, videoHeight, indexOfVideo2,
    } = this.state;
    const { isLoading } = this.props;
    if (isLoading) {
      return (
        <View style={styles.container} />
      );
    }
    return (
      <View style={styles.container}>
        {this.state.isTapped ? 
        <TouchableOpacity onPress={this.exitPress} style={styles.exitButton}>
          <Text style={styles.exitButtonText}>Exit</Text>
        </TouchableOpacity> 
        : null }
        {
          playIndex < 2 &&
          <TouchableWithoutFeedback onPress={this.onClick}>
          <Video
            source={{ uri: !this.props.videoURL ? 'http://google.com/1.mp4' : this.props.videoURL + '1.mp4' }}
            ref={(ref) => this.video1 = ref}
            resizeMode="contain"
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad.bind(this)}
            onProgress={this.onProgress.bind(this)}
            onEnd={this.onEnd.bind(this, 1)}
            onError={this.videoError}
            style={[styles.video, { zIndex: 30 * playCount + 30 }]}
            muted={playIndex !== 1}
            paused={playIndex !== 1}
            progressUpdateInterval={1000}
          />
          </TouchableWithoutFeedback>
        } 
        {
          1 &&
          <TouchableWithoutFeedback onPress={this.onClick}>
          <Video
            source={{ uri: !this.props.videoURL ? 'http://google.com/1.mp4' : this.props.videoURL + '1.mp4' }}
            ref={(ref) => this.video2 = ref}
            resizeMode="contain"
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad.bind(this)}
            onProgress={this.onProgress.bind(this)}
            onEnd={this.onEnd.bind(this, 2)}
            onError={this.videoError}
            style={[styles.video, { zIndex: 30 * playCount + indexOfVideo2 }]}
            muted={playIndex !== 2}
            paused={playIndex !== 2}
            progressUpdateInterval={1000}
          />
          </TouchableWithoutFeedback>
        }
        {
          playIndex !== 1 &&
          <TouchableWithoutFeedback onPress={this.onClick}>
          <Video
            source={{ uri: !this.props.videoURL ? 'http://google.com/1.mp4' : this.props.videoURL + '1.mp4' }}
            ref={(ref) => this.video3 = ref}
            resizeMode="contain"
            onLoadStart={this.onLoadStart}
            onLoad={this.onLoad.bind(this)}
            onProgress={this.onProgress.bind(this)}
            onEnd={this.onEnd.bind(this, 3)}
            onError={this.videoError}
            style={[styles.video, { zIndex: 30 * playCount + 10 }]}
            muted={playIndex !== 3}
            paused={playIndex !== 3}
            progressUpdateInterval={1000}
          />
          </TouchableWithoutFeedback>
        }
        <View style={styles.bottomView} >
          <Animated.Text
            style={[
              styles.bottomText,
              {
                marginLeft,
                width: Platform.OS === 'ios' ? null : this.props.tickerText.length * 20,
              },
            ]}
          >
            {this.props.tickerText}
          </Animated.Text>
        </View>
        {
          currentTime > 0 && this.props.housesPosition.map((point, index) => (
            <CustomPoint
              key={String(playCount) + index}
              point={point}
              videoWidth={videoWidth}
              videoHeight={videoHeight}
              videoMarginLeft={videoMarginLeft}
              videoMarginTop={videoMarginTop}
              currentTime={currentTime * 1000}
            />
          ))
        }
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}
export default connect((state) => ({
  isLoading: state.isLoading,
  tickerText: state.tickerText,
  videoURL: state.videoURL,
  housesPosition: state.housesPosition,
}), mapDispatchToProps)(Home);

