import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { NavigationBarProps } from './type/nav';
import { utils } from './utils';
import { config } from './config';
let pwidth = Dimensions.get('screen').width;
const defaultBackImage = require('./assets/back-icon.png');
const styles = {
  root: {
    // backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 64,
    paddingTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
    // borderBottomWidth: Theme.navSeparatorLineWidth,
    // borderBottomColor: Theme.navSeparatorColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
    // ...navigationBar.headerStyle
  }
};
export class NavigationBar1 extends Component<> {
  constructor(props) {
    super(props);
    utils.simpleNavigation.stackRouter.find(item => item.id == this.props.id).header = this;
    if (this.props.state == 1) {
      this.zIndex = 10000;
    }
    // this.myRef=React.createRef();
    switch (this.props.switch) {
      case 'current':
        this.state.opacity = new Animated.Value(1);
        this.state.translateX = new Animated.Value(0);
        break;
      case 'backCurrent':
        this.state.opacity = new Animated.Value(0);
        this.state.translateX = new Animated.Value(0);
        break;
      case 'pushCurrent':
        this.state.opacity = new Animated.Value(0);
        this.state.translateX = new Animated.Value(pwidth / 2);
        break;
      case 'backHide':
        this.state.opacity = new Animated.Value(1);
        this.state.translateX = new Animated.Value(0);
        break;
      case 'pushHide':
        this.state.opacity = new Animated.Value(1);
        this.state.translateX = new Animated.Value(0);
        break;
    }
  }
  state = {};
  zIndex = 9999;
  render() {
    let navigationBar = utils.getNavigationOptionsById(this.props.id);
    let backImage = null;
    let headerTitle = null;
    if (navigationBar.isHeaderBack) {
      if (React.isValidElement(navigationBar.headerBackImage)) {
        backImage = navigationBar.headerBackImage;
      } else {
        backImage = (
          <Image
            source={navigationBar.headerBackImage ? navigationBar.headerBackImage : defaultBackImage}
            style={{
              height: 21,
              width: 13,
              //   marginLeft: 9,
              marginRight: 8,
              marginVertical: 12,
              resizeMode: 'contain'
            }}
          />
        );
      }
      headerTitle = <Text style={{ fontSize: 15 }}>{navigationBar.headerBackTitle}</Text>;
    }
    //#region 样式
    let styleRoot = {
      ...styles.root,
      zIndex: this.zIndex
      // ...navigationBar.headerStyle
    };
    // if (navigationBar.headerBackground) {
    //   styleRoot.backgroundColor = navigationBar.headerBackground;
    // }
    let titleCommonStyle = {
      position: 'absolute',
      left: 0,
      right: 0,
      height: '100%',
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center'
    };
    let leftCommonStyle = {
      position: 'absolute',
      left: 0,
      height: '100%',
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 15
    };
    let rightCommonStyle = {
      position: 'absolute',
      right: 0,
      height: '100%',
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 15
    };
    let titleStyle = {
      ...titleCommonStyle,
      opacity: this.state.opacity,
      zIndex: 2,
      transform: [{ translateX: this.state.translateX }]
    };
    let leftStyle = {
      ...leftCommonStyle,
      opacity: this.state.opacity,
      zIndex: 2,
      ...navigationBar.headerLeftStyle
    };
    let rightStyle = {
      ...rightCommonStyle,
      opacity: this.state.opacity,
      zIndex: 2,
      ...navigationBar.headerRightStyle
    };
    //#endregion
    // let { title } = this.props.data;
    return (
      <View
        ref={r => {
          if (r) {
            this.root = r;
          }
        }}
        style={styleRoot}
      >
        <Animated.View style={titleStyle}>{this.renderElement(navigationBar.headerTitle, navigationBar.headerTitleStyle)}</Animated.View>
        <Animated.View style={leftStyle}>
          <TouchableOpacity
            onPress={() => {
              utils.simpleNavigation.back();
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {backImage}
              {headerTitle}
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={rightStyle}>
          {navigationBar.headerRight}
          {/* <Text style={{ fontSize: 15 }}>我的</Text> */}
        </Animated.View>
      </View>
    );
  }
  renderElement(title, headerTitleStyle) {
    if (!title) {
      return null;
    }
    if (React.isValidElement(title)) {
      return title;
    } else {
      return (
        <Text
          style={{
            fontSize: 18,
            ...headerTitleStyle
          }}
        >
          {title}
        </Text>
      );
    }
  }
  update = callBack => {
    this.forceUpdate(callBack);
  };

  setValue = (opacity, translateX = null) => {
    this.state.opacity.setValue(opacity);
    if (translateX !== null) {
      this.state.translateX.setValue(translateX);
    }
    // this.state.opacity.setValue(utils.dxToValue(1, v));
    // this.state.opacityNext.setValue(1 - utils.dxToValue(1, v));
    // this.state.translateXNext.setValue(utils.dxToValue(pwidth / 2, v));
  };
  componentDidMount() {
    switch (this.props.switch) {
      case 'current':
        this.startAnimated(true, 0, null, false);
        break;
      case 'backCurrent':
        this.startAnimated(true, 0);
        break;
      case 'pushCurrent':
        this.startAnimated(true, 0);
        break;
      case 'backHide':
        this.startAnimated(false, 0);
        break;
      case 'pushHide':
        this.startAnimated(false, pwidth / 2);
        break;
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('nextProps', nextProps);
    if (nextProps.state == 1 && this.zIndex == 9999) {
      this.zIndex = 10000;
      this.root.setNativeProps({
        style: {
          ...styles.root,
          zIndex: this.zIndex
        }
      });
    } else {
      if (this.zIndex == 10000) {
        this.zIndex = 9999;
        this.root.setNativeProps({
          style: {
            ...styles.root,
            zIndex: this.zIndex
          }
        });
      }
    }
    switch (nextProps.switch) {
      case 'current':
        this.startAnimated(true, 0, 0, false);
        break;
      case 'backCurrent':
        this.startAnimated(true, 0, 0);
        break;
      case 'pushCurrent':
        this.startAnimated(true, 0, pwidth / 2);
        break;
      case 'backHide':
        // console.log('backHide');
        this.startAnimated(false, 0, 0);
        break;
      case 'pushHide':
        this.startAnimated(false, pwidth / 2, 0);
        break;
    }
  }
  animatedInit(show, startValue) {
    this.state.opacity.setValue(show ? 0 : 1);
    this.state.translateX.setValue(startValue);
  }
  startAnimated(show: boolean, targetValue, startValue = null, isAndimated = true) {
    if (isAndimated) {
      if (startValue !== null && !utils.simpleNavigation.isResponding) {
        this.animatedInit(show, startValue);
      }

      Animated.timing(this.state.opacity, {
        ...config.DefaultTransitionSpec,
        toValue: show ? 1 : 0,
        useNativeDriver: true
      }).start(function() {});
      Animated.timing(this.state.translateX, {
        ...config.DefaultTransitionSpec,
        toValue: targetValue,
        useNativeDriver: true
      }).start(function() {});
    } else {
      this.state.opacity.setValue(show ? 1 : 0);
      this.state.translateX.setValue(targetValue);
    }
  }
  shouldComponentUpdate() {
    return false;
  }
}
