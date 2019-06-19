import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 0.95,
    backgroundColor: "white",
    width: Dimensions.get("screen").width,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15
  },
  pulldownBarContainer: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("screen").width
  },
  pulldownBar: {
    backgroundColor: "white",
    borderRadius: 10,
    height: 8,
    width: 100
  },
});

export default styles;