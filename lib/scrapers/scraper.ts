import * as cheerio from 'cheerio';

export interface ScraperResult {
  title: string;
  url: string;
  opinions: string[];
}

interface ScraperArgs {
  baseUrl: string;
  listPath: string;
  listSelector: string;
  absoluteUrls: boolean;
  pathRegex: string;
  opinionTags: string[];
}

abstract class Scraper implements ScraperArgs {
  baseUrl: string;
  listPath: string;
  listSelector: string;
  absoluteUrls: boolean;
  pathRegex: string;
  opinionTags: string[];

  constructor(args: ScraperArgs) {
    this.baseUrl = args.baseUrl;
    this.listPath = args.listPath;
    this.listSelector = args.listSelector;
    this.absoluteUrls = args.absoluteUrls;
    this.pathRegex = args.pathRegex;
    this.opinionTags = args.opinionTags;
  }

  private getOpinions($: cheerio.CheerioAPI): string[] {
    // Test tags until we found a result
    for (const tag of this.opinionTags) {
      const $opinionElements = $(tag);
      if ($opinionElements.length > 0) {
        return $opinionElements.toArray().map(($element) => $($element).text());
      }
    }
    return [];
  }

  private async getStandpointPage(
    $: cheerio.Cheerio<cheerio.Element>
  ): Promise<ScraperResult> {
    let title = $.text();

    if (title.trim() === '') {
      title = $.attr('title') ?? '';
    }

    // TODO implement this
    return {
      opinions: [],
      title: '',
      url: '',
    };
  }
  //     if title == "":
  //         title_element = element["title"]
  //         title = title_element[0] if isinstance(title_element, list) else title_element

  //     href_element = element["href"]
  //     href = href_element[0] if isinstance(href_element, list) else href_element

  //     if not self.absolute_urls:
  //         if self.path_regex is not NotImplemented:
  //             match = re.search(self.path_regex, href)
  //             if not match:
  //                 logger.warn(f"Failed to extract URL for page {title}, got path {element['href']}")
  //                 return None
  //             url = self.base_url + match.group(0)
  //         else:
  //             url = self.base_url + href
  //     else:
  //         url = href
  //     if url == "":
  //         logger.warn(f"Failed to extract URL for page {title}, got no path...")
  //         return None
  //     # Sleep so we do not get rate limited :)
  //     await asyncio.sleep(randint(1, 1000) / 10)
  //     try:
  //         async with aiohttp.ClientSession() as session:
  //             resp = await session.get(url)
  //             html = await resp.text("utf-8")
  //             soup = BeautifulSoup(html, "html.parser")
  //             opinions = self._get_opinions(soup)
  //             return DataEntry(title=title, url=url, opinions=opinions)
  //     except Exception as e:
  //         logger.error(f"Request to {url} failed with error", exc_info=e)
  //         return None

  async getPages(limit?: number): Promise<ScraperResult[]> {
    const response = await fetch(this.baseUrl + this.listPath, {
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
    });
    const html = await response.text();
    const $ = await cheerio.load(html);
    let $elements = $(this.listSelector);

    console.debug(`Found ${$elements.length} list elements`);

    if (limit !== undefined) {
      $elements = $elements.slice(0, limit);
    }

    const promises = $elements
      .toArray()
      .map(($element) =>
        this.getStandpointPage($($element as cheerio.Element))
      );
    const result = await Promise.all(promises);
    return result;
  }
}
