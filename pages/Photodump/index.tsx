import Typography from "@mui/material/Typography"
import * as GooglePhotosAlbum from "google-photos-album-image-url-fetch"
import { Gallery } from "react-grid-gallery"

const images = [
  {
    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
    width: 320,
    height: 174,
    isSelected: true,
    caption: "After Rain (Jeshu John - designerspics.com)",
  },
  {
    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
    width: 320,
    height: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    alt: "Boats (Jeshu John - designerspics.com)",
  },

  {
    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
    width: 320,
    height: 212,
  },
]

async function fetchAndLogUrls() {
  const photoArray = await GooglePhotosAlbum.fetchImageUrls(
    "https://photos.app.goo.gl/Pf9JFXUARNfN3Qhr7",
  )
  let stringified = JSON.stringify(photoArray, null, 2)
  console.log(stringified)

  return photoArray
}

// Should take a Google Photos response and convert it into the format accepted by readt grid library.
function convertImageInfo() {}

const imageArray = fetchAndLogUrls()

export default function canvas() {
  return (
    <>
      <Typography variant="h1">
        <b>PhotoDump</b> trip_name
      </Typography>

      <Gallery images={images} />
    </>
  )
}
