import type { Metadata } from 'next';
import { generateComponentMetadata } from '../components-meta';
import TextareaBasic from './modules/TextareaBasic';
import TextareaCountGraphemes from './modules/TextareaCountGraphemes';
import TextareaCustomStyle from './modules/TextareaCustomStyle';
import TextareaDemo from './modules/TextareaDemo';
import TextareaMaxlength from './modules/TextareaMaxlength';
import TextareaSize from './modules/TextareaSize';
import TextCustomCount from './modules/TextCustomCount';

export async function generateMetadata(): Promise<Metadata> {
  return await generateComponentMetadata('textarea');
}

const TextareaPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <TextareaBasic />
      <TextareaDemo />
      <TextareaCountGraphemes />
      <TextCustomCount />
      <TextareaMaxlength />
      <TextareaSize />
      <TextareaCustomStyle />
    </div>
  );
};

export default TextareaPage;
