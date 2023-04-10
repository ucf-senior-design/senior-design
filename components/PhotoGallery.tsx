import Box from "@mui/material/Box"
import * as GooglePhotosAlbum from "google-photos-album-image-url-fetch"
import { Gallery, Image } from "react-grid-gallery"
import { useState } from "react"
import { API_URL } from "../utility/constants"
import { createFetchRequestOptions } from "../utility/fetch"
import React from "react"
import { Typography } from "@mui/material"

export default function PhotoGallery({ url }: { url: string }) {
  const [images, setImages] = useState<Image[]>([])

  async function formatImageArray(albumUrl: string) {
    let formatted: Image[] = []

    const options = createFetchRequestOptions(JSON.stringify({ url: albumUrl }), "POST")
    let response = await fetch(`${API_URL}/images`, options)

    if (response.ok) {
      let { data } = await response.json()

      let unformatted = data
      if (unformatted === null || unformatted === undefined) return [] // make this an error

      for (let i = 0; i < unformatted.length; i++) {
        let currUnformattedImage: GooglePhotosAlbum.ImageInfo = unformatted[i]
        let formattedImage: Image = { src: currUnformattedImage.url, width: 320, height: 212 } // fill this in
        formatted.push(formattedImage)
      }

      return formatted
    }

    return []
  }

  async function getImages() {
    let res = await formatImageArray(url)
    setImages(res)
  }

  React.useEffect(() => {
    console.log("getting images...")
    getImages()
  }, [])

  return (
    <Box
      sx={{
        width: "100%",
        height: "300px",

        maxWidth: "100%",
        overflow: "auto",
        padding: "10px",
      }}
    >
      {images.length > 0 && <Gallery images={images} />}
      {images.length === 0 && <Typography sx={{ fontWight: "bold" }}> No images found </Typography>}
    </Box>
  )
}
