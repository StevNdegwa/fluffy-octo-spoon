import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import {
  fetchingStudentClasses,
  fetchStudentClassesError,
  setStudentClasses,
  setStudentsNamesMap,
  showStudentClasses,
  fetchStudentClasses
} from "./airtable";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const axiosMock = new MockAdapter(axios);

describe("airtable actions", () => {

  beforeEach(() => {
    axiosMock.reset();
  })

  test("fetchingStudentClasses: should set isFetching", () => {
    expect(fetchingStudentClasses(true).isFetching).toEqual(true)
    expect(fetchingStudentClasses(false).isFetching).toEqual(false)
  })

  test("fetchStudentClassesError: should set fetch error", () => {
    let error = { code: "NONE", message: "Unknown error" };
    expect(fetchStudentClassesError(error).error).toEqual(error);
    expect(fetchStudentClassesError(null).error).toEqual(null);
  })

  test("setStudentClasses: should set classes array", () => {
    let classes = [{ Students: [], Name: "Class 101" }];
    expect(setStudentClasses(classes).classes).toEqual(classes);
  })

  test("setStudentsNamesMap: should set students id name map", () => {
    let map = { "xyswe": "Joe" };
    expect(setStudentsNamesMap(map).map).toEqual(map);
  })

  test("showStudentClasses: should show student classes", () => {
    expect(showStudentClasses(true).show).toEqual(true);
    expect(showStudentClasses(false).show).toEqual(false);
  })

  test("fetchStudentClasses: should fetch student classes", () => {
    const store = mockStore({});

    const fields = [
      {
        "Students": [
          "rec2bBA5X2PKMcAGN",
          "recoQBxwU83QJq69L",
        ],
        "Name": "CS 103"
      }
    ];

    let classes = [
      "recr0DOF3YWjN9wAH",
      "rectGHWsZVmkeRwGh"
    ];

    const params = new URLSearchParams([
      ["filterByFormula", "{Name}='Joe'"],
      ["fields[]", "Classes"]
    ]);

    axiosMock.onGet(`/Students?${params}`).reply(200, {
      records: [
        {
          "id": "rec2bBA5X2PKMcAGN",
          "fields": {
            "Classes": classes
          },
          "createdTime": "2021-08-11T15:31:32.000Z"
        }
      ]
    });

    const params2 = new URLSearchParams([
      ["filterByFormula", "SEARCH(RECORD_ID(),'recr0DOF3YWjN9wAH,rectGHWsZVmkeRwGh')"]
    ])

    axiosMock.onGet(`/Classes?${params2}`)
      .reply(200, {
        records: [
          {
            "id": "recr0DOF3YWjN9wAH",
            "fields": fields[0],
            "createdTime": "2021-08-11T15:31:14.000Z"
          }
        ],
      });

    const params3 = new URLSearchParams([
      ["filterByFormula", "SEARCH(RECORD_ID(),'rec2bBA5X2PKMcAGN,recoQBxwU83QJq69L')"],
      ["fields[]", "Name"]
    ])

    axiosMock.onGet(`/Students?${params3}`)
      .reply(200, {
        records: [
          {
            "id": "rec2bBA5X2PKMcAGN",
            "fields": {
              "Name": "Joe"
            },
            "createdTime": "2021-08-11T15:31:32.000Z"
          }
        ]
      })

    return store.dispatch(fetchStudentClasses("Joe") as any)
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual(fetchingStudentClasses(true))
        expect(actions[1]).toEqual(fetchStudentClassesError(null));
        expect(actions[2]).toEqual(setStudentClasses(fields));
        expect(actions[3]).toEqual(setStudentsNamesMap({ rec2bBA5X2PKMcAGN: "Joe" }));
        expect(actions[4]).toEqual(showStudentClasses(true));
        expect(actions[5]).toEqual(fetchingStudentClasses(false));
      });
  })

  test("fetchStudentClasses: should not set student classes to state", () => {
    const store = mockStore({});

    const params = new URLSearchParams([
      ["filterByFormula", "{Name}='Joe'"],
      ["fields[]", "Classes"]
    ]);

    axiosMock.onGet(`/Students?${params}`).reply(200, {
      records: []
    });

    return store.dispatch(fetchStudentClasses("Joe") as any)
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual(fetchingStudentClasses(true))
        expect(actions[1]).toEqual(fetchStudentClassesError(null));
        expect(actions[2]).toEqual(showStudentClasses(true));
        expect(actions[3]).toEqual(fetchingStudentClasses(false));
      });
  })

  test("fetchStudentClasses: should set error to state", () => {
    const store = mockStore({});

    const params2 = new URLSearchParams([
      ["filterByFormula", "SEARCH(RECORD_ID(),'recr0DOF3YWjN9wAH,rectGHWsZVmkeRwGh')"]
    ])

    axiosMock.onGet(`/Classes?${params2}`).reply(404)

    return store.dispatch(fetchStudentClasses("Joe") as any)
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual(fetchingStudentClasses(true))
        expect(actions[1]).toEqual(fetchStudentClassesError(null));
        expect(actions[2]).toEqual(fetchStudentClassesError({ code: "404", message: "Request failed with status code 404" }));
        expect(actions[3]).toEqual(fetchingStudentClasses(false));
      });

  })
})
