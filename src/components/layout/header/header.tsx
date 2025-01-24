import Logo from '../../common/logo/logo';

type HeaderProps = {
  isNavActive: boolean;
  isLogin?: boolean;
}

export default function Header({ isNavActive, isLogin }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link" href="main.html">
              <Logo className="header__logo" width={81} height={41} />
            </a>
          </div>
          {isNavActive ?
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isLogin ?
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li> :
                  ''}
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav> :
            ''}
        </div>
      </div>
    </header>
  );
}
