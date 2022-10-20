export default {
  getFilteredErrorMessage(response) {
    const strResponse = String(response);
    if (strResponse.includes("status code 404")) return "errors.notFound";

    return "errors.default";
  },
};
