import type { Cheerio, CheerioAPI, Element } from 'cheerio';
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
  pathRegex?: RegExp;
  opinionTags: string[];
}

export default abstract class Scraper implements ScraperArgs {
  abstract baseUrl: string;
  abstract listPath: string;
  abstract listSelector: string;
  abstract opinionTags: string[];
  absoluteUrls: boolean = false;
  pathRegex?: RegExp;

  protected getOpinions($: CheerioAPI): string[] {
    // Test tags until we found a result
    for (const tag of this.opinionTags) {
      const $opinionElements = $(tag);
      if ($opinionElements.length > 0) {
        return $opinionElements.toArray().map(($element) => $($element).text());
      }
    }
    return [];
  }

  protected getUrl(href: string) {
    if (!this.absoluteUrls) {
      if (!this.pathRegex) {
        return this.baseUrl + href;
      }
      const match = href?.match(this.pathRegex);
      if (!match) {
        console.warn(
          `Failed to extract URL with regex ${this.pathRegex} and path ${href}`
        );
        return;
      }
      return this.baseUrl + match[0];
    }
    return href;
  }

  protected async getStandpointPage(
    $link: Cheerio<Element>
  ): Promise<ScraperResult> {
    let title = $link.text();

    if (title.trim() === '') {
      title = $link.attr('title') ?? '';
    }

    const href = $link.attr('href');

    if (!href) {
      throw new Error(
        `Found no href attribute to be extracted from page ${title}`
      );
    }

    const url = this.getUrl(href);

    if (!url) {
      throw new Error(
        `Failed to extract URL for page ${title}, got no path...`
      );
    }

    // Sleep so we do not get rate limited
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 2000))
    );

    const response = await fetch(url, {
      headers: { 'Content-Type': 'text/plain; charset=UTF-8' },
    });

    const html = await response.text();
    const opinions = this.getOpinions(await cheerio.load(html));

    return {
      opinions,
      title,
      url,
    };
  }

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
    const result = await Promise.allSettled(promises);
    const resolved = result
      .filter(
        (
          promiseResult
        ): promiseResult is PromiseFulfilledResult<ScraperResult> => {
          if (promiseResult.status === 'fulfilled') {
            return true;
          }
          return false;
        }
      )
      .map((fulfilled) => fulfilled.value);
    return resolved;
  }
}
