import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { SIZES, icons } from "../../../constants";

const jobTypes = [
  { name: "To'liq bandlik", key: "Full-time" },
  { name: "Qisman bandlik", key: "Part-time" },
  { name: "Shartnoma asosida", key: "Contractor" },
];

function Welcome({ searchTerm, setSearchTerm, handleClick }) {
  const router = useRouter();
  const [activeJob, setActiveJob] = useState("Full-time");
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Assalomu alaykum, Abbosbek!</Text>
        <Text style={styles.welcomeMessage}>
          O'zingizga mos ishni aynan shu yerdan toping!
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => {
              setSearchTerm(text);
            }}
            placeholder="Qanday ish qidiryapsiz?"
          />
        </View>
        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
          <Image source={icons.search} style={styles.searchBtnImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.tab(activeJob, item.key)}
                onPress={() => {
                  setActiveJob(item.key);
                  router.push(`/search/${item.key}`);
                }}
              >
                <Text style={styles.tabText(activeJob, item.key)}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.key}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
}

export default Welcome;
