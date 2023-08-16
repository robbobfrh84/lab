function buildFrame({ elmId, frame, pixWidth, grid, noShadow, creatorOverlay, callback }) {
  const blockSize = pixWidth / (grid.x + 1)
  const pixHeight = blockSize * (grid.y + 1)
  const pixBorderBlurr = noShadow ? 0 : blockSize / 4
  const elm = document.getElementById(elmId)

  elm.innerHTML = ""
  elm.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg"
  id="svg-${elmId}"
  style="background-color: ${frame?.bg || ''};"
  width="${pixWidth}"
  height="${pixHeight}"
  viewBox="0 0 ${pixWidth} ${pixHeight}">
  <defs>
    <filter id="f1-${elmId}" height="125%" width="125%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${pixBorderBlurr/2}"></feGaussianBlur>
      <feOffset dx="${pixBorderBlurr}" dy="${pixBorderBlurr}" result="offsetblur"></feOffset>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.25"></feFuncA>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode></feMergeNode>
        <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#f1-${elmId})" id="g-${elmId}" style="shape-rendering:crispEdges;">
  </g>
</svg>`
  setPixels({elmId, frame, blockSize, grid, creatorOverlay, callback})
}