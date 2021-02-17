export default function useTiledGallery() {
  const getSpan = i => {
    const row = i === 0 || i % 6 === 0 ? 2 : 1
    const col = i === 1 || i === 4 || i % 6 === 1 || i % 6 === 4 ? 2 : 1
    return `${row === 1 ? "md:row-span-1" : "md:row-span-2"} ${
      col === 1 ? "md:col-span-1" : "md:col-span-2"
    }`
  }

  const height = i => {
    return i === 0 || i % 6 === 0
      ? "h-80 md:h-132 lg:h-164"
      : "h-80 md:h-64 lg:h-80"
  }

  const className = i => {
    return `${getSpan(i)} ${height(i)}`
  }

  return { className, height }
}

// Tile layout
// id row col
// 0 2 1
// 1 1 2
// 2 1 1
// 3 1 1
// 4 1 2
// 5 1 1
