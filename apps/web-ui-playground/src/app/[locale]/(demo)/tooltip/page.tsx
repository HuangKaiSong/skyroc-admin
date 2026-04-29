import { TooltipProvider } from '@skyroc/web-ui';
import type { Metadata } from 'next';
import { generateComponentMetadata } from '../components-meta';
import TooltipArrow from './modules/TooltipArrow';
import TooltipBasic from './modules/TooltipBasic';
import TooltipCustomStyle from './modules/TooltipCustomStyle';
import TooltipDemo from './modules/TooltipDemo';
import TooltipSize from './modules/TooltipSize';

export async function generateMetadata(): Promise<Metadata> {
  return await generateComponentMetadata('tooltip');
}

const TooltipPage = () => {
  return (
    <div className="flex-c gap-4">
      <TooltipProvider>
        <TooltipBasic />
        <TooltipDemo />
        <TooltipArrow />
        <TooltipSize />
        <TooltipCustomStyle />
      </TooltipProvider>
    </div>
  );
};

export default TooltipPage;
