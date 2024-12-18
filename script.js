import { check } from "k6";
import http from "k6/http";

http.setResponseCallback(http.expectedStatuses({ min: 200, max: 300 }));

export const options = {
  scenarios: {
    my_scenario1: {
      executor: "constant-arrival-rate",
      duration: "1m",
      preAllocatedVUs: 100,
      rate: 100, // number of constant iterations given `timeUnit`
      timeUnit: "1s",
    },
  },
};

export default function () {
  const headers = { "Content-Type": "application/json" };
  const res = http.get(
    "https://test-api.freecodecamp.dev/api/users/get-public-profile?username=testuser",
    {},
    { headers }
  );

  if (!(res.status === 200)) {
    console.log("Failed to get the user profile");
    console.log(res);
  }

  check(res, {
    "status is 200": (res) => res.status === 200,
  });
}
