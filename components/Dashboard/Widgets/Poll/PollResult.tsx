import { Box, Grid, LinearProgress, Typography } from '@mui/material';
import { PollOption as PollOptionType } from '../../../../utility/types/trip';
function OptionResults({ option }: { option: PollOptionType }) {
  // TODO:  Helper function to store percentage */}
  return (
    <LinearProgress
      sx={{ borderRadius: '2px', height: '10px' }}
      variant="determinate"
      color="secondary"
      value={50}
    />
  );
}

export default function PollResult({
  options,
}: {
  options: Array<PollOptionType>;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <>
        {/** TODO: Handle whether the option is selected or not. */}
        {options.map((option, index) => {
          return (
            <>
              <Grid container>
                <Grid item xs={10}>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {option.value}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  style={{
                    display: 'flex',
                  }}
                >
                  <Typography
                    style={{
                      textAlign: 'right',
                      width: '100%',
                      fontSize: '12px',
                    }}
                  >
                    {/* TODO: Helper function to store percentage */}
                    55%
                  </Typography>
                </Grid>
              </Grid>
              <OptionResults key={index} option={option} />
            </>
          );
        })}
      </>
    </Box>
  );
}
