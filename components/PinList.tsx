import React, { useState } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { PinListProps } from "../types/climappTypes";
import { styles } from "../styles/styles";

const PinList = ({
  pins,
  goToPin,
  handleRemovePin,
  handleShowWeather,
  pinTitles,
}: PinListProps) => {
  return (
    <View style={{ position: "absolute", top: 20, left: 10, zIndex: 10 }}>
      {pins.map((pin, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.mapButtonDefault,
            index == 0 ? styles.mapButtonGreen : styles.mapButtonRed,
          ]}
          onPress={() => goToPin(pin)}
        >
          <Text style={[styles.mapButtonMR, styles.mapButtonText]}>
            {pinTitles[index] || `Pin ${index + 1}`}
          </Text>
          {index > 0 && (
            <>
              <TouchableOpacity
                style={{
                  marginLeft: "auto",
                  backgroundColor: "transparent",
                }}
                onPress={(e) => {
                  e.stopPropagation();
                  handleShowWeather(index);
                }}
              >
                <FontAwesome6 name="cloud-bolt" color="white" size={15} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={(e) => {
                  e.stopPropagation();
                  handleRemovePin(index);
                }}
                style={{
                  marginLeft: 10,
                  backgroundColor: "transparent",
                }}
              >
                <FontAwesome name="remove" color="white" size={15} />
              </TouchableOpacity>
            </>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PinList;
