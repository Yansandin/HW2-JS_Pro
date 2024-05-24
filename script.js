// 1.

class Library {
    #books = [];
    constructor(someBooks){
        if (someBooks.filter((e, i, a) => a.indexOf(e) !== i).length === 0) {
            this.#books = someBooks;
        } else {
            throw new Error('есть дубликаты')
        }
    }
    get allBooks () {
        return this.#books;
    }
    addBookTitle(title) {
        if(!this.#books.includes(title)){
            this.#books.push(title);
        }else {
            throw new Error('Такое название уже есть');
        }
    }
    removeBook(title) {
        if(this.#books.includes(title)){
            this.#books = this.#books.filter(name => name !== title);
        }else {
            throw new Error('Такого названия нет');
        }
    }

    hasBook(title) {
        if (this.#books.includes(title)) {
            return true;
        } else {
            return false;
        }
    }
}

const library = new Library(['a','b','c']);

library.addBookTitle('dsada');
library.addBookTitle('dsadsadsa');
library.addBookTitle('dsad1223');
library.removeBook('dsada');

console.log(library.hasBook('fdfdsfsdfdsfsdfd'));

console.log(library.allBooks);

// 2.
const initialData = [
    {
      product: "Apple iPhone 13",
      reviews: [
        {
          id: "1",
          text: "Отличный телефон! Батарея держится долго.",
        },
        {
          id: "2",
          text: "Камера супер, фото выглядят просто потрясающе.",
        },
      ],
    },
    {
      product: "Samsung Galaxy Z Fold 3",
      reviews: [
        {
          id: "3",
          text: "Интересный дизайн, но дорогой.",
        },
      ],
    },
    {
      product: "Sony PlayStation 5",
      reviews: [
        {
          id: "4",
          text: "Люблю играть на PS5, графика на высоте.",
        },
      ],
    },
  ];

const button = document.querySelector('#button');
const textArea = document.querySelector('#textarea');
const reviews = document.querySelector('#reviews');
const productSelect = document.querySelector('#productSelect');


function displayReviews() {
    reviews.innerHTML = '';
    initialData.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        const productTitle = document.createElement('h2');
        productTitle.textContent = product.product;
        productDiv.appendChild(productTitle);

        product.reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.classList.add('review');
            reviewDiv.textContent = review.text;
            productDiv.appendChild(reviewDiv);
        });

        reviews.appendChild(productDiv);
    });
}


function addReview() {
    const selectedProduct = productSelect.value;
    const reviewText = textArea.value.trim();

    if (reviewText === '') {
        console.log('Чтобы отправить отзыв напишите что-то');;
        return;
    }

    try {
        if (reviewText.length < 50 || reviewText.length > 500) {
            throw new Error('Отзыв должен быть от 50 до 500 символов');
        }

        const product = initialData.find(p => p.product === selectedProduct);
        const newReview = {
            id: (new Date()).getTime().toString(),
            text: reviewText
        };
        product.reviews.push(newReview);
        textArea.value = '';
        displayReviews();
    } catch (error) {
        console.log(error.message);
    }
}

button.addEventListener('click', addReview);


