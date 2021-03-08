const API_BASE = "http://localhost:8081/?geizhals_url=";

export async function crawl(url) {
  let response = await fetch(API_BASE + encodeURIComponent(url));

  return await response.json();
}
