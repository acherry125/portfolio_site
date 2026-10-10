function handler(event) {
  var request = event.request;
  var host = request.headers.host.value;
  var uri = request.uri;
  var normalized = uri.replace(/\/index\.html$/, "/");
  var pages = [
    "/",
    "/shelflife/",
    "/the-city/",
    "/worship/",
    "/fema-go/",
    "/oneglobe/",
  ];
  var destination = normalized;

  if (/^\/event-horizon(?:\/|\/index\.html)?$/.test(uri)) {
    return {
      statusCode: 410,
      statusDescription: "Gone",
      headers: {
        "content-type": { value: "text/html; charset=utf-8" },
        "cache-control": { value: "public, max-age=300" },
      },
      body: {
        encoding: "text",
        data: '<!doctype html><html lang="en"><title>Project retired</title><h1>This early prototype is retired</h1><p><a href="https://alexandercherry.com/">Explore Alexander Cherry’s current projects</a></p></html>',
      },
    };
  }

  if (/^\/salt(?:\/|\/index\.html)?$/.test(uri)) {
    destination = "/#salt-title";
  } else {
    var withSlash = normalized.endsWith("/") ? normalized : normalized + "/";
    destination = pages.indexOf(withSlash) >= 0 ? withSlash : uri;
  }

  if (host === "alexandercherry.com" && destination === uri) return request;

  var parts = [];
  var query = request.querystring || {};
  Object.keys(query).forEach(function (key) {
    var values = query[key].multiValue || [query[key]];
    values.forEach(function (item) {
      parts.push(key + "=" + item.value);
    });
  });
  var fragment = destination.split("#");
  var location =
    "https://alexandercherry.com" +
    fragment[0] +
    (parts.length ? "?" + parts.join("&") : "") +
    (fragment.length > 1 ? "#" + fragment[1] : "");
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: {
      location: { value: location },
      "cache-control": { value: "public, max-age=300" },
    },
  };
}
