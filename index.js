const puppeteer = require("puppeteer");
const fs = require("fs");

async function main() {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
  });
  const page = await browser.newPage();

  // config page
  page.setDefaultTimeout(60 * 1000);
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  console.log("Browser started successfully");

  await page.goto(
    "https://www.timesjobs.com/candidate/job-search.html?searchType=personalizedSearch&from=submit&txtKeywords=web&txtLocation="
  );

  // wait for job lists to render
  await page.waitForSelector("#searchResultData > ul");

  const jobDetails = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll("#searchResultData > ul > li"),
      (li) => {
        const jobName = li.querySelector("header > h2")?.textContent.trim();
        const jobCmpy = li.querySelector("header > h3")?.textContent.trim();

        return { jobName, jobCmpy };
      }
    );
  });

  try {
    fs.writeFile("data.txt", JSON.stringify(jobDetails), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("File has been saved.");
      }
    });
  } catch (err) {
    console.error(err);
  }

  console.log(jobDetails);

  await browser.close();
}

main();
