export default {
  presets: [
    ["@babel/preset-env"],
    ["@babel/preset-react"],
    ["@babel/preset-typescript", { tsconfig: "./tsconfig.test.json" }],
  ],
};

// be wary of runtime autumatic. check the meaning
// ["@babel/preset-react", { runtime: "automatic" }],
