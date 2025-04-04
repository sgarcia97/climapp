import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { PinListProps } from "../types/climappTypes";
import { styles } from "../styles/styles";

const PinList = ({
  pins,
  goToPin,
  handleRemovePin,
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
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PinList;
