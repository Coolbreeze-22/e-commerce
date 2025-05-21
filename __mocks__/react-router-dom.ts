export const useNavigate = jest.fn();
export const useParams = jest.fn();
export const useLocation = jest.fn();
export const Link = jest.fn().mockImplementation(({ children }) => children);
// export const Outlet = jest.fn().mockImplementation(({ children }) => children);
