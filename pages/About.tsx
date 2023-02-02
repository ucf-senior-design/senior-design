import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PublicIcon from '@mui/icons-material/Public';
import Image from 'next/image';
import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

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

export default function About() {
  const theme = useTheme();
  const boxItems = [item1, item2, item3];

  return (
    <>
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          display: 'flex',
        }}
      >
        <Box
          display="flex"
          flexDirection={'column'}
          sx={{ textAlign: 'center' }}
        >
          <Typography variant="h2" color="white" style={{ fontWeight: 500 }}>
            a collaborative approach to group planning
          </Typography>
          <Typography variant="h4" color="white" style={{ fontWeight: 300 }}>
            designed for quick and painless planning, even with lots of moving
            parts
          </Typography>

          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            sx={{ margin: 'auto' }}
          >
            {boxItems.map((item) => (
              <Grid
                container
                key={item.id}
                xs={8}
                direction="column"
                flexWrap={'wrap'}
                sx={{ justify: 'center', alignItems: 'center', margin: 8 }}
              >
                <Card
                  sx={{
                    backgroundColor: 'rgba(14, 14, 20, 0.64)',
                    height: '300px',
                    width: '400px',
                  }}
                >
                  <Container>
                    <Grid
                      container
                      padding={7}
                      direction="column"
                      sx={{ justify: 'center', alignItems: 'center' }}
                    >
                      <Typography
                        variant="h4"
                        marginBottom={1}
                        color="white"
                        sx={{ fontWeight: 'bold' }}
                      >
                        {item.header}
                      </Typography>
                      <Typography color="white">{item.subtitle}</Typography>
                    </Grid>
                  </Container>
                </Card>
              </Grid>
            ))}
          </Box>
        </Box>
      </div>
      <Stack
        style={{
          height: '100%',
          width: '100%',
          display: 'absolute',
          zIndex: 1,
          overflow: 'hidden',
        }}
      >
        <Image
          src="/mountains.svg"
          alt="Landing"
          layout={'fill'}
          objectFit={'cover'}
        />
      </Stack>
    </>
  );
}
