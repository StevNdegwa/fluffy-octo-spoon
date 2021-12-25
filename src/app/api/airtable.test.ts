import axios from "./axios";
import { getStudentClasses, getClassesByIDs, getStudentNamesByID } from "./airtable";

jest.mock("axios");

let classes = [
  "recr0DOF3YWjN9wAH",
  "rectGHWsZVmkeRwGh"
],
  students = [
    "recoQBxwU83QJq69L",
    "recDImTGoac20jjl6",
    "rec7JYre5lzaHXTTu",
  ];

describe("test getStudentClasses", () => {

  test("should succeessfully fetch student classes", async () => {
    const response = {
      data: {
        records: [
          {
            "id": "rec2bBA5X2PKMcAGN",
            "fields": {
              "Classes": classes
            },
            "createdTime": "2021-08-11T15:31:32.000Z"
          }
        ]
      }
    };

    (axios.get as any).mockImplementationOnce(() => Promise.resolve(response));

    await expect(getStudentClasses("Joe")).resolves.toEqual(classes);

    const params = new URLSearchParams([
      ["filterByFormula", "{Name}='Joe'"],
      ["fields[]", "Classes"]
    ]);

    expect(axios.get).toHaveBeenCalledWith(`/Students?${params}`);
  });

  test("should trim whitespaces from name", () => {
    const response = { data: { records: [] } };

    (axios.get as any).mockImplementationOnce(() => Promise.resolve(response));
    getStudentClasses(" Joe ");

    const params = new URLSearchParams([
      ["filterByFormula", "{Name}='Joe'"],
      ["fields[]", "Classes"]
    ]);

    expect(axios.get).toHaveBeenCalledWith(`/Students?${params}`)
  });

  test("should throw an error if name is invalid", () => {
    expect(() => {
      getStudentClasses(" ");
    }).toThrow();
  })
})

describe("test getClassesByIDs", () => {
  test("should successfullly fetch class details when given ids", async () => {
    const response = {
      data: {
        "records": [
          {
            "id": "recr0DOF3YWjN9wAH",
            "fields": {
              "Students": [
                "rec2bBA5X2PKMcAGN",
                "recoQBxwU83QJq69L",
                "recSePppFodYpFy0l"
              ],
              "Name": "CS 103"
            },
            "createdTime": "2021-08-11T15:31:14.000Z"
          },
          {
            "id": "rectGHWsZVmkeRwGh",
            "fields": {
              "Students": students,
              "Name": "CS 101"
            },
            "createdTime": "2021-08-11T15:31:14.000Z"
          }
        ]
      }

    };

    (axios.get as any).mockImplementationOnce(() => Promise.resolve(response));

    await expect(getClassesByIDs(classes)).resolves.toEqual([
      {
        "Students": [
          "rec2bBA5X2PKMcAGN",
          "recoQBxwU83QJq69L",
          "recSePppFodYpFy0l"
        ],
        "Name": "CS 103"
      },
      {
        "Students": students,
        "Name": "CS 101"
      }
    ]);

    const params = new URLSearchParams([
      ["filterByFormula", "SEARCH(RECORD_ID(),'recr0DOF3YWjN9wAH,rectGHWsZVmkeRwGh')"]
    ])

    expect(axios.get).toHaveBeenCalledWith(`/Classes?${params}`);
  });

  test("should return if the classes array is empty", () => {
    expect(getClassesByIDs([])).toBeFalsy();
  });

  test("should remove duplicates", () => {
    const response = { data: { "records": [] } };

    (axios.get as any).mockImplementationOnce(() => Promise.resolve(response));

    getClassesByIDs(["ClassA", "ClassA", "ClassB"])

    const params = new URLSearchParams([
      ["filterByFormula", "SEARCH(RECORD_ID(),'ClassA,ClassB')"]
    ])

    expect(axios.get).toHaveBeenCalledWith(`/Classes?${params}`);
  })
})

describe("test getStudentNamesByID", () => {
  test("should fetch student names by ID", async () => {
    let response = {
      data: {
        records: [
          {
            "id": "rec2bBA5X2PKMcAGN",
            "fields": {
              "Name": "Joe"
            },
            "createdTime": "2021-08-11T15:31:32.000Z"
          },
          {
            "id": "rec7JYre5lzaHXTTu",
            "fields": {
              "Name": "Mike"
            },
            "createdTime": "2021-08-11T15:34:02.000Z"
          }
        ]
      }
    };

    (axios.get as any).mockImplementationOnce(() => Promise.resolve(response));

    await expect(getStudentNamesByID(students)).resolves.toEqual({
      "rec2bBA5X2PKMcAGN": "Joe",
      "rec7JYre5lzaHXTTu": "Mike"
    });

    const params = new URLSearchParams([
      ["filterByFormula", "SEARCH(RECORD_ID(),'recoQBxwU83QJq69L,recDImTGoac20jjl6,rec7JYre5lzaHXTTu')"],
      ["fields[]", "Name"]
    ])


    expect(axios.get).toHaveBeenCalledWith(`/Students?${params}`);
  });

  test("should return if the students array is empty", () => {
    expect(getStudentNamesByID([])).toBeFalsy();
  })

  test("should remove duplicates", async () => {
    let response = { data: { records: [] } };

    (axios.get as any).mockImplementationOnce(() => Promise.resolve(response));

    getStudentNamesByID(["StudentA", "StudentA", "StudentB"])

    const params = new URLSearchParams([
      ["filterByFormula", "SEARCH(RECORD_ID(),'StudentA,StudentB')"],
      ["fields[]", "Name"]
    ])

    expect(axios.get).toHaveBeenCalledWith(`/Students?${params}`);
  })
})