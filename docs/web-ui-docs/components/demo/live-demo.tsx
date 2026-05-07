'use client';

import { themes } from 'prism-react-renderer';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, Code2, Copy, ExternalLink, Eye, RotateCcw } from 'lucide-react';
import { demoScope, scopeKeys } from './scope';
import { transformDemo } from './transform';

function stableTransformCode(src: string) {
  try {
    return transformDemo(src, scopeKeys).executable;
  } catch {
    return src;
  }
}

interface LiveDemoProps {
  defaultExpanded?: boolean;
  description?: string;
  fileName: string;
  playgroundUrl?: string | null;
  source: string;
  title?: string;
}

type TabValue = 'code' | 'preview';

function useIsDark(): boolean {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    function sync() {
      setIsDark(root.classList.contains('dark'));
    }
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributeFilter: ['class'], attributes: true });
    return () => obs.disconnect();
  }, []);
  return isDark;
}

export function LiveDemo(props: LiveDemoProps) {
  const {
    defaultExpanded = false,
    playgroundUrl,
    source,
  } = props;

  const isDark = useIsDark();

  const initialDisplay = useMemo(() => transformDemo(source, scopeKeys).display, [source]);

  const [displayCode, setDisplayCode] = useState(initialDisplay);
  const [activeTab, setActiveTab] = useState<TabValue>(defaultExpanded ? 'code' : 'preview');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setDisplayCode(initialDisplay);
  }, [initialDisplay]);

  if (!mounted) {
    return (
      <div className="my-6 overflow-hidden rounded-lg border border-fd-border">
        <div className="flex items-center border-b border-fd-border px-3 py-1.5">
          <div className="flex items-center gap-0.5">
            <div className="rounded-md px-2.5 py-1 text-xs font-medium text-fd-foreground">Preview</div>
            <div className="rounded-md px-2.5 py-1 text-xs text-fd-muted-foreground">Code</div>
          </div>
        </div>
        <div className="flex min-h-[120px] items-center justify-center px-6 py-10 text-xs text-fd-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  function onReset() {
    setDisplayCode(initialDisplay);
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  return (
    <LiveProvider
      code={displayCode}
      enableTypeScript
      language="tsx"
      noInline
      scope={demoScope}
      theme={isDark ? themes.vsDark : themes.oneLight}
      transformCode={stableTransformCode}
    >
      <div className="my-6 overflow-hidden rounded-lg border border-fd-border">
        {/* Top toolbar */}
        <div className="flex items-center justify-between border-b border-fd-border px-3 py-1.5">
          <div className="flex items-center gap-0.5">
            <TabButton active={activeTab === 'preview'} onClick={() => setActiveTab('preview')}>
              <Eye className="mr-1 inline-block size-3.5 align-[-2px]" />
              Preview
            </TabButton>
            <TabButton active={activeTab === 'code'} onClick={() => setActiveTab('code')}>
              <Code2 className="mr-1 inline-block size-3.5 align-[-2px]" />
              Code
            </TabButton>
          </div>

          <div className="flex items-center gap-0.5">
            {activeTab === 'code' ? (
              <ActionButton onClick={onReset} title="Reset">
                <RotateCcw className="size-3.5" />
              </ActionButton>
            ) : null}
            <ActionButton onClick={onCopy} title={copied ? 'Copied!' : 'Copy code'}>
              {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
            </ActionButton>
            {playgroundUrl ? (
              <ActionButton href={playgroundUrl} title="Open in Playground">
                <ExternalLink className="size-3.5" />
              </ActionButton>
            ) : null}
          </div>
        </div>

        {/* Preview panel */}
        {activeTab === 'preview' ? (
          <div className="flex min-h-[120px] items-center justify-center px-6 py-10">
            <div className="w-full">
              <LivePreview />
            </div>
          </div>
        ) : null}

        {/* Code panel */}
        {activeTab === 'code' ? (
          <div>
            <div className="border-b border-fd-border px-6 py-4">
              <div className="w-full">
                <LivePreview />
              </div>
            </div>
            <div>
              <div className="demo-live-editor">
                <LiveEditor
                  className="!bg-transparent !font-mono !text-[13px] leading-relaxed"
                  onChange={setDisplayCode}
                />
              </div>
              <DemoLiveError />
            </div>
          </div>
        ) : null}
      </div>
    </LiveProvider>
  );
}

function TabButton(props: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const {
    active,
    children,
    onClick,
  } = props;

  return (
    <button
      className={
        `cursor-pointer rounded-md px-2.5 py-1 text-xs font-medium transition-colors duration-200` +
        ` focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring${ 
        active
          ? ' text-fd-foreground'
          : ' text-fd-muted-foreground hover:bg-fd-accent/50 hover:text-fd-foreground'}`
      }
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function ActionButton(props: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  title: string;
}) {
  const {
    children,
    href,
    onClick,
    title,
  } = props;

  const cls =
    'inline-flex cursor-pointer items-center justify-center rounded-md p-1.5' +
    ' text-fd-muted-foreground transition-colors duration-200' +
    ' hover:bg-fd-accent/50 hover:text-fd-accent-foreground' +
    ' focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring';

  if (href) {
    return (
      <a className={cls} href={href} rel="noreferrer" target="_blank" title={title}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} title={title} type="button">
      {children}
    </button>
  );
}

function DemoLiveError() {
  return (
    <LiveError className="!m-0 !whitespace-pre-wrap !rounded-none !border-0 !border-t !border-red-500/40 !bg-red-500/10 !px-4 !py-3 !font-mono !text-xs !text-red-600 dark:!text-red-400" />
  );
}
