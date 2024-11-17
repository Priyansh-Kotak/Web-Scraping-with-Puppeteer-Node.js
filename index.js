// const puppeteer = require("puppeteer");
// const fs = require("fs").promises; // Use the promise-based version of fs

// async function main() {
//   const browser = await puppeteer.launch({
//     headless: true,
//     defaultViewport: null,
//   });
//   const page = await browser.newPage();

//   // Config page
//   page.setDefaultTimeout(60 * 1000);
//   page.setDefaultNavigationTimeout(2 * 60 * 1000);

//   console.log("Browser started successfully");

//   // Navigate to the desired webpage
//   await page.goto("https://www.linkedin.com/pulse/msmes-role-advancing-sdgs-elfreda-k-sheriff-mba-msc/");

//   // Wait for the page content to load
//   await page.waitForSelector("div");

//   // Extract all div elements' text content
//   const divData = await page.evaluate(() => {
//     return Array.from(document.querySelectorAll("div"), (div) => div.textContent.trim());
//   });

//   // Save the data to a file using async/await
//   try {
//     await fs.writeFile("div_data.txt", JSON.stringify(divData, null, 2));
//     console.log("Div data has been saved to div_data.txt.");
//   } catch (err) {
//     console.error("Error saving file:", err);
//   }

//   console.log(divData);

//   await browser.close();
// }

// main().catch(err => console.error("Error in script execution:", err)); // Handling unexpected errors in the script







// const puppeteer = require("puppeteer");
// const fs = require("fs").promises;
// const mammoth = require("mammoth");

// async function extractLinksFromWordFile(wordFilePath) {
//   try {
//     // Read the Word file and extract links
//     const { value: text } = await mammoth.extractRawText({ path: wordFilePath });
//     const links = [];

//     // Regular expression to match URLs
//     const urlRegex = /https?:\/\/[^\s]+/g;
//     const matches = text.match(urlRegex);

//     if (matches) {
//       links.push(...matches);
//     }

//     return links;
//   } catch (error) {
//     console.error("Error extracting links from Word file:", error);
//     return [];
//   }
// }

// async function scrapeContentFromLinks(links) {
//   const browser = await puppeteer.launch({
//     headless: true,
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();

//   // Config page
//   page.setDefaultTimeout(60 * 1000);
//   page.setDefaultNavigationTimeout(2 * 60 * 1000);

//   console.log("Browser started successfully");

//   // Loop through all the links and scrape the content
//   for (const link of links) {
//     console.log(`Scraping content from: ${link}`);
//     try {
//       // Navigate to the desired webpage
//       await page.goto(link);

//       // Wait for the page content to load
//       await page.waitForSelector("div");

//       // Extract all div elements' text content, including nested divs
//       const divData = await page.evaluate(() => {
//         // Recursively fetch text from all divs
//         function extractTextFromDiv(div) {
//           let text = div.textContent.trim();
//           for (const child of div.children) {
//             text += " " + extractTextFromDiv(child); // Recursively get text from child divs
//           }
//           return text;
//         }

//         return Array.from(document.querySelectorAll("div"))
//           .map((div) => extractTextFromDiv(div))
//           .filter((text) => text.length > 0); // Filter out empty strings
//       });

//       // Save the data to a file
//       await fs.writeFile("div_data.txt", JSON.stringify(divData, null, 2), { flag: "a" });
//       console.log(`Div data from ${link} has been saved.`);

//     } catch (err) {
//       console.error(`Error scraping ${link}:`, err);
//     }
//   }

//   await browser.close();
// }

// async function main() {
//   const wordFilePath = "sdg_sheet.docx"; // Path to your Word file with links

//   // Step 1: Extract links from the Word file
//   const links = await extractLinksFromWordFile(wordFilePath);

//   if (links.length === 0) {
//     console.log("No links found in the Word file.");
//     return;
//   }

//   console.log("Extracted links:", links);

//   // Step 2: Scrape content from each link
//   await scrapeContentFromLinks(links);
// }

// main().catch((err) => console.error("Error in script execution:", err));


// const puppeteer = require("puppeteer");
// const fs = require("fs").promises;
// const mammoth = require("mammoth");

// async function extractLinksFromWordFile(wordFilePath) {
//   try {
//     // Read the Word file and extract links
//     const { value: text } = await mammoth.extractRawText({ path: wordFilePath });
//     const links = [];

//     // Regular expression to match URLs
//     const urlRegex = /https?:\/\/[^\s]+/g;
//     const matches = text.match(urlRegex);

//     if (matches) {
//       links.push(...matches);
//     }

//     return links;
//   } catch (error) {
//     console.error("Error extracting links from Word file:", error);
//     return [];
//   }
// }

// async function scrapeContentFromLinks(links) {
//   const browser = await puppeteer.launch({
//     headless: true,
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();

//   // Config page
//   page.setDefaultTimeout(60 * 1000);
//   page.setDefaultNavigationTimeout(2 * 60 * 1000);

//   console.log("Browser started successfully");

//   // Loop through all the links and scrape the content
//   for (const link of links) {
//     console.log(`Scraping content from: ${link}`);
//     try {
//       // Navigate to the desired webpage
//       await page.goto(link);

//       // Wait for the page content to load
//       await page.waitForSelector("div");

//       // Extract all relevant elements' text content, including nested divs, p, h tags, and span
//       const pageData = await page.evaluate(() => {
//         // Recursively fetch text from all divs, p, h, and span tags
//         function extractTextFromElement(element) {
//           let text = element.textContent.trim();
//           for (const child of element.children) {
//             text += " " + extractTextFromElement(child); // Recursively get text from child elements
//           }
//           return text;
//         }

//         const divData = Array.from(document.querySelectorAll("div"))
//           .map((div) => extractTextFromElement(div))
//           .filter((text) => text.length > 0); // Filter out empty strings

//         const pData = Array.from(document.querySelectorAll("p"))
//           .map((p) => extractTextFromElement(p))
//           .filter((text) => text.length > 0);

//         const hData = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
//           .map((h) => extractTextFromElement(h))
//           .filter((text) => text.length > 0);

//         const spanData = Array.from(document.querySelectorAll("span"))
//           .map((span) => extractTextFromElement(span))
//           .filter((text) => text.length > 0);

//         // Combine all scraped data into one object
//         return {
//           divData,
//           pData,
//           hData,
//           spanData,
//         };
//       });

//       // Save the data to a file
//       await fs.writeFile("div_data.txt", JSON.stringify(pageData, null, 2), { flag: "a" });
//       console.log(`Div, p, h, and span data from ${link} has been saved.`);

//     } catch (err) {
//       console.error(`Error scraping ${link}:`, err);
//     }
//   }

//   await browser.close();
// }

// async function main() {
//   const wordFilePath = "sdg_sheet.docx"; // Path to your Word file with links

//   // Step 1: Extract links from the Word file
//   const links = await extractLinksFromWordFile(wordFilePath);

//   if (links.length === 0) {
//     console.log("No links found in the Word file.");
//     return;
//   }

//   console.log("Extracted links:", links);

//   // Step 2: Scrape content from each link
//   await scrapeContentFromLinks(links);
// }

// main().catch((err) => console.error("Error in script execution:", err));





// const puppeteer = require("puppeteer");
// const fs = require("fs").promises;
// const mammoth = require("mammoth");

// async function extractLinksFromWordFile(wordFilePath) {
//   try {
//     // Read the Word file and extract links
//     const { value: text } = await mammoth.extractRawText({ path: wordFilePath });
//     const links = [];

//     // Regular expression to match URLs
//     const urlRegex = /https?:\/\/[^\s]+/g;
//     const matches = text.match(urlRegex);

//     if (matches) {
//       links.push(...matches);
//     }

//     return links;
//   } catch (error) {
//     console.error("Error extracting links from Word file:", error);
//     return [];
//   }
// }

// async function scrapeContentFromLinks(links) {
//   const browser = await puppeteer.launch({
//     headless: true,
//     defaultViewport: null,
//   });

//   const page = await browser.newPage();

//   // Config page
//   page.setDefaultTimeout(60 * 1000);
//   page.setDefaultNavigationTimeout(2 * 60 * 1000);

//   console.log("Browser started successfully");

//   // Loop through all the links and scrape the content
//   for (const link of links) {
//     console.log(`Scraping content from: ${link}`);
//     try {
//       // Navigate to the desired webpage
//       await page.goto(link);

//       // Wait for the page content to load
//       await page.waitForSelector("div");

//       // Extract all relevant elements' text content, including nested divs, p, h tags, and span
//       const pageData = await page.evaluate(() => {
//         // Recursively fetch text from all divs, p, h, and span tags
//         function extractTextFromElement(element) {
//           let text = element.textContent.trim();
//           // Remove any newlines or tabs from the text
//           text = text.replace(/[\n\t\r]/g, " "); // Replace newline, tab, or carriage return with a space

//           for (const child of element.children) {
//             text += " " + extractTextFromElement(child); // Recursively get text from child elements
//           }
//           return text;
//         }

//         const divData = Array.from(document.querySelectorAll("div"))
//           .map((div) => extractTextFromElement(div))
//           .filter((text) => text.length > 0); // Filter out empty strings

//         const pData = Array.from(document.querySelectorAll("p"))
//           .map((p) => extractTextFromElement(p))
//           .filter((text) => text.length > 0);

//         const hData = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
//           .map((h) => extractTextFromElement(h))
//           .filter((text) => text.length > 0);

//         const spanData = Array.from(document.querySelectorAll("span"))
//           .map((span) => extractTextFromElement(span))
//           .filter((text) => text.length > 0);

//         // Combine all scraped data into one object
//         return {
//           divData,
//           pData,
//           hData,
//           spanData,
//         };
//       });

//       // Save the data to a file
//       await fs.writeFile("div_data.txt", JSON.stringify(pageData, null, 2), { flag: "a" });
//       console.log(`Div, p, h, and span data from ${link} has been saved.`);

//     } catch (err) {
//       console.error(`Error scraping ${link}:`, err);
//     }
//   }

//   await browser.close();
// }

// async function main() {
//   const wordFilePath = "sdg_sheet.docx"; // Path to your Word file with links

//   // Step 1: Extract links from the Word file
//   const links = await extractLinksFromWordFile(wordFilePath);

//   if (links.length === 0) {
//     console.log("No links found in the Word file.");
//     return;
//   }

//   console.log("Extracted links:", links);

//   // Step 2: Scrape content from each link
//   await scrapeContentFromLinks(links);
// }

// main().catch((err) => console.error("Error in script execution:", err));



// Excel file code 

// const puppeteer = require("puppeteer");
// const fs = require("fs").promises;
// const mammoth = require("mammoth");
// const ExcelJS = require("exceljs");

// // Function to extract links and keys from the Word file
// async function extractKeysAndLinksFromWordFile(wordFilePath) {
//   try {
//     const { value: text } = await mammoth.extractRawText({ path: wordFilePath });
//     const lines = text.split("\n"); // Split by lines
//     const data = {};

//     let currentKey = "Default Key"; // Start with a default key

//     for (const line of lines) {
//       const trimmedLine = line.trim();

//       // Check if the line is a URL
//       if (/https?:\/\/[^\s]+/.test(trimmedLine)) {
//         // Add the link to the current key
//         if (!data[currentKey]) data[currentKey] = [];
//         data[currentKey].push(trimmedLine);
//       } else if (trimmedLine) {
//         // Treat non-URL text as a new key
//         currentKey = trimmedLine;
//         if (!data[currentKey]) data[currentKey] = [];
//       }
//     }

//     return data;
//   } catch (error) {
//     console.error("Error extracting keys and links from Word file:", error);
//     return {};
//   }
// }

// // Function to scrape content from a single link
// async function scrapeContentFromLink(page, link) {
//   try {
//     await page.goto(link);
//     await page.waitForSelector("div");

//     const pageData = await page.evaluate(() => {
//       function extractTextFromElement(element) {
//         let text = element.textContent.trim();
//         text = text.replace(/[\n\t\r]/g, " "); // Clean text
//         for (const child of element.children) {
//           text += " " + extractTextFromElement(child);
//         }
//         return text;
//       }

//       const divData = Array.from(document.querySelectorAll("div"))
//         .map((div) => extractTextFromElement(div))
//         .filter((text) => text.length > 0);

//       const pData = Array.from(document.querySelectorAll("p"))
//         .map((p) => extractTextFromElement(p))
//         .filter((text) => text.length > 0);

//       const hData = Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
//         .map((h) => extractTextFromElement(h))
//         .filter((text) => text.length > 0);

//       const spanData = Array.from(document.querySelectorAll("span"))
//         .map((span) => extractTextFromElement(span))
//         .filter((text) => text.length > 0);

//       return {
//         divData,
//         pData,
//         hData,
//         spanData,
//       };
//     });

//     return pageData;
//   } catch (error) {
//     console.error(`Error scraping ${link}:`, error);
//     return null;
//   }
// }

// // Main function to process keys and links
// async function processKeysAndLinks(wordFilePath, outputExcelPath) {
//   const keysAndLinks = await extractKeysAndLinksFromWordFile(wordFilePath);

//   const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
//   const page = await browser.newPage();
//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("Scraped Data");

//   // Add headers to the Excel sheet
//   sheet.columns = [
//     { header: "Key", key: "key", width: 30 },
//     { header: "Response", key: "response", width: 100 },
//   ];

//   for (const [key, links] of Object.entries(keysAndLinks)) {
//     console.log(`Processing key: "${key}" with ${links.length} links`);

//     for (const link of links) {
//       console.log(`Scraping link: ${link}`);
//       const pageData = await scrapeContentFromLink(page, link);

//       if (pageData) {
//         // Combine all scraped data into a single string for Excel
//         const combinedData = [
//           ...pageData.divData,
//           ...pageData.pData,
//           ...pageData.hData,
//           ...pageData.spanData,
//         ].join(" ");

//         sheet.addRow({ key, response: combinedData });
//       }
//     }
//   }

//   await browser.close();

//   // Write data to the Excel file
//   await workbook.xlsx.writeFile(outputExcelPath);
//   console.log(`Data has been saved to ${outputExcelPath}`);
// }

// // Run the script
// async function main() {
//   const wordFilePath = "sdg_sheet.docx"; // Path to the Word file
//   const outputExcelPath = "ScrapedData.xlsx"; // Path to the output Excel file

//   await processKeysAndLinks(wordFilePath, outputExcelPath);
// }

// main().catch((err) => console.error("Error in script execution:", err));




const puppeteer = require("puppeteer");
const mammoth = require("mammoth");
const fs = require("fs");

async function main() {
  // Read the Word file
  const wordFile = "sdg_sheet.docx"; // Replace with your Word file path
  const wordContent = await mammoth.extractRawText({ path: wordFile });
  const lines = wordContent.value.split("\n").map(line => line.trim()).filter(line => line);

  const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
  const page = await browser.newPage();

  page.setDefaultTimeout(60 * 1000);
  page.setDefaultNavigationTimeout(2 * 60 * 1000);

  console.log("Browser started successfully");

  const data = {}; // Dictionary to store key-value pairs
  let currentKey = null;

  for (const line of lines) {
    if (line.startsWith("http")) {
      // It's a URL; fetch content
      try {
        await page.goto(line);

        // Wait for the page to load
        await page.waitForSelector("body");

        // Scrape all desired content
        const content = await page.evaluate(() => {
          const getText = (el) => el.textContent.trim().replace(/\s+/g, " ");
          const elements = document.querySelectorAll("body *");
          return Array.from(elements)
            .filter(el => el.tagName.match(/DIV|P|SPAN|H[1-6]/i))
            .map(el => getText(el))
            .filter(text => text); // Filter out empty text
        });

        // Store content under the current key
        if (currentKey) {
          data[currentKey] = (data[currentKey] || []).concat(content);
        }
      } catch (err) {
        console.error(`Failed to scrape ${line}:`, err);
      }
    } else {
      // It's a non-link text; treat as a new key
      currentKey = line;
      if (!data[currentKey]) {
        data[currentKey] = [];
      }
    }
  }

  await browser.close();

  // Save as JSON
  fs.writeFileSync("output.json", JSON.stringify(data, null, 2));
  console.log("Data saved to output.json");
}

main().catch(console.error);