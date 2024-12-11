import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import Html from "react-pdf-html";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    marginBottom: 5,
    textAlign: "center",
  },
  content: {
    fontSize: 12,
    margin: 0,
  },
});

const stylesheet = {
  h2: {
    fontSize: 18,
    marginBottom: 5,
  },
  p: {
    margin: 0,
    fontSize: 12,
    marginBottom: 10,
  },
};

// Create Document Component
const PDFformat = ({ heading, content }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.heading}>{heading}</Text>
        <Html stylesheet={stylesheet}>{content}</Html>
      </View>
    </Page>
  </Document>
);

export default PDFformat;
