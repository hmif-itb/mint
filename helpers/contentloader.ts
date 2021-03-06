import axios from 'axios';
import { Interview, Section } from '../redux/types';

export class ContentLoader {
  contentBaseUrl: string;

  interviews: { [interviewId: string]: Interview } = {};

  constructor(contentBaseUrl: string) {
    this.contentBaseUrl = contentBaseUrl;
  }

  async loadInterviews(): Promise<Interview[]> {
    const response = await axios.get(`${this.contentBaseUrl}/interviews.json`);
    const interviews = response.data as Interview[];

    this.interviews = interviews.reduce((map: { [interviewId: string]: Interview }, interview: Interview) => {
      map[interview.id] = interview;
      return map;
    }, {});

    return interviews;
  }

  async loadInterview(interview: Interview): Promise<Interview> {
    const sections = await Promise.all(interview.sections.map((section) => this.loadSection(section)));

    // Remove empty sections
    interview.sections = sections.filter((section) => section.contents.length > 0);
    return interview;
  }

  async loadSection(section: Section): Promise<Section> {
    const contents = await Promise.all(section.contents.map((markdownUrl) => this.loadContent(markdownUrl)));

    // Remove empty content
    section.contents = contents.filter((content) => !!content);
    return section;
  }

  async loadContent(markdownUrl: string): Promise<string> {
    const response = await axios.get(`${this.contentBaseUrl}/${markdownUrl}`);
    return response.data;
  }
}

export const contentLoader = new ContentLoader(process.env.contentBaseUrl || '');
