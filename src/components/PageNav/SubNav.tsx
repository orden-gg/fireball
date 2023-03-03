import ContentLoader from 'react-content-loader';
import { NavLink } from 'react-router-dom';

import { Button } from '@mui/material';
import { useTheme } from '@mui/material';

import classNames from 'classnames';

import { PageNavLink } from 'shared/models';

import { styles } from './styles';

export function SubNav({ links }: { links: PageNavLink[] }) {
  const classes = styles();

  const theme = useTheme();

  return (
    <>
      {links.map((subLink: PageNavLink, index: number) => {
        return (
          <div className={classes.navItem} key={index}>
            <Button
              disabled={subLink.count === 0}
              startIcon={subLink.icon}
              component={NavLink}
              className={classNames(
                classes.button,
                classes.subButton,
                subLink.count === undefined && classes.onlyIconBtn
              )}
              to={subLink.path}
            >
              {subLink.name && <span className={classes.navName}>{subLink.name}</span>}
              {subLink.count !== undefined ? (
                <>
                  {subLink.isLoading ? (
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
                    <span className={classes.label}>[{subLink.count}]</span>
                  )}
                </>
              ) : (
                <></>
              )}
            </Button>
          </div>
        );
      })}
    </>
  );
}
