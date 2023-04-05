export function mockAllFetch(
  isOk: boolean,
  status: number,
  customResponse?: Array<{
    path: string
    status: number
    ok: boolean
    json: () => Promise<any>
  }>,
) {
  global.fetch = jest.fn((req: string, options: any) => {
    // Check to make

    if (customResponse !== undefined) {
      let path = req.replace(process.env.NEXT_PUBLIC_API_URL ?? "", "")

      let map = new Map(customResponse.map((response) => [response.path, response]))

      if (map.has(path)) {
        let response = map.get(path) as any

        return Promise.resolve({
          status: response.status,
          ok: response.ok,
          json: response.json,
        })
      }
    }

    if (req.endsWith("suggestion/add/uid")) {
      return Promise.resolve({
        status: status,
        ok: isOk,
        json: () =>
          Promise.resolve({
            uid: "uid",
            likes: ["user"],
            owner: "owner",
          }),
      })
    }

    if (req.endsWith("trip/") && options.method === "GET") {
      return Promise.resolve({
        status: status,
        ok: isOk,
        json: () =>
          Promise.resolve({
            duration: {
              start: new Date(),
              end: new Date(),
            },
          }),
      })
    }

    if (
      req.startsWith(`${process.env.NEXT_PUBLIC_API_URL}/trip//polls/vote/`) &&
      options.method === "PUT"
    ) {
      return Promise.resolve({
        status: status,
        ok: isOk,
        json: () =>
          Promise.resolve({
            value: "value",
            voters: new Array<string>(""),
          }),
      })
    }

    return Promise.resolve({
      status: status,
      ok: isOk,
      json: () => Promise.resolve({}),
    })
  }) as any
}
