import { Box, Grid, Typography } from '@mui/material';
import Avatar from '../../Avatar';

export default function WidgetHeader({
  owner,
  rightAccessory,
}: {
  owner: string;
  rightAccessory?: React.ReactNode;
}) {
  return (
    <Grid
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
      }}
    >
      <Grid
        item
        xs={8}
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <Avatar name={owner} size={30} />
        <Typography sx={{ fontWeight: 600 }}>by {owner} </Typography>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        {rightAccessory}
      </Grid>
    </Grid>
  );
}
