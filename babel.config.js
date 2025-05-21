export default {
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react", { runtime: "automatic" }],

    ["@babel/preset-typescript", { tsconfig: "./tsconfig.test.json" }],
  ],
};
