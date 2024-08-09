// lib/retriever.js
import lunr from "lunr";
import pcPartsData from "../public/data/pcParts.json";

const index = lunr(function () {
  this.field("name");
  this.field("description");
  this.ref("id");

  pcPartsData.forEach(function (doc) {
    this.add(doc);
  }, this);
});

export const searchDocuments = (query) => {
  const results = index.search(query);
  return results.map((result) =>
    pcPartsData.find((doc) => doc.id === result.ref)
  );
};
