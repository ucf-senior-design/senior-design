import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import Gallery from 'react-photo-gallery';
import { samplephotos } from './samplephotos';
import { samplephotos2 } from './samplephotos2';

export default function Photodump() {
  const BasicRows = () => <Gallery photos={samplephotos2} />;

  return (
    <>
      <Typography variant="h1">
        <b>PhotoDump</b> trip_name
      </Typography>
      <Box textAlign={'center'}>
        <Button variant="contained" component="label" size="large">
          Upload
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
      </Box>

      {/* <h1> PLACEHOLDER TEXT :P</h1> */}
      <BasicRows />
      <Gallery photos={samplephotos} targetRowHeight={1} />
    </>
  );
}
