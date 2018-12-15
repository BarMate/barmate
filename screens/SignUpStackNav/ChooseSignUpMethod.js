import React, { Component } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';
import Variables from '../../config/Variables.js';
import Colors from '../../config/Colors.js';
import { ParallaxSwiper, ParallaxSwiperPage } from 'react-native-parallax-swiper';

class ChooseSignUpMethodScreen extends Component {
    myCustomAnimatedValue = new Animated.Value(0);

    getPageTransformStyle = index => ({
      transform: [
        {
          scale: this.myCustomAnimatedValue.interpolate({
            inputRange: [
              (index - 1) * (Variables.deviceWidth + 8), // Add 8 for dividerWidth
              index * (Variables.deviceWidth + 8),
              (index + 1) * (Variables.deviceWidth + 8)
            ],
            outputRange: [0, 1, 0],
            extrapolate: "clamp"
          })
        },
        {
          rotate: this.myCustomAnimatedValue.interpolate({
            inputRange: [
              (index - 1) * (Variables.deviceWidth + 8),
              index * (Variables.deviceWidth + 8),
              (index + 1) * (Variables.deviceWidth + 8)
            ],
            outputRange: ["180deg", "0deg", "-180deg"],
            extrapolate: "clamp"
          })
        }
      ]
    });
  
    render() {
      return (
        <ParallaxSwiper
          speed={0.5}
          animatedValue={this.myCustomAnimatedValue}
          dividerWidth={0}
          dividerColor={Colors.TRANSPARENT_COLOR}
          backgroundColor="black"
          onMomentumScrollEnd={activePageIndex => console.log(activePageIndex)}
          showProgressBar={true}
          progressBarBackgroundColor="rgba(0,0,0,0.25)"
          progressBarValueBackgroundColor="white"
        >
          <ParallaxSwiperPage
            BackgroundComponent={
              <Image
                style={styles.backgroundImage}
                source={{ uri: "https://goo.gl/wtHtxG" }}
              />
            }
            ForegroundComponent={
              <View style={styles.foregroundTextContainer}>
                <Animated.Text
                  style={[styles.foregroundText, this.getPageTransformStyle(0)]}
                >
                  Page 1
                </Animated.Text>
              </View>
            }
          />
          <ParallaxSwiperPage
            BackgroundComponent={
              <Image
                style={styles.backgroundImage}
                source={{ uri: "https://goo.gl/gt4rWa" }}
              />
            }
            ForegroundComponent={
              <View style={styles.foregroundTextContainer}>
                <Text
                  style={styles.foregroundText}
                >
                  Page 2
                </Text>
              </View>
            }
          />
          <ParallaxSwiperPage
            BackgroundComponent={
              <Image
                style={styles.backgroundImage}
                source={{ uri: "https://goo.gl/KAaVXt" }}
              />
            }
            ForegroundComponent={
              <View style={styles.foregroundTextContainer}>
                <Animated.Text
                  style={[styles.foregroundText, this.getPageTransformStyle(2)]}
                >
                  Page 3
                </Animated.Text>
              </View>
            }
          />
        </ParallaxSwiper>
      );
    }
  }
  
  const styles = StyleSheet.create({
    backgroundImage: {
      width: Variables.deviceWidth,
      height: Variables.deviceHeight,
    },
    foregroundTextContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent"
    },
    foregroundText: {
      fontSize: 34,
      fontWeight: "700",
      letterSpacing: 0.41,
      color: "white"
    }
  });

export default ChooseSignUpMethodScreen;
