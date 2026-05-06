import { NavigationMenu } from '@skyroc/web-ui';
import type { NavigationMenuItemOption } from '@skyroc/web-ui';
import { BookOpen, Box, CircleHelp, Code2, FileText, House, Palette, Rocket } from 'lucide-react';

const menuItems: NavigationMenuItemOption[] = [
  {
    value: 'guide',
    label: 'Guide',
    leading: <BookOpen className="size-4" />,
    children: [
      {
        label: 'Introduction',
        href: '#',
        description: 'Start with the core concepts and project setup.',
        leading: <House />
      },
      {
        label: 'Theming',
        href: '#',
        description: 'Customize colors, radius, spacing, and component styles.',
        leading: <Palette />
      },
      {
        label: 'Deployment',
        href: '#',
        description: 'Ship the application with a production-ready workflow.',
        leading: <Rocket />
      }
    ]
  },
  {
    value: 'components',
    label: 'Components',
    leading: <Box className="size-4" />,
    children: [
      {
        label: 'Button',
        href: '#',
        description: 'Trigger actions, submit forms, and open overlays.',
        leading: <FileText />
      },
      {
        label: 'Dialog',
        href: '#',
        description: 'Display modal content that requires user attention.',
        leading: <FileText />
      },
      {
        label: 'NavigationMenu',
        href: '#',
        description: 'Build accessible navigation with expandable panels.',
        leading: <FileText />
      }
    ]
  },
  {
    type: 'link',
    label: 'GitHub',
    href: '#',
    leading: <Code2 className="size-4" />
  },
  {
    type: 'link',
    label: 'Help',
    href: '#',
    disabled: true,
    leading: <CircleHelp className="size-4" />
  }
];

const NavigationMenuBasic = () => {
  return (
    <div className="flex min-h-64 items-start justify-center pt-6">
      <NavigationMenu
        classNames={{ subLink: 'w-72' }}
        items={menuItems}
      />
    </div>
  );
};

export default NavigationMenuBasic;
