import { Box, Typography } from '@mui/material';
import Avatar from '../../Avatar';

export default function WidgetHeader({ owner }: { owner: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 1,
      }}
    >
        
      <Avatar name={owner} />
      <Typography sx={{ fontWeight: 600 }}>by {owner} </Typography>
    </Box>
  );
}
