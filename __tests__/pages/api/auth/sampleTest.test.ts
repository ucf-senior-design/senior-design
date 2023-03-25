import handler from "../../../../pages/api/testendpoint"
import { testHandler } from "../../../../__mocks__/fetch"

describe("Test Sample Endpoints", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  test("[Status 200]: Success", async () => {
    const res = await testHandler(handler, {
      body: {
        idToken: "",
        provider: "github",
      },
    })
    expect(res.statusCode).toBe(200)
  })
})
