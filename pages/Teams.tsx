import { Grid, Stack } from '@mui/material';
import Image from 'next/image';
import { TeamCreation } from '../components/Dashboard/Widgets/TeamComponents/TeamCreation';


export default function Teams() {
    return (
        <div style={$wrapper}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TeamCreation />
            <Stack
              sx={{ display: { xs: 'none', md: 'block' } }}
              style={{
                height: '30%',
                width: '30%',
                display: 'absolute',
                zIndex: 1,
              }}
            >
              <Image src="/teams.svg" alt="Photos" width={700} height={700} />
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