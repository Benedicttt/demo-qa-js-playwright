const { test, expect } = require('@playwright/test');
const {Page} = require("playwright-core");
const expected_text = [
    "Text Box",
    "Check Box",
    "Radio Button",
    "Web Tables",
    "Buttons",
    "Links",
    "Broken Links - Images",
    "Upload and Download",
    "Dynamic Properties",
]

test.describe('DEMOQA - Elements', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState("load")
    })

    test.describe("click button type Elements", () => {
        test.beforeEach( async ({ page }) => {
            await page.click("text=Elements")
        });

        test("text from buttons", async ({ page }) => {
            const elements = await page.locator(`//div[contains(text(),'Elements')]/../../../div/ul/li`).all()

            elements.forEach(async (elem, index) => {
                const text_elem = await (elem.innerText()).valueOf()

                test.step(`block ${index + 1} - ${text_elem}`, async () => {
                    expect(text_elem).toEqual(expected_text[index])
                })
            });
        });

        test("buttons is", async ({ page }) => {
            const elements = await page.locator(`//div[contains(text(),'Elements')]/../../../div/ul/li`).all()

            elements.forEach(async (elem, index) => {
                const text_elem = await (elem.innerText()).valueOf()

                test.step(`Enabled ${index + 1} - ${text_elem}`, async () => {
                    expect(elem.isEnabled()).toBeTruthy()
                })

                test.step(`Displayed ${index + 1} - ${text_elem}`, async () => {
                    await expect(await elem.isVisible()).toBeTruthy()
                });
            });
        })

        test.describe("click block", () => {
            test.describe(`Text box`, async () => {
                test.beforeEach( async ({ page }) => {
                    await page.locator(`span`).getByText("Text Box").click()
                });

                test(`filed "Full name"`, async ({ page}) => {
                    test.step(`label is displayed`, async () => {
                        await expect(await page.locator("#userName-label").isVisible()).toBeTruthy()
                    });

                    test.step(`label text`, async () => {
                        await expect(await page.locator("#userName-label").innerText().valueOf()).toEqual("Full Name")
                        await expect(await page.locator("#userName-label").textContent()).toEqual("Full Name")
                    });

                    test.step(`placeholder`, async () => {
                        await expect(await page.locator("#userName").getAttribute("placeholder")).toEqual("Full Name")
                    });

                    test.step(`is displayed`, async () => {
                        await expect(await page.locator("#userName").isVisible()).toBeTruthy()
                    });

                    test.step(`can be filled`, async () => {
                        await expect(await page.locator("#userName").isEditable()).toBeTruthy()
                    });

                    test.step(`fill`, async () => {
                        await page.locator("#userName").fill("test User Name")

                        await expect(await page.locator("#userName").inputValue()).toEqual("test User Name")
                    });
                });

                test(`filed "Email"`, async ({ page}) => {
                    test.step(`label is displayed`, async () => {
                        await expect(await page.locator("#userEmail-label").isVisible()).toBeTruthy()
                    });

                    test.step(`label text`, async () => {
                        await expect(await page.locator("#userEmail-label").innerText().valueOf()).toEqual("Email")
                        await expect(await page.locator("#userEmail-label").textContent()).toEqual("Email")
                    });

                    test.step(`placeholder`, async () => {
                        await expect(await page.locator("#userEmail").getAttribute("placeholder")).toEqual("name@example.com")
                    });

                    test.step(`is displayed`, async () => {
                        await expect(await page.locator("#userEmail").isVisible()).toBeTruthy()
                    });

                    test.step(`can be filled`, async () => {
                        await expect(await page.locator("#userEmail").isEditable()).toBeTruthy()
                    });

                    test.step(`fill`, async () => {
                        await page.locator("#userEmail").fill("test Email")

                        await expect(await page.locator("#userEmail").inputValue()).toEqual("test Email")
                    });
                });

                test(`text area "Current address" `, async ({ page}) => {
                    test.step(`label is displayed`, async () => {
                        await expect(await page.locator("#currentAddress-label").isVisible()).toBeTruthy()
                    });

                    test.step(`label text`, async () => {
                        await expect(await page.locator("#currentAddress-label").innerText().valueOf()).toEqual("Current Address")
                        await expect(await page.locator("#currentAddress-label").textContent()).toEqual("Current Address")
                    });

                    test.step(`placeholder`, async () => {
                        await expect(await page.locator("#currentAddress").getAttribute("placeholder")).toEqual("Current Address")
                    });

                    test.step(`is displayed`, async () => {
                        await expect(await page.locator("#currentAddress").isVisible()).toBeTruthy()
                    });

                    test.step(`can be filled`, async () => {
                        await expect(await page.locator("#currentAddress").isEditable()).toBeTruthy()
                    });

                    test.step(`fill`, async () => {
                        await page.locator("#currentAddress").fill("test currentAddress")

                        await expect(await page.locator("#currentAddress").inputValue()).toEqual("test currentAddress")
                    });
                });

                test(`text area "Permanent Address"`, async ({ page}) => {
                    test.step(`label is displayed`, async () => {
                        await expect(await page.locator("#permanentAddress-label").isVisible()).toBeTruthy()
                    });

                    test.step(`label text`, async () => {
                        await expect(await page.locator("#permanentAddress-label").innerText().valueOf()).toEqual("Permanent Address")
                        await expect(await page.locator("#permanentAddress-label").textContent()).toEqual("Permanent Address")
                    });

                    test.step(`placeholder`, async () => {
                        await expect((await page.locator("#permanentAddress").getAttribute("placeholder"))).toEqual(null)
                    });

                    test.step(`is displayed`, async () => {
                        await expect(await page.locator("#permanentAddress").isVisible()).toBeTruthy()
                    });

                    test.step(`can be filled`, async () => {
                        await expect(await page.locator("#permanentAddress").isEditable()).toBeTruthy()
                    });

                    test.step(`fill`, async () => {
                        await page.locator("#permanentAddress").fill("test permanentAddress")

                        await expect(await page.locator("#permanentAddress").inputValue()).toEqual("test permanentAddress")
                    });
                });

                test(`button "Submit" `, async ({ page}) => {
                    test.step(`is displayed`, async () => {
                        await expect(await page.locator("#submit").isVisible()).toBeTruthy()
                    });

                    test.step(`can be enabled`, async () => {
                        await expect(await page.locator("#submit").isEnabled()).toBeTruthy()
                    });
                });

                test(`fill all field and get result" `, async ({ page}) => {
                        await page.locator("#userName").fill("test User Name")
                        await page.locator("#userEmail").fill("test@email.com")
                        await page.locator("#currentAddress").fill("test currentAddress")
                        await page.locator("#permanentAddress").fill("test permanentAddress")
                        await page.locator("#submit").click()

                        await page.waitForLoadState("load")

                        await page.mouse.move(100, 100);

                        await expect(
                            await page.locator("#output").textContent()
                        ).toEqual(
                            "Name:test User Name" +
                            "Email:test@email.com" +
                            "Current Address :test currentAddress " +
                            "Permananet Address :test permanentAddress"
                        )
                });
            });
        })
    })
})
