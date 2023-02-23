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
          paddingBottom: 40,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
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
              alignItems="stretch"
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
                  borderWidth: 2,
                  width:'100%',
                  padding: 10,
                  margin: 5
                }}
                >
                  <Typography style={{fontSize: 15}}><img src="/user.svg" alt="user image" width={15} height={15} style={{display: 'inline-block',}}/> {item.name}</Typography>
                </Paper>))}
             <p>
          <Typography
            style={{ color: theme.palette.secondary.main, paddingBottom: 15, fontSize:18}}
          >
            search users by username:
          </Typography>
          <p>
          <TextField id="outlined-basic" label="Outlined" variant="outlined" /></p>
          <Button variant="outlined" >add to team</Button>
             </p>
            </Grid>
          </form>

        </Grid>
      </Paper>
    );
  };
  