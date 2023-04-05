import BallotIcon from "@mui/icons-material/Ballot"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1"
import PublicIcon from "@mui/icons-material/Public"
import WbSunnyIcon from "@mui/icons-material/WbSunny"
import { Card, Grid, Typography, useTheme } from "@mui/material"

const item1 = {
  id: 1,
  icon: PersonAddAlt1Icon,
  header: "convenient collabs",
  subtitle:
    "invite all your friends to your trip and plan quickly and easily, with everyones' interests in mind",
}
const item2 = {
  id: 2,
  icon: PublicIcon,
  header: "global information",
  subtitle: "let our widgets and APIs grab all the information you need to plan your dream trip",
}
const item3 = {
  id: 3,
  icon: MenuBookIcon,
  header: "create the itinerary",
  subtitle:
    "after consulting the extensive trip document, create an itinerary that everyone can see and enjoy",
}
const item4 = {
  id: 4,
  icon: BallotIcon,
  header: "create polls",
  subtitle:
    "finding it hard to decide? utilize our poll widget and let the majority determine the best option!",
}
const item5 = {
  id: 5,
  icon: LightbulbIcon,
  header: "suggest an idea",
  subtitle: "get inspiration from your attendees by using our suggestion widget to gather ideas",
}
const item6 = {
  id: 6,
  icon: WbSunnyIcon,
  header: "check the weather",
  subtitle:
    "preview the week's forecast with our weather widget to plan your trip with confidence.",
}

export default function About() {
  const theme = useTheme()
  const boxItems = [item1, item2, item3, item4, item5, item6]

  return (
    <>
      <div
        style={{
          padding: "30px",
          overflowY: "auto",
          width: "100%",
          height: "100%",
          display: "flex",
          gap: 0,
          flexDirection: "column",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Typography
            variant="h2"
            color="white"
            style={{ fontWeight: 500 }}
            sx={{
              fontSize: { xs: "40px", md: "50px" },
            }}
          >
            a collaborative approach to group planning
          </Typography>
          <Typography
            variant="h4"
            color="white"
            sx={{
              fontSize: { xs: "30px", md: "40px" },
            }}
            style={{ fontWeight: 300 }}
          >
            designed for quick and painless planning, even with lots of moving parts
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {boxItems.map((item) => (
            <Card
              key={item.id}
              sx={{
                backgroundColor: "transparent",
                height: "400px",
                flexDirection: "column",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "450px",
              }}
            >
              <Grid
                container
                paddingRight={4}
                paddingLeft={4}
                direction="column"
                sx={{ justify: "center", alignItems: "center" }}
              >
                <item.icon
                  style={{
                    fontSize: "100px",
                    color: "white",
                    marginBottom: "10px",
                  }}
                />
                <Typography
                  variant="h4"
                  marginBottom={1}
                  color="white"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {item.header}
                </Typography>
                <Typography color="white" sx={{ fontSize: "20px" }}>
                  {item.subtitle}
                </Typography>
              </Grid>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
