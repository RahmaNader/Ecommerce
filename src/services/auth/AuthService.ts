interface User {
  id: string;
  username: string;
  email: string;
}

export const AuthService = {
  login: async (email: string, password: string): Promise<User> => {
    // Mock login logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "1", username: "JohnDoe", email });
      }, 1000);
    });
  },

  register: async (username: string, email: string, password: string): Promise<User> => {
    // Mock register logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "2", username, email });
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    // Mock logout logic
    console.log("User logged out successfully."); // For debugging
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },
};
