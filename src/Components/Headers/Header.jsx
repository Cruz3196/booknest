

function Header() {
  return (
    <nav className="navbar navbar-expand-lg " 
      style={{
        backgroundColor: "#F4F1EA",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"
    }}>
      <div className="container">
        <a className="navbar-brand" href="/">
          BookNest
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/books">
                Books 
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>
          </ul>
          <form className="d-flex" action="/action_page.php">
            <input className="form-control me-2" type="search" placeholder="Search Books" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;