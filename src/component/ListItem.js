import React, { Component } from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Image,
  StyleSheet,
  Platform,
  Animated,
  Alert
} from "react-native";
import PropTypes from "prop-types";
import { RectButton } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

class ListItem extends Component {
  static propTypes = {
    leftElement: PropTypes.element,
    shareElement: PropTypes.element,
    onSharePress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    rightElement: PropTypes.element,
    rightText: PropTypes.string,
    onPress: PropTypes.func,
    onDelete: PropTypes.func,
    onLongPress: PropTypes.func,
    disabled: PropTypes.bool
  };

  renderRightAction = (iconName, color, x, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0]
    });

    const pressHandler = () => {
      const { onDelete } = this.props;
      if (onDelete) onDelete();
      this.close();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: 'white' }]}
          onPress={pressHandler} >
          <Image style={{ height: 20, width: 20, alignItems: 'center', marginTop: 10 }} source={require('../assets/close_icon.png')} ></Image>
        </RectButton>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{ width: 64, flexDirection: "row" }}>
      {this.renderRightAction("trash", "#ef5350", 64, progress)}
    </View>
  );

  renderRightActions = progress => (
    <View style={{ width: 64, flexDirection: "row" }}>
      {this.renderRightAction("trash", "#ef5350", 64, progress)}
    </View>
  );

  updateRef = ref => {
    this.swipeableRow = ref;
  };

  close = () => {
    this.swipeableRow.close();
  };

  render() {
    const {
      leftElement,
      shareElement,
      title,
      onSharePress,
      description,
      rightElement,
      rightText,
      onPress,
      onLongPress,
      disabled
    } = this.props;

    const Component = onPress || onLongPress ? TouchableHighlight : View;

    const {
      itemContainer,
      leftElementContainer,
      rightSectionContainer,
      mainTitleContainer,
      rightElementContainer,
      rightTextContainer,
      titleStyle,
      descriptionStyle
    } = styles;

    return (
      <Swipeable
        ref={this.updateRef}
        friction={1}
        renderRightActions={this.renderRightActions} >
        <Component
          onPress={onPress}
          onLongPress={onLongPress}
          disabled={disabled}
          underlayColor="#f2f3f5">
          <View style={itemContainer}>
            {leftElement ? (
              <View style={leftElementContainer}>{leftElement}</View>
            ) : (
                <View />
              )}
            <View style={rightSectionContainer}>
              <View style={mainTitleContainer}>
                <View style={{ flex: 0.5, alignSelf: 'center' }}>
                  <Text style={titleStyle}>{title}</Text>
                </View>
                <View style={{ flex: 0.5, alignSelf:'center' }}>
                  {shareElement ? (
                    <View 
                      onPress = {() => Alert.alert('Hey')}
                      style={{alignSelf:'flex-end'}}>{shareElement}</View>
                  ) : (
                      <View />
                    )}
                </View>

              </View>
              <View style={rightTextContainer}>
                {rightText ? <Text>{rightText}</Text> : <View />}
              </View>

              {rightElement ? (
                <View style={rightElementContainer}>{rightElement}</View>
              ) : (
                  <View />
                )}
            </View>
          </View>
        </Component>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    minHeight: 44,
    height: 63
  },
  leftElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    paddingLeft: 13
  },
  rightSectionContainer: {
    marginLeft: 18,
    flexDirection: "row",
    flex: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#515151"
  },
  mainTitleContainer: {
    flexDirection: "row",
    flex: 1,
  },
  rightElementContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.4
  },
  rightTextContainer: {
    justifyContent: "center",
    marginRight: 10
  },
  titleStyle: {
    fontSize: 16
  },
  descriptionStyle: {
    fontSize: 14,
    color: "#515151"
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
});

export default ListItem;