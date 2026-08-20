import { describe, expect, it } from "vitest"

import { findPersonalDataShape, sensitiveKeyPattern } from "./privacy-patterns"

describe("sensitiveKeyPattern", () => {
  it("matches person-level record keys in any casing", () => {
    for (const key of [
      "fullName",
      "email",
      "phone",
      "address",
      "nationalInsuranceNumber",
      "healthAndCareNumber",
      "dateOfBirth",
      "FullName",
      "EMAIL",
    ]) {
      expect(sensitiveKeyPattern.test(key)).toBe(true)
    }
  })

  it("does not match the corpus field names", () => {
    for (const key of ["id", "synthetic", "disclosure", "theme", "stance", "text"]) {
      expect(sensitiveKeyPattern.test(key)).toBe(false)
    }
  })
})

describe("findPersonalDataShape", () => {
  it("names the shape it found", () => {
    expect(findPersonalDataShape("write to someone@example.gov for detail")).toBe(
      "email address",
    )
    expect(findPersonalDataShape("call 028 9012 3456 to discuss")).toBe(
      "telephone number",
    )
    expect(findPersonalDataShape("see https://example.gov/page")).toBe("URL")
    expect(findPersonalDataShape("reference QQ123456C was quoted")).toBe(
      "National Insurance number",
    )
    expect(findPersonalDataShape("record 1234567890 was attached")).toBe(
      "Health and Care number",
    )
  })

  it("returns undefined for ordinary consultation prose", () => {
    expect(
      findPersonalDataShape(
        "Respondents said the proposed timetable gave too little room for smaller organisations to reply.",
      ),
    ).toBeUndefined()
  })
})
