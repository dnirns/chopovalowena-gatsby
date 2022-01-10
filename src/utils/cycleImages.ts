/* eslint-disable @typescript-eslint/no-explicit-any */

// for for cycling through images in a component
// used in product and gallery sliders

export const cycleImages = (
  direction: number, // 1 or -1 to increment or decrement
  images: any[], // array of images
  selectedImage: number, // index of selected image
  setSelectedImage: (num) => void // set state function for selected image index
) => {
  const newIndex = selectedImage + direction
  if (newIndex < 0) {
    setSelectedImage(images.length - 1)
  } else if (newIndex >= images.length) {
    setSelectedImage(0)
  } else {
    setSelectedImage(newIndex)
  }
}
