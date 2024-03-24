import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ComicViewerCore } from '../../../features/viewer/components/ComicViewerCore';
import { addUnitIfNeeded } from '../../../lib/css/addUnitIfNeeded';

const IMAGE_WIDTH = 1075;
const IMAGE_HEIGHT = 1518;

const MIN_VIEWER_HEIGHT = 500;
const MAX_VIEWER_HEIGHT = 650;

const MIN_PAGE_WIDTH = Math.floor((MIN_VIEWER_HEIGHT / IMAGE_HEIGHT) * IMAGE_WIDTH);

const _Container = styled.div`
  position: relative;
`;

const _Wrapper = styled.div<{
  $maxHeight: number;
}>`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  max-height: ${({ $maxHeight }) => addUnitIfNeeded($maxHeight)};
  overflow: hidden;
`;

const clamp = (num: number, boundOne: number, boundTwo: number) => {
  const lowerBound = Math.min(boundOne, boundTwo);
  const upperBound = Math.max(boundOne, boundTwo);
  return Math.min(Math.max(num, lowerBound), upperBound);
};

type Props = {
  episodeId: string;
};

export const ComicViewer: React.FC<Props> = ({ episodeId }) => {
  const [viewerHeight, setViewerHeight] = useState<number>(MIN_VIEWER_HEIGHT);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateSize = () => {
      const cqw = (containerRef.current?.getBoundingClientRect().width ?? 0) / 100;
      const pageCountParView = 100 * cqw <= 2 * MIN_PAGE_WIDTH ? 1 : 2;
      const candidatePageWidth = (100 * cqw) / pageCountParView;
      const candidatePageHeight = (candidatePageWidth / IMAGE_WIDTH) * IMAGE_HEIGHT;
      const newViewerHeight = clamp(candidatePageHeight, MIN_VIEWER_HEIGHT, MAX_VIEWER_HEIGHT);

      setViewerHeight(newViewerHeight);
    };

    // 初回とウィンドウサイズ変更時にサイズを更新
    updateSize();
    window.addEventListener('resize', updateSize);

    // コンポーネントのアンマウント時にイベントリスナーを削除
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <_Container ref={containerRef}>
      <_Wrapper $maxHeight={viewerHeight}>
        <ComicViewerCore episodeId={episodeId} />
      </_Wrapper>
    </_Container>
  );
};
