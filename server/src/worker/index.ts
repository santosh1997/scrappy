import { SPYUser } from "../crosscutting/authenticator/authenticator.type";
import ScrapableLinkService from "../service/scrapablelink/ScrapableLinkService";
import ScrapedAssetService from "../service/scrappedasset/ScrapedAssetService";
import puppeteer from "puppeteer";
import cheerio from "cheerio";

(async function scrap() {
  const userContext: SPYUser = { userId: "{{__SYSTEM_USER__}}" },
    scrapedAssetService = new ScrapedAssetService({ userContext }),
    scrapableLinkService = new ScrapableLinkService({ userContext }),
    browser = await puppeteer.launch();

  const perform = async () => {
    try {
      const scrapableLink = await scrapableLinkService.get();

      if (scrapableLink) {
        const assetURLs: string[] = [];
        const page = await browser.newPage();
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
