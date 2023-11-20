import { useState, useEffect } from "react";

type UseAspectRatio = (width: number, height: number) => AspectRatio;

interface AspectRatio {
  width: number;
  height: number;
}

function calculateAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): AspectRatio {
  const srcRatio = srcWidth / srcHeight;

  // Calculate the width and height with the same aspect ratio
  // bounded by maxWidth and maxHeight
  let width = maxWidth;
  let height = maxWidth / srcRatio;

  // If the calculated height is greater than maxHeight, recalculate both
  if (height > maxHeight) {
    height = maxHeight;
    width = maxHeight * srcRatio;
  }

  return { width, height };
}

const useAspectRatio: UseAspectRatio = (width, height) => {
  const [dimensions, setDimensions] = useState<AspectRatio>({ width, height });

  useEffect(() => {
    const updateSize = () => {
      // Calculate max width and height of the window while maintaining the aspect ratio
      const newDimensions = calculateAspectRatioFit(
        width,
        height,
        window.innerWidth,
        window.innerHeight
      );
      setDimensions(newDimensions);
    };

    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);
    updateSize(); // Calculate initial dimensions

    // Cleanup
    return () => window.removeEventListener("resize", updateSize);
  }, [width, height]); // Only re-run if width or height props change

  return dimensions;
};

export default useAspectRatio;
