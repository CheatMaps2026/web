import {createPointObservation_test} from "./filterservice.test";
import {sanitize} from "../src/utils/manipulation";

describe("utils", () => {
    test("sanitize", () => {
        let observation = createPointObservation_test("123", 0, 0)
        observation.notes = `"This is a "description "with" quotes."`
        const newObservation = sanitize(observation)
        expect(newObservation.notes).toEqual(`"This is a description with quotes."`)

    })
})