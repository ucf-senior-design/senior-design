import { ThemeProvider } from "@mui/material"
import Link from "next/link"
import theme from "../../styles/theme/Theme"

export const LinkButton = ({ text, link }: { text: any; link: any }) => {
  return (
    <ThemeProvider theme={theme}>
      <Link href={link} passHref style={{ textDecoration: "underline" }}>
        {text}
      </Link>
    </ThemeProvider>
  );
}

export default LinkButton
