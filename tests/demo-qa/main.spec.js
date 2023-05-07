const { test, expect } = require('@playwright/test');

test.describe('DEMOQA', () => {
    test.beforeEach( async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState("load")
    })

    test.describe('Blocks and links', () => {
        test('has title', async ({ page }) => {
            await expect(page).toHaveTitle(/DEMOQA/);
        });

        test('get started link', async ({ page }) => {
            await page.getByRole('link', { name: 'Selenium Online Training' }).click();
            await expect(page).toHaveURL( "https://demoqa.com/");
        });

        test('amount block => 6', async ({ page }) => {
            await page.waitForSelector("div > .card-body > h5")

            let amount_block = (await page.$$("div > .card-body > h5"))
            await expect(amount_block.length).toEqual(6)
        });
    });

    test.describe('Name is blocks', () => {
        const names_blocks = [
            'Elements',
            'Forms',
            'Alerts, Frame & Windows',
            'Widgets',
            'Interactions',
            'Book Store Application'
        ]

        test('expect equals the texts', async ({ page }) => {
            test.step(`get all blocks from page`, async()=>{
                const amount_block = (await page.$$("div > .card-body > h5"))

                amount_block.forEach(async (elem, index) => {
                    const text_elem = await (elem.innerText()).valueOf()
                    test.step(`text from block ${index + 1} - ${text_elem}`, async()=>{
                        await expect(text_elem).toEqual(names_blocks[index])
                    });

                    test.step(`is displayed block ${index + 1} - ${text_elem}`, async()=>{
                        await expect(await elem.isVisible()).toBeTruthy()
                    });
                })
            });
        });
    });
});