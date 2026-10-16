interface payload {
  email: string;
  password: string;
}

export const AuthService = async (payload: payload) => {
  if (payload.email == "narcisoroberto1369@gmail.com" && payload.password == "123") {
    return {
      username: "narciso",
      token: "089",
      role: "user",
    };
  } else {
    return new Error("login incorreto");
  }
};
