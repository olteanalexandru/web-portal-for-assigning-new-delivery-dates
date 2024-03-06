// @ts-nocheck
export const checkAndResize = () => {
  let theGridCollection = document.getElementsByClassName("gridjs-wrapper");

  //console.log("Checking for the grid element...");

  if (theGridCollection.length > 0) {
    const gridElement = theGridCollection[0];

    const observer = new MutationObserver(() => {
      let originalHeight = gridElement.clientHeight;

      if (originalHeight > 0) {
        
        gridElement.style.height = `${originalHeight + 400}px`; 
         //console.log(
        //   "Grid element found! New height: " + gridElement.style.height
        // );
        observer.disconnect();
      }
    });

    // Start observing
    observer.observe(gridElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  } else {
    setTimeout(checkAndResize, 100);
  }};

