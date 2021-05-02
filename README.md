#Началаьная подготовка :

Удалить все файлы из папки src , кроме :

*App.js;
*index.js
\*index.css

**В index.html после title добавить cdn на materializecss.com**

---

**Создаем папку layout :**

- Header.jsx
- Main.jsx
- Footer.jsx

---

**Создание Шапки**

**ctrl + h , заменить все class на className**

```JavaScript
function Header(){
    return
        <nav className='#512da8 deep-purple darken-2'>
            <div classNameName="nav-wrapper">
                <a href="#" className="brand-logo">React Movies</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="https://github.com/NinjaReact?tab=repositories">Github</a></li>
                </ul>
            </div>
        </nav>
}

export {Header}
```

---

**Создание подвала**

```JavaScript
function Footer(){
    return
        <footer className="page-footer #512da8 deep-purple darken-2">
            <div className="footer-copyright">
                <div className="container">
                © {new Date().getFullYear()}
                <a className="grey-text text-lighten-4 right" href="#!">Git</a>
                </div>
            </div>
        </footer>
}

export  {Footer}
```
