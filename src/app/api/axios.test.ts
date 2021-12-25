import { AxiosResponse } from "axios";
import MockAdapter from "axios-mock-adapter";

import axios from "./axios";

const mock = new MockAdapter(axios);

describe("test axios configuration", () => {


  test("should fetch from default url", async () => {
    mock.onGet("/Classes").reply(200, {
      records: [],
    });

    await axios.get("/Classes")
      .then((response: AxiosResponse) => {
        expect(response.config.baseURL).toEqual("https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/");
        expect(response.config.headers!['Authorization']).toEqual('Bearer keyKC4VMqtYegcUS5');
      })
  })

  test("should not set authorization key", async () => {
    mock.onGet("/").reply(200, {
      records: [],
    });

    await axios({ method: "GET", baseURL: "https://api.none.com/v0/app8ZbcPx7dkpOnP0/", url: "/" })
      .then((response: AxiosResponse) => {
        expect(response.config.baseURL).toEqual("https://api.none.com/v0/app8ZbcPx7dkpOnP0/");
        expect(response.config.headers!['Authorization']).not.toEqual('Bearer keyKC4VMqtYegcUS5');
      })
  })

});