const apiRoute = "/api/v1";

const path = {
  // host: "https://api.jamamasjidgumla.com/wp/wp-json",
  host: "http://localhost:1337/api",
  // host: "http://192.168.29.202:8800",
  ui: {
    root: "/",
    voters: "/voters",
    panchayats: "/panchayat",
  },
  api: {
    auth: {
      root: "/auth",
      login: "/local",
      logout: "/token/revoke",
    },
    voters: {
      root: "/voters",
    },
    panchayats: {
      root: "/panchayats",
    },
  },
};

export default path;
