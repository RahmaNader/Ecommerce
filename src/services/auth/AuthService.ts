interface User {
  id: string;
  userName: string;
  password: string
}

export const AuthService = {
  login: async (userName: string, password: string): Promise<User> => {
    // Mock login logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "1", userName, password });
      }, 1000);
    });
  },

  register: async (userName: string, password: string): Promise<User> => {
    // Mock register logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: "2", userName, password });
      }, 1000);
    });
  },

  logout: async (): Promise<void> => {
    // Mock logout logic
    console.log("User logged out successfully.");
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },
};
