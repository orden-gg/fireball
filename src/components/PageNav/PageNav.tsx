import { useMemo } from 'react';
import ContentLoader from 'react-content-loader';
import { NavLink } from 'react-router-dom';

import { Button, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material';

import classNames from 'classnames';

import { PageNavLink } from 'shared/models';

import { CustomPopup } from 'components/custom/CustomPopup/CustopPopup';

import { styles } from './styles';

interface PageNavProps {
  links: PageNavLink[];
  beforeContent?: JSX.Element;
  afterContent?: JSX.Element;
}

export function PageNav({ links, beforeContent, afterContent }: PageNavProps) {
  const theme = useTheme();

  const classes = styles();

  const data = useMemo(() => links, [links]);

  return (
    <div className={classes.container}>
      {beforeContent}
      {data.map((link: PageNavLink, index: number) => {
        return link.dropdown ? (
          <div className={classes.navItem} key={index}>
            <CustomPopup
              title={
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
              }
            >
              <>
                {link.isShowSubRoutes && (
                  <MenuItem key={index} className={classes.menuItem}>
                    <div>{link.subNavComponent}</div>
                  </MenuItem>
                )}
              </>
            </CustomPopup>
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
