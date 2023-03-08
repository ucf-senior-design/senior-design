import handler from "../../../../pages/api/auth/loginWithCred"
import { testHandler } from "../../../../__mocks__/fetch"

describe("Test Login Endpoints", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test("[Status 400]: Invalid Provider", async () => {
    const res = await testHandler(handler, {
      body: {
        idToken: "",
        provider: "github",
      },
    })
    expect(res.statusCode).toBe(400)
  })
})
