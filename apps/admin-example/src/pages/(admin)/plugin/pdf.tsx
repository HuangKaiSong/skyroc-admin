// oxlint-disable import/no-unassigned-import
import { createFileRoute } from '@tanstack/react-router';
import { Button, Checkbox, Pagination, Skeleton, Space } from 'antd';
import { useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Document, Page, pdfjs } from 'react-pdf';

import { ExamplePanel, PluginPageHeader } from './modules/shared';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const pdfSource = 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf';
const rotations = [0, 90, 180, 270] as const;

const PdfDemo = () => {
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllPages, setShowAllPages] = useState(false);
  const [rotationIndex, setRotationIndex] = useState(0);

  function handleDocumentLoadSuccess(document: { numPages: number }) {
    setPageCount(document.numPages);
  }

  function handleShowAllPagesChange(event: { target: { checked: boolean } }) {
    setShowAllPages(event.target.checked);
    setCurrentPage(1);
  }

  function handleRotate() {
    setRotationIndex(index => (index + 1) % rotations.length);
  }

  function handlePrint() {
    window.open(pdfSource, '_blank', 'noopener,noreferrer');
  }

  function handleDownload() {
    const link = document.createElement('a');
    link.href = pdfSource;
    link.download = 'react-plugin-demo.pdf';
    link.click();
  }

  return (
    <Space className="w-full" orientation="vertical" size={16}>
      <PluginPageHeader
        icon="mdi:file-pdf-box"
        resources={[{ label: 'react-pdf', url: 'https://github.com/wojtekmaj/react-pdf' }]}
        tags={['react-pdf', 'pdf.js worker']}
        title="PDF 预览示例"
      />
      <ExamplePanel icon="mdi:file-pdf-box" title="PDF 预览">
        <Space className="mb-4 w-full justify-end" wrap>
          <Checkbox checked={showAllPages} onChange={handleShowAllPagesChange}>
            显示全部页面
          </Checkbox>
          <Button onClick={handleRotate}>旋转 90°</Button>
          <Button onClick={handlePrint}>打印</Button>
          <Button type="primary" onClick={handleDownload}>
            下载
          </Button>
        </Space>
        <div className="max-h-720px overflow-auto rounded-lg bg-layout p-4">
          <Document
            file={pdfSource}
            loading={<Skeleton active paragraph={{ rows: 8 }} />}
            onLoadSuccess={handleDocumentLoadSuccess}
          >
            {showAllPages ? (
              Array.from({ length: pageCount }, (_, index) => (
                <div className="mb-4 flex justify-center" key={index}>
                  <Page pageNumber={index + 1} renderTextLayer={false} rotate={rotations[rotationIndex]} width={760} />
                </div>
              ))
            ) : (
              <div className="flex justify-center">
                <Page pageNumber={currentPage} renderTextLayer={false} rotate={rotations[rotationIndex]} width={760} />
              </div>
            )}
          </Document>
        </div>
        {!showAllPages && (
          <div className="mt-4 flex justify-center">
            <Pagination current={currentPage} pageSize={1} total={pageCount} onChange={setCurrentPage} />
          </div>
        )}
      </ExamplePanel>
    </Space>
  );
};

export const Route = createFileRoute('/(admin)/plugin/pdf')({
  component: PdfDemo,
  staticData: {
    i18nKey: 'route.plugin_pdf',
    menu: {
      icon: 'mdi:file-pdf-box',
      order: 70
    },
    title: 'plugin_pdf'
  }
});
