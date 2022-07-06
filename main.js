function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = `${pages} pages`;
    this.read = read ? `Already read` : `Haven't read it yet`;
}


const InfoToTag = {
    author: 'h2',
    title: 'h3',
    pages: 'p',
    read: 'button',
}

const determineHtmlDisplay = type => InfoToTag[type];

const changeReadStatusFunction = btn => {
    btn.addEventListener('click', () => {
        btn.innerText = btn.innerText === `Already read` ?
                      `Haven't read it yet`: `Already read`;
    });
}

const bookColors = ['Antiquewhite', 'Aqua', 'CornflowerBlue', 'Chartreuse',
                    'Coral', 'Aquamarine', 'CadetBlue', 'Chocolate',
                    'DarkSeaGreen', 'DarkKhaki', 'DarkOrange', 'DodgerBlue',
                    'Gold', 'Goldenrod', 'IndianRed', 'GreenYellow',
                    'LightSkyBlue', 'LightPink', 'LightSeaGreen', 'Peru'];

const chooseBookColor = () => {
    const randInd = Math.floor(Math.random() * (bookColors.length - 1));
     return bookColors[randInd];
}
const addNewBook = (bookInstance) => {

    const newBookContainer = document.createElement('div');
    newBookContainer.classList.add('book-container');
    
    const infoKeys = Object.keys(bookInstance);

    infoKeys.map(info => {
        const newInfo = document.createElement(determineHtmlDisplay(info));

        newInfo.classList.add(info);
        newInfo.innerText = bookInstance[info];
        newBookContainer.appendChild(newInfo);

        if (info === 'read')
            changeReadStatusFunction(newInfo);
    });

    addDelBtn(newBookContainer);

    bookshelf.appendChild(newBookContainer);
    newBookContainer.style.backgroundColor = chooseBookColor();
}

function addDelBtn(bookCont){
    const delBtn = document.createElement('button');
    delBtn.innerText = 'DELETE';
    delBtn.classList.add('del-btn');

    bookCont.appendChild(delBtn);

    delBtn.addEventListener('click', (e) => {
        const currentBook = e.currentTarget.parentElement;
        currentBook.remove();
    });
    
    bookCont.addEventListener('mouseover', () => {
        delBtn.style.visibility = 'visible'
    });

    bookCont.addEventListener('mouseout', () => {
        delBtn.style.visibility = 'hidden'
    });
}

const bookshelf = document.querySelector('#bookshelf');


const b1 = new Book('J. K. Rowling', 'Harry Potter', 2000, true);
const b2 = new Book('Jonathan Stroud', 'Bartimaeus Trilogy', 1600, true);
const b3 = new Book('Dostoevsky', 'Crime and Punishment', 800, false);

const myLybraryStart = [b1, b2, b3].map(book => addNewBook(book));






const addBookForm = document.querySelector('#add-new-book');
const addNewBookButton = document.querySelector('#add-book');

addNewBookButton.addEventListener('click', () => {
    addBookForm.style.visibility = 'visible';
    addNewBookButton.setAttribute('disabled', '')
});

const readButton = document.querySelector('#read-btn');

readButton.addEventListener('click', () => {
    readButton.value = readButton.value === 'YES' ? 'NO' : 'YES';
});

const submitNewBookButton = document.querySelector('#submit-new-book');
submitNewBookButton.addEventListener('click', () => {

    const bookNodes = document.querySelectorAll('input');
    const bookDatas = [...bookNodes].map(x => x.value);

    if (bookDatas.some(x => x === '')){
        alert('Please fill all infoboxes!')
        return;
    }
 
    bookDatas[3] = readButton.value === 'YES' ? true : false;
    const book = new Book(...bookDatas);

    addNewBook(book);

    addBookForm.style.visibility = 'hidden';
    addNewBookButton.removeAttribute('disabled');

    bookNodes.forEach((node, i) => i <3 ? node.value = '' : node.value = 'YES');
});
