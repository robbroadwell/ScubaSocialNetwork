export default function BaseURL() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:8080"
  } else {
    return "https://www.divingcollective.com"
  }
}