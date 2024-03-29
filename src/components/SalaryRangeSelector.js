/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { View, Text } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "@react-navigation/native";
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import {
    PanGestureHandler,
} from "react-native-gesture-handler";

const SalaryRangeSelector = ({
    minPrice,
    maxPrice,
    startPrice,
    endPrice,
    onStartPriceChange,
    onEndPriceChange,
    salaryUnit,
}) => {
    const theme = useTheme();
    const [barWidth, setBarWidth] = useState(0);
    const leftHandlePos = useSharedValue(0);
    const rightHandlePos = useSharedValue(0);

    const startHandleGesture = useAnimatedGestureHandler({
        onStart(event, context) {
            context.prevPos = leftHandlePos.value;
        },
        onActive(event, context) {
            leftHandlePos.value = Math.min(
                rightHandlePos.value,
                Math.max(0, context.prevPos + event.translationX)
            );
            const newStartPrice = Math.round((maxPrice / barWidth) * leftHandlePos.value);
            runOnJS(onStartPriceChange)(newStartPrice);
        },
    });

    const rightHandleGesture = useAnimatedGestureHandler({
        onStart(event, context) {
            context.prevPos = rightHandlePos.value;
        },
        onActive(event, context) {
            rightHandlePos.value = Math.min(
                barWidth,
                Math.max(leftHandlePos.value, context.prevPos + event.translationX)
            );
            const newEndPrice = Math.round((maxPrice / barWidth) * rightHandlePos.value);
            runOnJS(onEndPriceChange)(newEndPrice);
        },
    });

    const leftHandleStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: leftHandlePos.value,
            },
        ],
    }));

    const rightHandleStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: rightHandlePos.value,
            },
        ],
    }));

    const barHighlightStyle = useAnimatedStyle(() => ({
        left: leftHandlePos.value,
        right: barWidth - rightHandlePos.value,
    }));

    useEffect(() => {
        if (barWidth === 0) return;

        leftHandlePos.value = (startPrice * barWidth) / maxPrice;
        rightHandlePos.value = (endPrice * barWidth) / maxPrice;
    }, [barWidth]);

    return (
        <View style={{ paddingVertical: 18, }}>

            <View
                style={{
                    height: 4,
                    width: "100%",
                    backgroundColor: theme.colors.border,
                    position: "relative",
                    marginBottom: 16,
                    borderRadius: 10,
                }}
                onLayout={(event) => {
                    setBarWidth(event.nativeEvent.layout.width);
                }}
            >
                <Animated.View
                    style={[
                        barHighlightStyle,
                        {
                            position: "absolute",
                            height: "100%",
                            backgroundColor: "#3b82f6",
                        },
                    ]}
                />

                <PanGestureHandler onGestureEvent={startHandleGesture}>
                    <Animated.View
                        style={[leftHandleStyle, { position: "absolute", zIndex: 10 }]}
                    >
                        <View
                            style={{
                                position: "absolute",
                                height: 48,
                                bottom: 24,
                            }}
                        />
                        <SliderHandle label={salaryUnit === "655de22b9a5b0ffa7ffd5132" ? `${startPrice}k/h` : `${startPrice}tr`} />
                    </Animated.View>
                </PanGestureHandler>

                <PanGestureHandler onGestureEvent={rightHandleGesture}>
                    <Animated.View
                        style={[rightHandleStyle, { position: "absolute", zIndex: 10 }]}
                    >
                        <View
                            style={{
                                position: "absolute",
                                height: 48,
                                bottom: 24,
                            }}
                        />
                        <SliderHandle label={salaryUnit === "655de22b9a5b0ffa7ffd5132" ? `${endPrice}k/h` : `${endPrice}tr`} />
                    </Animated.View>
                </PanGestureHandler>
            </View>
        </View>
    );
};

export default SalaryRangeSelector;

const SliderHandle = ({ label }) => {
    const theme = useTheme();
    return (
        <View
            style={{
                height: 24,
                aspectRatio: 1,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                borderColor: "#3b82f6",
                backgroundColor: "white",
                borderWidth: 2,
                position: "relative",
                top: 2,
                transform: [
                    {
                        translateX: -12,
                    },
                    {
                        translateY: -12,
                    },
                ],
            }}
        >
            <View
                style={{
                    width: 3,
                    height: 3,
                    borderRadius: 10,
                    backgroundColor: "#3b82f6",
                }}
            />
            <View
                style={{
                    position: "absolute",
                    top: 24,
                    width: 200,
                    alignItems: "center",
                }}
            >
                <View style={{ backgroundColor: theme.colors.card }}>
                    <Text numberOfLines={1} style={{ color: theme.colors.text }}>
                        {label}
                    </Text>
                </View>
            </View>
        </View>
    );
};