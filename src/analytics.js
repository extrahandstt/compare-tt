import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-YRB3Z32K6F");
};

export const trackPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });
};