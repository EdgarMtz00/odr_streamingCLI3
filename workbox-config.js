module.exports = {
  maximumFileSizeToCacheInBytes: 5000000,
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{unityweb,json,js,ico,png,svg,html,txt,css}"
  ],
  "swDest": "public\\sw.js",
  "swSrc": "src-sw.js",
};