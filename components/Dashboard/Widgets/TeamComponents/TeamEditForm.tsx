import DeleteIcon from '@mui/icons-material/Delete';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Button, Paper, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import theme from '../../../../styles/theme/Theme';


  export const TeamEdit = () => {
    const item1 = {username:'username', id:'123', name:'noriyuki'}
    const item2 = {username:'username2', id:'456', name:'minoru'}
    const example = [item1, item2]
    const teamname = "example team"
  
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
            editing team
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontWeight: 300,
              color: theme.palette.secondary.main,
              fontStyle: 'italic',
            }}
            >
                &quot;{teamname}&quot;
          </Typography>
          <p></p>

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
                  borderColor: '#3f3e55',
                  borderStyle: 'solid',
                  borderWidth: 1.5,
                  width:'100%',
                  padding: 10,
                  margin: 5
                }}
                >
                    <List>
                        
                        <ListItem
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                            </IconButton>
                        }
                        >
                        <ListItemAvatar>
                            <PersonOutlineIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                        />
                        </ListItem>
                    </List>
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
                > 
                    add to team
                </Button>
                <p></p>

                <p>
                  <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ borderRadius: 1 }}
                  aria-label="create team"
                  > 
                    save team
                  </Button>
                </p>

            </Grid>
          </form>

        </Grid>
      </Paper>
    );
  };
  