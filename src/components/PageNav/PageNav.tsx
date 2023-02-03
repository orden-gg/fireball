import { useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import { Button } from '@mui/material';
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

  const { pathname } = useLocation();

  const data = useMemo(() => links, [links]);

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
        return (
          <div className={classes.navItem} key={index}>
            {link.isShowSubRoutes && isPathMatch(link.path) && (
              <div className={classes.subNav}>{link.subNavComponent}</div>
            )}

            <Button
              disabled={link.count === 0}
              startIcon={link.icon}
              component={NavLink}
              className={classNames(classes.button, link.count === undefined && classes.onlyIconBtn)}
              to={link.path}
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
