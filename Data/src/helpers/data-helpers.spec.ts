import "jest";
import fs from "fs";

import { DataHelpers } from "./data-helpers";
import { Logger } from "./logger";

//TODO add more tests with exposed class
describe("helpers", () => {
  let target: DataHelpers;
  let logger: Logger;
  let loggerSpy: jest.SpyInstance;
  let data: any;

  beforeAll(() => {
    data = getData();
    logger = new Logger(data.length);
  });

  beforeEach(() => {
    loggerSpy = jest.spyOn(logger, "log");
    target = new DataHelpers(data, logger);
  });

  it("should create", () => {
    expect(target).toBeDefined();
  });

  describe("getters", () => {
    describe("users", () => {
      it("should return users array", () => {
        const actual = target.users;
		const expected = getData()

        expect(actual).toEqual(expected);
        expect(actual.length).toEqual(expected.length);
      });
    });

    describe("dataSize", () => {
      it("should return correct data length", () => {
        const actual = target.dataSize;
		const expected = getData().length

		expect(actual).toEqual(expected)
      });
    });
  });

  describe("appendLink()", () => {
	it('should append linkId to data when prop is linkId', () => {
		target.appendLink('linkId');

		const actual = target.users

		actual.forEach(actualUser => expect(actualUser.linkId).toBeDefined())
	})

	it('should not append linkId to data when prop is link', () => {
		target.appendLink('link');

		const actual = target.users

		actual.forEach(actualUser => expect(actualUser.linkId).toBeUndefined())
	})

	it('should append link to data when prop is link', () => {
		target.appendLink('link');

		const actual = target.users

		actual.forEach(actualUser => expect(actualUser.link).toBeDefined())
	})

	it('should not append link to data when prop is linkId', () => {
		target.appendLink('linkId');

		const actual = target.users

		actual.forEach(actualUser => expect(actualUser.link).toBeUndefined())
	})
  })
});

function getData() {
  return JSON.parse(fs.readFileSync("./blockedUsersTest.json").toString()).data;
}
