// const baseURL = "http://foo.localhost:8000/api";
const baseURL = "http://staging.api.tournament.clpdc.local/api";
const getToken = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("key");
  const activitySlug = urlParams.get("activity_slug");
  return { token, activitySlug };
};

const sendScore = (score) => {
  const urlData = getToken();
  const body = {
    score,
    token: urlData.token,
    activity_slug: urlData.activitySlug,
  };

  fetch(`${baseURL}/activities/store/score`, {
    method: "post", // Default is 'get'
    body: JSON.stringify(body),
    mode: "cors",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "X-Requested-With": "XMLHttpRequest",
    }),
  })
    .then((res) => {})
    .catch((err) => {});
};
