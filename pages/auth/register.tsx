import { Grid, Stack } from "@mui/material"
import Image from "next/image"
import { RegisterForm } from "../../components/AuthComponents/RegisterComponents/RegisterForm"

export default function Register() {
  return (
    <div style={$wrapper}>
      <Grid container direction="row" justifyContent="space-around" alignItems="center">
        <RegisterForm />
        <Stack
          sx={{ display: { xs: "none", md: "block" } }}
          style={{
            height: "30%",
            width: "30%",
            display: "absolute",
            zIndex: 1,
          }}
        >
          <Image src="/auth.svg" alt="Photos" width={700} height={700} />
        </Stack>
      </Grid>
    </div>
  )
}

const $wrapper: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}
