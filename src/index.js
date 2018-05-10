module.exports = function compactPagination({
	totalSize = 3,
	currentIndex = 1,
	bufferSize = 1
}) {
	if (currentIndex < 1 || currentIndex > totalSize) throw('Invalid config');
	const size = Math.min(totalSize, 5 + (bufferSize * 2));
	const pageNumbers = new Set([1, totalSize]);
	let lowestBound = Math.max(1, currentIndex - bufferSize);
	let highestBound = Math.min(totalSize, currentIndex + bufferSize);
	for (let i = lowestBound; i <= highestBound; i++) {
		pageNumbers.add(i);
	}
	const edges = {};
	if (lowestBound > 2) edges.left = true;
	if (highestBound < totalSize - 1) edges.right = true;
	if (Object.keys(edges).length === 1) {
		for (
			let i = edges.left ? lowestBound : highestBound;
			pageNumbers.size < size - 1;
			edges.left ? i-- : i++
		) {
			pageNumbers.add(i);
			if (edges.left) {
				lowestBound = i;
			} else {
				highestBound = i;
			}
		}
	}
	const pages = Array.from(pageNumbers).sort( (x, y) => x - y).map(
		i => ({page: i, isCurrent: i === currentIndex})
	);
	if (edges.left) {
		const left = lowestBound === 3 ? {page: 2} : {isSeparator: true};
		pages.splice(1, 0, left);
	}
	if (edges.right) {
		const right = highestBound === totalSize - 2 ? {page: highestBound + 1} : {isSeparator: true};
		pages.splice(pages.length - 1, 0, right);
	}
	return pages;
}
