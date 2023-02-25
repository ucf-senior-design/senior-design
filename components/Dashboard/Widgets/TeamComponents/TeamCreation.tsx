import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import theme from '../../../../styles/theme/Theme';


  export const TeamCreation = () => {
    const [teamInfo, sTeamInfo] = useState({
        members: [],
      });
    const item1 = {username:'username', id:'123', name:'noriyuki'}
    const item2 = {username:'username2', id:'456', name:'minoru'}
    const example = [item1, item2]
  
    return (
      <Paper
        elevation={3}
        style={{
          maxWidth: '900px',
          width: '80vw',
          background: theme.palette.background.paper,
          padding: 20,
          paddingBottom: 20,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          display="flex"
        >
          <Typography
            variant="h4"
            style={{
              fontWeight: 500,
              color: theme.palette.secondary.main,
              padding: 5,
            }}
          >
            create your team
          </Typography>
          <Typography
            style={{ color: theme.palette.secondary.main, paddingBottom: 15, fontSize:18}}
          >
            currently added members:
          </Typography>
          <form>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              display="flex"
            >
                {example.map((item) => (
                <Paper
                key={item.id}
                square={false}
                style={{
                  display: 'inline-block',
                  borderRadius: 5,
                  backgroundColor: '#efefef',
                  borderColor: '#3f3e55',
                  borderStyle: 'solid',
                  borderWidth: 1.5,
                  width:'100%',
                  padding: 10,
                  margin: 5
                }}
                >
                  <Grid container direction="row" alignItems="center">
                  <img src="/user.svg" alt="user image" width={13} height={13} style={{display: 'inline-block',}}/>
                  <Typography style={{fontSize: 15}}>&nbsp;&nbsp;{item.name}</Typography>
                  </Grid>
                </Paper>))}
                
                <p></p>
                  <Typography
                  style={{ color: theme.palette.secondary.main, fontSize:18, paddingBottom: 15}}
                  >
                  search users by username:
                  </Typography>
                  <form>
                  <TextField
                    color="secondary"
                    size="small"
                    sx={{ paddingBottom:1 }}
                  />
                  </form>
                  
                    <Button
                  variant="outlined"
                  sx={{ borderRadius: 1 }}
                  size="small"
                  aria-label="add to team"
                  > add to team
                  </Button>
                <p></p>
                <p>
                  <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ borderRadius: 1 }}
                  aria-label="create team"
                  > create team
                  </Button>
                </p>

            </Grid>
          </form>

        </Grid>
      </Paper>
    );
  };
  