### Pages

No fuss, opinionated pagination helper.

```es6
import compactPagination from 'compact-pagination'

compactPagination({
	totalSize: 10,
	currentIndex: 5,
	bufferSize: 1
});

/*
returns :
    [
        {page: 1},
        {isSeparator: true},
        {page: 4},
        {page: 5, isCurrent: true},
        {page: 6},
        {isSeparator: true},
        {page: 10}
    ]
which could be templated :
    1 … 4 5 6 … 10
*/
```
