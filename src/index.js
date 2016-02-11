module.exports = function compactPagination({
	totalSize = 3,
	currentIndex = 1,
	bufferSize = 1
}) {
	if (currentIndex < 1 || currentIndex > totalSize) throw('Invalid config');
	let pages = [{page: currentIndex, isCurrent: true}];
	for (let page = currentIndex - 1; page >= Math.max(1, currentIndex - bufferSize); page--) {
		pages.unshift({ page });
	}
	for (let page = currentIndex + 1; page <= Math.min(totalSize, currentIndex + bufferSize); page++) {
		pages.push({ page });
	}
	if (pages[0].page > 3) {
		pages = [{page: 1}, {isSeparator: true}].concat(pages);
	} else if (pages[0].page === 3) {
		pages = [{page: 1}, {page: 2}].concat(pages);
	} else if (pages[0].page === 2) {
		pages = [{page: 1}].concat(pages);
	}
	let lastPage = pages[pages.length - 1].page;
	if (lastPage > totalSize - 2) {
		pages = pages.concat([{isSeparator: true}, {page: totalSize}]);
	} else if (lastPage === totalSize - 2) {
		pages = pages.concat([{page: totalSize - 1}, {page: totalSize}]);
	} else if (lastPage === totalSize - 1) {
		pages = pages.concat([{page: totalSize}]);
	}
	return pages;
}
