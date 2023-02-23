import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Gallery from 'react-photo-gallery';
import { samplephotos } from '../../src/samplephotos';
import { samplephotos2 } from '../../src/samplephotos2';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import { firebaseStorage } from '../../utility/firebase';

export default function Photodump() {
  // State to store uploaded file
  const [file, setFile] = useState('');
  const BasicRows = () => <Gallery photos={samplephotos2} />;

  // state to store progress data
  const [percent, setPercent] = useState(0);

  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  function handleUpload() {
    if (!file) {
      alert('Please select a file to upload.');
    }
    const storageRef = ref(firebaseStorage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        // update upload progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
        });
      }
    );
  }
  return (
    <>
      <Typography variant="h1">
        <b>PhotoDump</b> trip_name
      </Typography>

      {/* <h1> PLACEHOLDER TEXT :P</h1> */}
      <BasicRows />
      <Gallery photos={samplephotos} targetRowHeight={1} />
      <Box textAlign={'center'}>
        <br />
        <Button
          variant="contained"
          component="label"
          size="large"
          onClick={handleUpload}
          onChange={handleChange}
        >
          Upload Photo
          <input hidden accept="image/*" multiple type="file" />
        </Button>

        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          size="large"
        >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
        <Button variant="contained" component="label" size="large">
          Download All
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Box>
      <p>{percent}% done</p>
    </>
  );
}
