import { SPYUser } from "../crosscutting/authenticator/authenticator.type";
import ScrapableLinkService from "../service/scrapablelink/ScrapableLinkService";
import ScrapedAssetService from "../service/scrappedasset/ScrapedAssetService";
import puppeteer from "puppeteer";
import cheerio from "cheerio";
import { getEnvVar } from "../crosscutting/processor";

(async function scrap() {
  const userContext: SPYUser = { userId: "{{__SYSTEM_USER__}}" },
    scrapedAssetService = new ScrapedAssetService({ userContext }),
    scrapableLinkService = new ScrapableLinkService({ userContext }),
    browser = await puppeteer.launch(getEnvVar("USE_SPECIFIC_CHROMIUM_CONFIG") === "true" ? {
      headless: true,
      executablePath: '/usr/bin/chromium-browser',
      args: [
        '--no-sandbox',
        '--disable-gpu',
      ]
  } : undefined);

  const perform = async () => {
    try {
      const scrapableLink = await scrapableLinkService.get();

      if (scrapableLink) {
        console.log(`[SPY_WORKER_DEBUG]:${new Date().toISOString()}: ${scrapableLink.link} scrap starts...`);
        const assetURLs: string[] = [];
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(scrapableLink.link, { waitUntil: "networkidle0" });
        const content = await page.content();
        await page.close();
        const documentSelector = cheerio.load(content);
        documentSelector("img").each((index, imageElement) => {
          const imageURL = documentSelector(imageElement).attr("src");
          if (imageURL) assetURLs.push(imageURL);
        });
        documentSelector("video source").each((index, imageElement) => {
          const videoURL = documentSelector(imageElement).attr("src");
          if (videoURL) assetURLs.push(videoURL);
        });
        console.log(assetURLs);
        if (assetURLs.length)
          await scrapedAssetService.add(assetURLs, scrapableLink.id);
      }
      console.log(`[SPY_WORKER_DEBUG]:${new Date().toISOString()}:Task Done`);
    } catch (e) {
      console.error(`[SPY_WORKER_ERROR]:`, e);
    }
  };

  while (true) {
    await new Promise(async (resolve) => {
      await perform();
      setTimeout(() => resolve(undefined), 1000);
    });
  }
})();
