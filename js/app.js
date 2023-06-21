const elForm = document.querySelector(".js-form");
const elSearchInput = document.querySelector(".js-search-input");
const elSortSelect = document.querySelector(".js-sort-select");
const elYearInput = document.querySelector(".js-year-input");
const elAuthorInput = document.querySelector(".js-author-input");
const elCategory = document.querySelector(".js-category");
const elTemp = document.querySelector(".js-book-temp").content;
const elFragment = new DocumentFragment();
const elList = document.querySelector(".js-list");
let options = [];
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const searchQuery = new RegExp(elSearchInput.value, "gi");
    const searchYear = new RegExp(elYearInput.value, "gi");
    const searchAuthor = new RegExp(elAuthorInput.value, "gi");
    const findBooks = SearchBooks(searchQuery, searchYear, searchAuthor);

    if (findBooks.length > 0) {
        sortdBooks(findBooks, elSortSelect.value);
        renderBooks(findBooks);
    } else {
        elList.innerHTML = `<div class='d-flex flex-column'>
        <p class="text-white display-3"> Book  Not found🙄</p>
        <a class="text-white w-25 back-link text-decoration-underline">Back</a>
        </div>`;
    }
});

const renderOption = (books) => {
    books.forEach((book) => {
        book.language.split(",").forEach((lang) => {
            if (!options.includes(lang)) {
                options.push(lang);
            }

        })
    })
    options.sort();
}
renderOption(books)

options.forEach((option) => {
    const opt = document.createElement("option");
    opt.textContent = option;
    opt.value = option;
    elCategory.appendChild(opt);
});

function renderBooks(books) {
    elList.innerHTML = null;
    books.forEach(book => {
        const elCloneTemp = elTemp.cloneNode(true);

        elCloneTemp.querySelector(".js-book-img").src = "https://upload.wikimedia.org/wikipedia/en/6/65/ThingsFallApart.jpg"
        elCloneTemp.querySelector(".js-book-img").alt = book.title;
        elCloneTemp.querySelector(".js-book-title").textContent = book.title;
        elCloneTemp.querySelector(".js-book-author").textContent = book.author;
        elCloneTemp.querySelector(".js-book-year").textContent = book.year;
        elCloneTemp.querySelector(".js-book-page").textContent = book.pages;
        elCloneTemp.querySelector(".js-book-lang").textContent = book.language;
        elCloneTemp.querySelector(".js-wiki").href = book.link;

        elFragment.appendChild(elCloneTemp);
    });
    elList.appendChild(elFragment);
}

function SearchBooks(search, year, author) {
    const filterBooks = books.filter((book) => {
        const moreCriteries = String(book.title).match(search) && (elCategory.value == "all" || book.language.includes(elCategory.value)) && String(book.year).match(year) && String(book.author).match(author);
        return moreCriteries
    });
    return filterBooks;
}

function sortdBooks(books, sortType) {
    books.sort((a, b) => {
        if (sortType == "A-Z") {
            if (String(a.title).toLowerCase() > String(b.title).toLowerCase())
                return 1;
            else if (String(a.title).toLowerCase() < String(b.title).toLowerCase()) return -1;
            else return 0;
        }
        if (sortType == "Z-A") {
            if (String(a.title).toLowerCase() > String(b.title).toLowerCase())
                return -1;
            else if (String(a.title).toLowerCase() < String(b.title).toLowerCase())
                return 1;
            else return 0;
        }
        if (sortType == "High-pages") {
            if (a.pages > b.pages)
                return 1;
            else if (a.pages < b.pages)
                return -1;
            else return 0;
        }
        if (sortType == "Low-pages") {
            if (a.pages > b.pages)
                return -1;
            else if (a.pages < b.pages)
                return 1;
            else return 0;
        }
    })
}


renderBooks(books)