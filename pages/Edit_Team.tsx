import { Grid, Stack } from '@mui/material';
import { TeamEdit } from '../components/Dashboard/Widgets/TeamComponents/TeamEditForm';


export default function Teams() {
    return (
        <div style={$wrapper}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TeamEdit />
            <Stack
              sx={{ display: { xs: 'none', md: 'block' } }}
              style={{
                height: '30%',
                width: '30%',
                display: 'absolute',
                zIndex: 1,
              }}
            >
            </Stack>
          </Grid>
        </div>
      );
    }
    
    const $wrapper: React.CSSProperties = {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };