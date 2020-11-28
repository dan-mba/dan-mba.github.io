// Fix Safari Lazy Load Image issue
export const onClientEntry = async () => {
  if (typeof IntersectionObserver === "undefined") {
    await import("intersection-observer");
    console.log("IntersectionObserver polyfilled ;)");
  }
};