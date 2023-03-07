import { useMemo, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { Button, MenuItem, Menu } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

import { useTheme } from '@mui/material';

import classNames from 'classnames';

import { PageNavLink } from 'shared/models';

import { styles } from './styles';

interface PageNavProps {
  links: PageNavLink[];
  beforeContent?: JSX.Element;
  afterContent?: JSX.Element;
}

export function PageNav({ links, beforeContent, afterContent }: PageNavProps) {
  const classes = styles();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [selectedIndex, setSelectedIndex] = useState(1);

  const open = Boolean(anchorEl);

  console.log('anchorEl', anchorEl);
  console.log('open', open);

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { pathname } = useLocation();

  const data = useMemo(() => links, [links]);
  console.log('data', data);

  const isPathMatch = (currentPath: string): boolean => {
    const indexOfPath: number = pathname.indexOf(currentPath);
    const splittedPathname = pathname.split('');

    return (
      indexOfPath !== -1 &&
      splittedPathname[indexOfPath - 1] === '/' &&
      splittedPathname[indexOfPath + currentPath.length] === '/'
    );
  };

  return (
    <div className={classes.container}>
      {beforeContent}
      {data.map((link: PageNavLink, index: number) => {
        return link.dropdown ? (
          <div
            className={classes.navItem}
            key={index}
            // onClick={handleClose}
            // onMouseEnter={handleHover}
            // onMouseLeave={handleClose}
          >
            <Button
              disabled={link.count === 0}
              startIcon={link.icon}
              component={NavLink}
              className={classNames(classes.button, link.count === undefined && classes.onlyIconBtn)}
              to={link.path}
              key={index}
              id='basic-button'
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              // onMouseLeave={handleClose}
            >
              {link.name && <span className={classes.navName}>{link.name}</span>}
              {link.count !== undefined ? (
                <>
                  {link.isLoading ? (
                    <ContentLoader
                      speed={2}
                      viewBox='0 0 28 14'
                      backgroundColor={theme.palette.secondary.main}
                      foregroundColor={theme.palette.primary.dark}
                      className={classes.buttonLoader}
                    >
                      <rect x='0' y='0' width='28' height='14' />
                    </ContentLoader>
                  ) : (
                    <span className={classes.label}>[{link.count}]</span>
                  )}
                </>
              ) : (
                <></>
              )}
            </Button>
            {link.isShowSubRoutes && isPathMatch(link.path) && (
              <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem
                  key={index}
                  onClick={handleClose}
                  className={classes.menuItem}
                  // onClick={handleMenuItemClick}
                  // selected={index === selectedIndex}
                  // onMouseLeave={handleClose}
                  // disabled={index === 0}
                >
                  <div
                  // onClick={() => onTooltipClick()}
                  // onMouseEnter={() => onToggleTooltip(true)}
                  // onMouseLeave={() => onToggleTooltip(false)}
                  >
                    {link.subNavComponent}
                  </div>
                </MenuItem>
              </Menu>
            )}
          </div>
        ) : (
          <div className={classes.navItem} key={index}>
            <Button
              disabled={link.count === 0}
              startIcon={link.icon}
              component={NavLink}
              className={classNames(classes.button, link.count === undefined && classes.onlyIconBtn)}
              to={link.path}
              key={index}
            >
              {link.name && <span className={classes.navName}>{link.name}</span>}
              {link.count !== undefined ? (
                <>
                  {link.isLoading ? (
                    <ContentLoader
                      speed={2}
                      viewBox='0 0 28 14'
                      backgroundColor={theme.palette.secondary.main}
                      foregroundColor={theme.palette.primary.dark}
                      className={classes.buttonLoader}
                    >
                      <rect x='0' y='0' width='28' height='14' />
                    </ContentLoader>
                  ) : (
                    <span className={classes.label}>[{link.count}]</span>
                  )}
                </>
              ) : (
                <></>
              )}
            </Button>
          </div>
        );
      })}
      {afterContent}
    </div>
  );
}
