import type { Metadata } from 'next';
import { generateComponentMetadata } from '../components-meta';
import TreeBasic from './modules/TreeBasic';
import TreeMultiple from './modules/TreeMultiple';
import TreeVirtualizer from './modules/TreeVirtualizer';

export async function generateMetadata(): Promise<Metadata> {
  return await generateComponentMetadata('tree');
}

const TreePage = () => {
  return (
    <div className="flex-c gap-4">
      <TreeBasic />
      <TreeMultiple />
      <TreeVirtualizer />
    </div>
  );
};

export default TreePage;
