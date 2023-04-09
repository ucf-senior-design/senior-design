interface photoProps {
  src: string
  width: number
  height: number
}

export default function Photo(props: photoProps) {
  const {
    src = "https://lh3.googleusercontent.com/pw/AMWts8D5yj4y1ZiRUnc99Wqkxbf8G_pzhz1A38s5B1TmohaWAqZswUD4lPFIAwuy2hYXVm4YrldG5DveZdomoiULS482-WF3XVMZ-jguMeqY611MCl9OBSw",
    width = 320,
    height = 212,
  } = props
  return <></>
}
