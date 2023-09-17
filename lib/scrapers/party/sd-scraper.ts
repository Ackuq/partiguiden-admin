import type { ScraperResult } from '../scraper';
import * as pdfjs from 'pdfjs-dist';
import Scraper from '../scraper';

type SectionDestination = [
  { num: number; gen: number },
  { name: string },
  number,
  number,
  number,
];

const IGNORED_SECTIONS = ['Innehåll', 'Inledning'];

export default class SDScraper extends Scraper {
  baseUrl =
    'https://sd.se/wp-content/uploads/2022/07/sverigedemokraternas-valplattform-2022-april.pdf';
  listPath = '';
  listSelector = '';
  opinionTags = [];
  titleTag = '';

  async getPages(): Promise<{ result: ScraperResult[]; hasMore: boolean }> {
    const pdf = await pdfjs.getDocument({
      url: this.baseUrl,
      useSystemFonts: true,
    }).promise;
    const outline = await pdf.getOutline();
    const dataWithPageIndexPromises = outline.map(async (section) => {
      const title = section.title;
      const destination = section.dest as SectionDestination;
      let pageIndex = await pdf.getPageIndex(destination[0]);
      if (title === 'HBT+') {
        // The page index is wrong for this entry
        pageIndex++;
      }
      return { url: `${this.baseUrl}#page=${pageIndex + 1}`, title, pageIndex };
    });
    const dataWithPageIndex = await Promise.all(dataWithPageIndexPromises);
    const filteredDataWithPageIndex = dataWithPageIndex.filter(
      (data) => !IGNORED_SECTIONS.includes(data.title)
    );

    filteredDataWithPageIndex.sort((a, b) => {
      if (a.pageIndex > b.pageIndex) {
        return 1;
      }
      if (a.pageIndex < b.pageIndex) {
        return -1;
      }
      return 0;
    });
    // Transform page indexes into array of page numbers
    const dataWithPages = filteredDataWithPageIndex.map((data, index) => {
      const nextPageIndex =
        index !== filteredDataWithPageIndex.length - 1
          ? filteredDataWithPageIndex[index + 1].pageIndex
          : pdf.numPages;
      return {
        title: data.title,
        url: data.url,
        pageNumbers: Array.from(
          { length: nextPageIndex - data.pageIndex },
          (_, i) => i + data.pageIndex + 1
        ),
      };
    });
    // Resolve the pages and map out the opinions
    const dataWithStandpointsPromises = dataWithPages.map(
      async (data): Promise<ScraperResult> => {
        const pageContentPromises = data.pageNumbers.map(async (pageNumber) => {
          const page = await pdf.getPage(pageNumber);
          const textContent = await page.getTextContent();
          return textContent.items
            .map((content) => ('str' in content ? content.str : ''))
            .join('');
        });
        const pageContent = (await Promise.all(pageContentPromises)).join('');
        const opinionsString = pageContent.split(
          'Sverigedemokraterna vill:'
        )[1];
        return {
          title: data.title,
          url: data.url,
          opinions: opinionsString
            .split('•')
            .map((opinion) => opinion.trim())
            .filter((opinion) => opinion !== ''),
        };
      }
    );
    const dataWithStandpoints = await Promise.all(dataWithStandpointsPromises);
    return { result: dataWithStandpoints, hasMore: false };
  }
}
