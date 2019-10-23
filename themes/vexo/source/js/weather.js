(function (a, h, g, f, e, d, c, b) {
    b = function () {
        d = h.createElement(g);
        c = h.getElementsByTagName(g)[0];
        d.src = e;
        d.charset = "utf-8";
        d.async = 1;
        c.parentNode.insertBefore(d, c)
    };
    a["SeniverseWeatherWidgetObject"] = f;
    a[f] || (a[f] = function () {
        (a[f].q = a[f].q || []).push(arguments)
    });
    a[f].l = +new Date();
    if (a.attachEvent) {
        a.attachEvent("onload", b)
    } else {
        a.addEventListener("load", b, false)
    }
}
    (window, document, "script", "SeniverseWeatherWidget", "//cdn.sencdn.com/widget2/static/js/bundle.js"));
window.SeniverseWeatherWidget('show', {
    flavor: "slim",
    location: "WWMT5Q64CR3G",
    geolocation: true,
    language: "auto",
    unit: "c",
    theme: "auto",
    token: "2cdad975-7aeb-4781-ad5a-942548537e87",
    hover: "enabled",
    container: "tp-weather-widget"
})
