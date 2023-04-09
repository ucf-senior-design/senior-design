import Box from "@mui/material/Box"
import * as GooglePhotosAlbum from "google-photos-album-image-url-fetch"
import { Gallery, Image } from "react-grid-gallery"
import { useState, useEffect } from "react"

// interface formattedImageInfo {
//   src: string
//   width: number
//   height: number
//   tags?: string[]
//   caption?: string
//   isSelected?: boolean
// }

let images = [
  {
    src: "https://lh3.googleusercontent.com/hloUy3evAcLYWpVnlaE44C7ybsv3RIm5cXPSGJlsB0-eD2P1ABR9GX6heUbWRg7N6zxRUOU7_DdFb49cUVrMj7hc86cAZia0A_5qVw3UN11pjpFZYcIt-QUbhjDCWmCZDSHekJDDng",
    width: 320,
    height: 212,
    isSelected: true,
    caption: "Graduating elementary school (Colorized Circa 2019)",
  },
]

async function test(url: string) {
  //   let formatted: galleryImage[] = [
  //     {
  //       src: "https://lh3.googleusercontent.com/hloUy3evAcLYWpVnlaE44C7ybsv3RIm5cXPSGJlsB0-eD2P1ABR9GX6heUbWRg7N6zxRUOU7_DdFb49cUVrMj7hc86cAZia0A_5qVw3UN11pjpFZYcIt-QUbhjDCWmCZDSHekJDDng",
  //       width: 320,
  //       height: 212,
  //       isSelected: true,
  //       caption: "Graduating elementary school (Colorized Circa 2019)",
  //     },
  //   ]
  //   const resultArray: any = await GooglePhotosAlbum.fetchImageUrls(url)
  //     .then(function (result) {
  //       return result
  //     })
  //     .catch((er) => console.log(er))
  //       if (resultArray !== undefined && resultArray!== null){
  //           for (let i = 0; i < resultArray.size; i++) {
  //             formatted.push(resultArray[i])
  //           }
  //       }
  //   console.log(formatted)
  //   return formatted
  //   let stringified = JSON.stringify(photoArray, null, 2)
  //   console.log(stringified)
}
async function fetchAndLogUrls(url: string) {
  const formattedArray: Image[] | undefined = await GooglePhotosAlbum.fetchImageUrls(url).then(
    (onResolved) => {
      let array: Image[] | undefined

      onResolved?.forEach((image) => {
        const formattedImage: Image = { src: image.url, width: 220, height: 212 }

        if (image === undefined) {
          console.log("IMAGE UNDEFINED")
          return
        }
        if (array !== undefined) {
          console.log(formattedImage)
          array.push(formattedImage)
        }
        console.log("===================")
      })
      console.log(array)
      return array
    },
  )

  return formattedArray
  //   let stringified = JSON.stringify(photoArray, null, 2)
  //   console.log(stringified)
}

function convertImageInfo(image: any) {
  //   let formatted = { url = image.url }

  fetchAndLogUrls("https://photos.app.goo.gl/Pf9JFXUARNfN3Qhr7").catch((er) => {
    console.error(er)
  })
}

async function formatImageArray(albumUrl: string = "https://photos.app.goo.gl/Pf9JFXUARNfN3Qhr7") {
  let formatted: Image[] = []

  let unformatted = await GooglePhotosAlbum.fetchImageUrls(albumUrl).catch((er) => console.log(er))

  if (unformatted === null || unformatted === undefined) return [] // make this an error

  for (let i = 0; i < unformatted.length; i++) {
    let currUnformattedImage: GooglePhotosAlbum.ImageInfo = unformatted[i]
    let formattedImage: Image = { src: currUnformattedImage.url, width: 320, height: 212 } // fill this in
    formatted.push(formattedImage)
  }
  return formatted
}

export default function PhotoGallery({ url }: { url: string }) {
  const [images, setImages] = useState<Image[]>([])
  formatImageArray(url).then((res) => {
    console.log(res[0])
    setImages(res) // lgtm🕺🤓
    // console.log(images) // LLLLL
  })

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Gallery images={images} />
    </Box>
  )
}

// MT (2x)
