import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Chapter } from './chapter';

export class ChapterData implements InMemoryDbService {

    createDb() {
        const chapters: Chapter[] = [
            {
                'id': 1,
                'chapterName': 'Down the Rabbit Hole',
                'chapterSentence': 'going out altogether, like a candle"',
                'puzzle': 'Limit of a function',
                'mainCharacter': 'White Rabbit'
            },
             {
                'id': 2,
                'chapterName': 'The Pool of Tears',
                'chapterSentence': 'Let me see: four times five is twelve, and four times six is thirteen, and four times seven is—oh dear! I shall never get to twenty at that rate!',
                'puzzle': 'different bases and positional numeral systems',
                'mainCharacter': 'Mouse'
            },
            {
              'id': 3,
              'chapterName': 'The Caucus Race and a Long Tale',
              'chapterSentence': '',
              'puzzle': '',
              'mainCharacter': 'Dodo'
            },
            {
              'id': 4,
              'chapterName': 'A Mad Tea-Party',
              'chapterSentence': 'Why is a raven like a writing desk?',
              'puzzle': 'ring of integers modulo N',
              'mainCharacter': 'The Hatter'
            }
        ];
        return { chapters };
    }
}
