import "@testing-library/jest-dom";

// Note: 1) you can also mock here and it will be global, without needing the path to be added to modulenamemapper.
//       2) mocking custom module in __mocks__ and ading the path to modulenamemapper may not work, but will work for modules that are packages e.g useNavigate, usedispatch bcos they use absolute import path and not relative

// jest.mock("../components/utils/IntersectionObserver", () => jest.fn(() => jest.fn()));
