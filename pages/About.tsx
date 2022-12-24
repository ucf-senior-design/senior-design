import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PublicIcon from '@mui/icons-material/Public';
import { Box, Card, Container, Grid, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const item1 = {
    id: 1,
    icon: PersonAddAlt1Icon,
    header: "Convenient Collabs",
    subtitle: "invite all your friends to your trip and plan quickly and easily, with everyones' interests in mind"
}
const item2 = {
    id: 2,
    icon: PublicIcon,
    header: "Global Information",
    subtitle: "let our widgets and APIs grab all the information you need to plan your dream trip"
}
const item3 = {
    id: 2,
    icon: MenuBookIcon,
    header: "Create the Itinerary",
    subtitle: "after consulting the extensive trip document, create an itinerary that everyone can see and enjoy"
}

export default function About() {
    const theme = useTheme();
    const boxItems = [item1, item2, item3];

    return (
        <div>
            <main>
                <Grid container>

                    <Grid container xs={8} sx={{m:3, mx:5}}>
                        <Typography variant='h2' style={{fontWeight:500, color:theme.palette.highlight.main}}>
                            a collaborative approach to group planning.
                        </Typography>
                        <Typography variant='h4' style={{fontWeight:300, color:theme.palette.highlight.main}}>
                            designed for quick and painless planning, even with lots of moving parts
                        </Typography>
                    </Grid>

                    <Box display='flex' flexDirection={{ xs: 'column', sm: 'row' }} sx={{margin:'auto'}}>

                        {boxItems.map(item => (
                            <Grid container key={item.id} xs={8} direction="column" sx={{justify:'center', alignItems:'center', margin:3}}>
                                <item.icon style={{fontSize:'500%'}}/>
                                <Card sx={{backgroundColor:theme.palette.tertiary.main}}>
                                    <Container>
                                        <Grid container padding={5} direction="column" sx={{justify:'center', alignItems:'center'}}>
                                            <Typography variant='h4' marginBottom={1} color='white'>{item.header}</Typography>
                                            <Typography color='white'>{item.subtitle}</Typography>
                                        </Grid>
                                    </Container>
                                </Card>
                            </Grid> 
                        ))}
                    </Box>
                    
                </Grid>

                <div className={[styles.elementToHide, styles.mountains].join(" ")}>
                    <Image src='/Mountains.svg' alt="Image of Mountains" layout="fill" />
                </div>
                
            </main>
        </div>
    )
}