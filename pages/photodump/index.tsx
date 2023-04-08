import Typography from "@mui/material/Typography"
import * as GooglePhotosAlbum from "google-photos-album-image-url-fetch"
import { Gallery } from "react-grid-gallery"

const images = [
  {
    src: "https://lh3.googleusercontent.com/hloUy3evAcLYWpVnlaE44C7ybsv3RIm5cXPSGJlsB0-eD2P1ABR9GX6heUbWRg7N6zxRUOU7_DdFb49cUVrMj7hc86cAZia0A_5qVw3UN11pjpFZYcIt-QUbhjDCWmCZDSHekJDDng",
    width: 320,
    height: 212,
    isSelected: true,
    caption: "Graduating elementary school (Colorized Circa 2019)",
  },
  {
    src: "https://lh3.googleusercontent.com/f31UAmlu4OnVB6IL7MTCTAOxyVqzsMKTjzxdim8npPEdvIzhgW0115_Kd-UYQffxEIJ332wLZZhJZuHrWDT9rW2P6YezjoPd4u43eVD5HsmjBjh7dj7qmeGdlMttZe-W4YZy4_YhDg",
    width: 320,
    height: 212,
    tags: [
      { value: "Ocean", title: "Ocean" },
      { value: "People", title: "People" },
    ],
    alt: "Here fishy fishy",
  },

  {
    src: "https://lh3.googleusercontent.com/t6w1cAKmY8xyX8Zq1e8mUa7SSG516CU5X5n4eUZmphQlmTgi5o4khMTXqehGvCaXvqO-ZKXAWtttc3VOXblRseSQeisCWH09MJJpSO1I-mKpuL0JtrqCXut8m8gbKRxBETQE8uEdXA",
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

const imageArray = fetchAndLogUrls().catch((er) => console.error(er))

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
