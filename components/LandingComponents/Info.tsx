import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PublicIcon from '@mui/icons-material/Public';
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Home.module.css';

const item1 = {
  id: 1,
  icon: PersonAddAlt1Icon,
  header: 'convenient collabs',
  subtitle:
    "invite all your friends to your trip and plan quickly and easily, with everyones' interests in mind",
};
const item2 = {
  id: 2,
  icon: PublicIcon,
  header: 'global information',
  subtitle:
    'let our widgets and APIs grab all the information you need to plan your dream trip',
};
const item3 = {
  id: 2,
  icon: MenuBookIcon,
  header: 'create the itinerary',
  subtitle:
    'after consulting the extensive trip document, create an itinerary that everyone can see and enjoy',
};

export default function Info() {
  const theme = useTheme();
  const boxItems = [item1, item2, item3];

  return (
    <div
      style={{
        background:
          'linear-gradient(180deg, #3F3D56 0%, #403F59 44.79%, #5F9DF7 100%)',
        paddingTop: 100,
        margin: 0,
        width: '100vw',
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* <Grid
        container
        xs={8}
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <text style={{ fontWeight: 500, color: 'white', fontSize: 32 }}>
          a collaborative approach to group planning.
        </text>
        <Typography variant="h6" style={{ fontWeight: 300, color: 'white' }}>
          designed for quick and painless planning, even with lots of moving
          parts
        </Typography>
      </Grid> */}

      <Box
        display="flex"
        flexDirection={'row'}
        flexWrap={'wrap'}
        sx={{ margin: 'auto', alignItems: 'center', justifyContent: 'center' }}
      >
        {boxItems.map((item) => (
          <Grid
            container
            key={item.id}
            xs={8}
            direction="column"
            sx={{ justify: 'center', alignItems: 'center', margin: 3 }}
          >
            <item.icon style={{ fontSize: '500%', color: 'white' }} />
            <Card sx={{ backgroundColor: 'transparent' }}>
              <Container>
                <Grid
                  container
                  padding={5}
                  direction="column"
                  sx={{ justify: 'center', alignItems: 'center' }}
                >
                  <Typography
                    variant="h4"
                    marginBottom={1}
                    color="white"
                    textAlign={'center'}
                  >
                    {item.header}
                  </Typography>
                  <Typography color="white">{item.subtitle}</Typography>
                </Grid>
              </Container>
            </Card>
          </Grid>
        ))}
       
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            height: 200,
          }}
        >
          <Image
            src="/Mountains.svg"
            alt="Landing"
            layout={'fill'}
            objectFit={'cover'}
          />
        </div>
      </Box>
    </div>
  );
}
